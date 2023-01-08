import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { Subscribe } from "./Subscribe";
import Error from "../Error";

import { fetchGraphQl } from '../../utils';
import { createTrainerClient } from '../../graphQlQuieries';

type Props = {
    price: number;
    name: string;
    profilePicture: string;
    banner: string;
    email: string;
    hasDefaultPaymentMethod: boolean;
    token: string;
    clientStatement: string;
}

export const BecomeClient: React.FC<Props> = ({ price, name, profilePicture, banner, email, hasDefaultPaymentMethod, token }) => {
    const [subscriptionOpen, setSubscriptionOpen] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const { id: trainerId } = useParams();

    if ( error ) return <Error message="Problem becoming trainers client" reload={true} />

    return (
        <div className="BecomeClient FormContainer">
            {
                subscriptionOpen ? <Subscribe token={token} />
                    :
                    <>
                        <div className="banner-prof">
                            <img alt="banner" className="banner" src={banner} />
                            <img alt="profilePicture" className="profilePicture" src={profilePicture} />
                        </div>

                        <div className="name-cost">
                            <h1 className="name">Become {name}'s client</h1>

                            <div className="cost">
                                <div className="price">${price}/</div>
                                <div className="month">month</div>
                            </div>
                        </div>

                        <div className="benefitContainer">
                            <h1>Benefits</h1>

                            <div className="benefits">
                                <div title={`You will be able to message ${name} and ask them questions`}>Messaging</div>
                                <div title={`You will be able to book training sessions with ${name}`}>Booking Sessions</div>
                                <div title={`You will be able to watch video's that ${name} has dedicated for clients only`}>Access to client only videos</div>
                            </div>

                        </div>

                        <div className="contactDisclaimer">Contact {name} at {email} for any questions</div>

                        <div className="button"
                            onClick={
                                () => {
                                    if (!hasDefaultPaymentMethod) setSubscriptionOpen(true);
                                    else {
                                        setLoading(true);

                                        fetchGraphQl(createTrainerClient, { token, trainerId })
                                        .then( res => {
                                            setLoading(false);

                                            if ( res.errors ) return setError(true);

                                            window.location.reload();
                                        })
                                    }
                                }
                            }
                        > { loading ? "Loading" : `Become ${name}'s Client` }</div>
                    </>
            }
        </div>
    )
}
