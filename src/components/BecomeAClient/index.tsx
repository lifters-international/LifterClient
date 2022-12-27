import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";

import { useSessionHandler, useUserIsClient } from "../../hooks";
import { fetchGraphQl } from '../../utils';
import { createTrainerClient } from '../../graphQlQuieries';

import { BecomeClient } from "./BecomeClient";
import { CancelClient } from "./CancelClient";


import "./index.css";

const BecomeAClient: React.FC = () => {
    const { id: trainerId } = useParams();
    const authentication = useSessionHandler();
    const userIsClient = useUserIsClient(trainerId!, authentication.token!);
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            ||
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            ||
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (
            authentication.error[0].message === "jwt expired"
            ||
            authentication.error[0].message === "User does not exist."
        ) return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (userIsClient.loading) return <Loading />;

    if (userIsClient.errors.length > 0) return <Error {...userIsClient.errors[0]} reload={true} />;

    if (error) return <Error message="Problem becoming trainers client" reload={true} />

    return (
        <div className="BecomeAClientPage">
            <NavBar token={authentication.token!} />
            {
                !userIsClient.data?.clientExist ? <BecomeClient {...userIsClient.data!} token={authentication.token!} /> :
                    userIsClient.data?.clientStatement === "ACCEPTED" ?
                        <CancelClient /> :
                        (
                            <div className="BecomeClient FormContainer">
                                <div className="banner-prof">
                                    <img alt="banner" className="banner" src={userIsClient.data!.banner} />
                                    <img alt="profilePicture" className="profilePicture" src={userIsClient.data!.profilePicture} />
                                </div>

                                <div className="name-cost">
                                    <h1 className="name">Become {userIsClient.data!.name}'s client</h1>

                                    <div className="cost">
                                        <div className="price">${userIsClient.data!.price}/</div>
                                        <div className="month">month</div>
                                    </div>
                                </div>

                                <div className="benefitContainer">
                                    <h1>Benefits</h1>

                                    <div className="benefits">
                                        <div title={`You will be able to message ${userIsClient.data!.name} and ask them questions`}>Messaging</div>
                                        <div title={`You will be able to book training sessions with ${userIsClient.data!.name}`}>Booking Sessions</div>
                                        <div title={`You will be able to watch video's that ${userIsClient.data!.name} has dedicated for clients only`}>Access to client only videos</div>
                                    </div>

                                </div>

                                <div className="contactDisclaimer">Contact {userIsClient.data!.name} at {userIsClient.data!.email} for any questions</div>

                                <div className="button"
                                    onClick={
                                        () => {
                                            if (userIsClient.data!.clientStatement === "PENDING") return;
                                            else {
                                                setLoading(true);

                                                fetchGraphQl(createTrainerClient, { token: authentication.token!, trainerId })
                                                    .then(res => {
                                                        setLoading(false);

                                                        if (res.errors) return setError(true);

                                                        navigation(0);
                                                    })
                                            }
                                        }
                                    }
                                >
                                    { 
                                        userIsClient.data!.clientStatement === "PENDING" ? 
                                            "Acceptance Pending" : 
                                                loading ? "Loading" : 
                                                "REJECTED: Reapply to become a client"
                                    } </div>
                            </div>
                        )
            }
        </div>
    )
}

export default BecomeAClient;
