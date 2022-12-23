import React from "react";

import { getUserAcceptedMatches } from "../graphQlQuieries";
import { AcceptedUserMatches, fetchGraphQl, socket } from "../utils";

export type UserAcceptedMatchesSubscription = {
    loading: boolean;
    error: any;
    data: AcceptedUserMatches[];
}

export const useUserAcceptedMatchesSubscription = (token: string ): UserAcceptedMatchesSubscription => {
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

        if (socket != null ) {
            socket.onMessages("ChangeMatchesOrder", () => {
                setChange(true);
            });
        }

    }, [token]);

    React.useEffect(() => {
        if (!change) return;
        
        fetchChange();
        setChange(false);
    }, [change])

    return state;
}
