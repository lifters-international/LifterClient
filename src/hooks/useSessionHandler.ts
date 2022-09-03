import React from 'react';
import { fetchGraphQl, GraphqlError } from "../utils";
import { userHasLoggedInMutation } from "../graphQlQuieries";

export type SessionHandler = {
    authenticated: boolean,
    token: string | null,
    loading: boolean;
    error?: Array<GraphqlError>;
}

export const useSessionHandler = () => {
    const [ autentication, setAuthentication ]  = React.useState<SessionHandler>({
        authenticated: false,
        token: null,
        loading: false
    });

    React.useState(() => {
        setAuthentication(prevState => {
            return {
                ...prevState,
                loading: true,
            };
        });
        
        fetchGraphQl(
            userHasLoggedInMutation,
            {
                token: localStorage.getItem("token") || null
            }
        )
        .then(result => {
            setAuthentication({
                authenticated: result.data ? true : false,
                token: result.data ? localStorage.getItem('token') : null,
                loading: false,
                error: result.errors
            })
        })
    });

    return autentication;
}