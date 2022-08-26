import React from "react";

import { getUserAcceptedMatches } from "../graphQlQuieries";
import { AcceptedUserMatches, fetchGraphQl, getServerUrl } from "../utils";
import { io } from "socket.io-client";

export type UserAcceptedMatchesSubscription = {
    loading: boolean;
    error: any;
    data: AcceptedUserMatches[];
}

export const useUserAcceptedMatchesSubscription = (token: string): UserAcceptedMatchesSubscription => {
    const [ state, setState ] = React.useState<UserAcceptedMatchesSubscription>({
        loading: false,
        error: [],
        data: []
    });

    const [ change, setChange ] = React.useState(false);

    const fetchChange = () => {
        fetchGraphQl(getUserAcceptedMatches, { token }).then( result => {
            let data: { getUserAcceptedMatches: AcceptedUserMatches[] } = result.data;

            if ( result.errors) {
                setState(prevState => {
                    return {
                        ...prevState,
                        error: result.errors,
                        loading: false
                    };
                } );
            }else {
                setState(prevState => {
                    return {
                        ...prevState,
                        data: data.getUserAcceptedMatches,
                        loading: false
                    };
                } );
            }
        });
    };

    React.useEffect(() => {
        if ( token == null ) return;

        setState(prevState => {
            return {
                ...prevState,
                loading: true
            };
        });

        fetchChange();

        const socket = io(getServerUrl() + "messages", {
            query: {
                token
            }
        });

        socket.on("ChangeMatchesOrder", () => {
            setChange(true);
        })

    }, [token]);

    React.useEffect(() => {
        if (!change) return;
        
        fetchChange();
        setChange(false);
    }, [change])

    return state;
}
