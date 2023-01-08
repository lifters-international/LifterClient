import React, { useState } from "react";

import { Navigate, Link } from "react-router-dom";

import { useSessionHandler, usePendingTrainers, useAcceptedTrainers } from "../../hooks";

import Loading from "../Loading";
import Error from "../Error";
import NavBar from "../NavBar";

import AcceptedTrainersView from "./AcceptedTrainersView";

import { socket } from "../../utils";


import "./index.css";

const UserTrainers = () => {
    const authentication = useSessionHandler();
    const [socketAuthenticated, setSocketAuthenticated] = useState(false);
    const pendingClients = usePendingTrainers(authentication.token!);
    const acceptedClients = useAcceptedTrainers(authentication.token!);

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

    socket.onTrainerClient("authenticated", () => {
        setSocketAuthenticated(true);
    });

    if (authentication.token && !socketAuthenticated) socket.trainerClientEmit("authenticate", { token: authentication.token!, tokenType: "lifters" });

    if ( !socketAuthenticated || pendingClients.loading || acceptedClients.loading ) return <Loading/>;

    return (
        <div className="TrainersClientPage">
            <NavBar token={authentication.token!} />
            
            <div className="PendingClientsContainer">
                <div className="PendingClientContainerContext">
                    PENDING TRAINERS ACCEPTANCE
                    <div className="circle">{pendingClients.data?.length}</div>
                </div>

                <div className="PendingClientContain">
                    <div className="ClientsContain">
                        {
                            pendingClients.data?.map( ( client, index ) => {
                                return (
                                    <Link
                                        key={index}
                                        to={`/clients/?&client=${client.id}&tab=settings`}
                                        className="pending-clients"
                                        title={client.name}
                                    >
                                        <img src={client.profilePicture} alt={client.name + " pic"} className="profile-pic" />
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <AcceptedTrainersView
                token={authentication.token!}
                clients={acceptedClients.data!}
            />
        </div>
    )
}

export default UserTrainers;
