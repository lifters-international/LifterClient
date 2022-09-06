import React from "react";

import { getUserSubscriptionInfor } from "../graphQlQuieries";

import { UserSubscriptionInfor, fetchGraphQl, UserSubscriptionInforResult } from "../utils";

export type UserSubscriptionInforState = {
    result?: UserSubscriptionInfor;

    loading: boolean;

    error: any;
}

export const useUserSubscriptionInfor = ( token : string ): UserSubscriptionInforState => {
    const [ state, setState ] = React.useState<UserSubscriptionInforState>({
        loading: false, 
        error: []
    });

    React.useEffect(() => {
        if ( token == null ) return;

        setState( prev => {
            return  { 
                ...prev,
                loading: true,
            }
        });

        fetchGraphQl(getUserSubscriptionInfor, { token }).then( result => {
            let data: UserSubscriptionInforResult = result.data;

            if ( result.errors ) {
                setState( prev => {
                    return  { 
                        ...prev,
                        loading: false,
                        error: result.errors
                    }
                });
            }else {
                setState( prev => {
                    return  { 
                        ...prev,
                        loading: false,
                        result: data.getUserSubscriptionInfor
                    }
                });
            }
        })
    }, [ token ]);

    return state;
}