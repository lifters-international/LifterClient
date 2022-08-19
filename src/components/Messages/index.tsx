import * as React from 'react';
import Loading from "../Loading";
import NavBar from "../NavBar";
import PeerMatchContainer from "../PeerMatch";
import { Navigate } from "react-router-dom";
import { useSessionHandler, useGetUserMatches } from '../../hooks';
import Error from '../Error';


const Messages: React.FC = () => {
    const authentication = useSessionHandler();

    if ( authentication.loading ) return <Loading />;

    if (authentication.error) {
        if (authentication.error[0].message === "jwt malformed") return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true}/>;
    }

    return (
        <>
            <NavBar token={authentication.token!}/>
        </>
    )
}

export default Messages;