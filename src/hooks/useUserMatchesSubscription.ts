import React from 'react';

import { newUserMatchesSubscription, getUserUnAcceptedMatches } from '../graphQlQuieries';
import { useSubscription } from '@apollo/client';
import { newUserSubscriptionMatches, client, fetchGraphQl, SubscriptionType, newUserMatches } from "../utils";

export type UserMatchesSubscription = {
    loading: boolean;
    error: any;
    data?: newUserSubscriptionMatches;
}

export const useUserMatchesSubscription = (token: string): UserMatchesSubscription => {
    const [ state, setState ] = React.useState<UserMatchesSubscription>({
        loading: false,
        error: [],
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
            let data:  { getUserUnAcceptedMatches: newUserSubscriptionMatches } = result.data;
            
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
            let data:  { newUserMatches: newUserMatches } = subscriptionData.data;
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
                        data: { 
                            userSubscription: prevState.data?.userSubscription as SubscriptionType,
                            matches: [data.newUserMatches].concat(prevState.data!.matches)
                        }
                    }
                });
            }
        }
    });

    return state;
}