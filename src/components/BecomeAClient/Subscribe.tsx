import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { fetchGraphQl, GraphqlError } from "../../utils";
import { becomeClientSubSecrets } from "../../graphQlQuieries";

import Error from "../Error";
import Loading from "../Loading";

import { SubscribeCheckOutForm } from "./SubscribeCheckOutForm";

const stripePromise = loadStripe("pk_live_51LtTPwB5yAwp5CklX1Hyp6viNlcom8RXHF4ldHeJMS9hnemCELkREExZdUruXK5WNqXhHDPsMxg3bH4qYofwDp1800CFtfzMzc");

export const Subscribe:React.FC<{ token: string }> = ({ token }) => {
    const { id: trainerId } = useParams();

    const [subSecrets, setSubSecrets] = useState("");

    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState<GraphqlError[]>([]);

    useEffect( () => {
        fetchGraphQl(becomeClientSubSecrets, { token, trainerId })
        .then( res => {
            if ( res.errors ) {
                setErrors(res.errors);
            }else {
                setSubSecrets(res.data.becomeClientSubSecrets.clientSecret);
            }

            setLoading(false);
        })
    }, []);

    if ( loading ) return <Loading />;

    if ( errors.length > 0 ) return <Error {...errors[0]} reload={true} />;

    if ( subSecrets.length === 0 ) return <></>

    return (
        <div className="subscribe">
            { 
                subSecrets && (
                    <Elements options={{ clientSecret: subSecrets, appearance: { theme: "night", labels: "floating" }}} stripe={stripePromise}>
                        <SubscribeCheckOutForm />
                    </Elements>
                )
            }
        </div>
    )
}
