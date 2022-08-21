import React from 'react';

import { newUserMatchesSubscription, getUserUnAcceptedMatches } from '../graphQlQuieries';
import { useSubscription } from '@apollo/client';
import { newUserMatches as newUserMatchesType, client, fetchGraphQl } from "../utils";

export type UserMatchesSubscription = {
    loading: boolean;
    error: any;
    data: newUserMatchesType[];
}

export const useUserMatchesSubscription = (token: string): UserMatchesSubscription => {
    const [ state, setState ] = React.useState<UserMatchesSubscription>({
        loading: false,
        error: [],
        data: []
    });

    React.useEffect(() => {
        if ( token == null ) return;

        setState(prevState => {
            return { 
                ...prevState,
                loading: true
            }
        });

        fetchGraphQl(getUserUnAcceptedMatches, { token }).then( result => {
            let data:  { getUserUnAcceptedMatches: newUserMatchesType[] } = result.data;
            
            if (result.errors) {
                setState(prevState => {
                    return { 
                        ...prevState,
                        loading: false,
                        error: result.errors
                    }
                });
            } else {
                setState(prevState => {
                    return { 
                        ...prevState,
                        loading: false,
                        data: data.getUserUnAcceptedMatches
                    }
                });
            }
        })
    }, [token])

    useSubscription(newUserMatchesSubscription, {
        variables: { userToken: token },
        client,
        onSubscriptionData: ({ client, subscriptionData }) => {
            let data:  { newUserMatches: newUserMatchesType } = subscriptionData.data;
            if (subscriptionData.error) {
                setState(prevState => {
                    return { 
                        ...prevState,
                        error: subscriptionData.error
                    }
                });
            } else {
                setState(prevState => {
                    return { 
                        ...prevState,
                        data: [data.newUserMatches].concat(prevState.data)
                    }
                });
            }
        }
    });

    return state;
}