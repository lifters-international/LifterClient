import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionHandler, useSignInUserData } from '../../hooks';
import Loading from '../Loading';
import Error from '../Error';
import NavBar from '../NavBar';
import PeerContainer from '../PeerMatch';

const Preview: React.FC = () => {
    const authentication = useSessionHandler();
    const signedInUser = useSignInUserData(authentication.token!);

    
    if ( authentication.loading ) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            || 
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/logIn" />;
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if ( signedInUser.loading ) return <Loading />;

    if (signedInUser.error) return <Error {...signedInUser.error[0]} reload={true} />;

    return (
        <>
            <NavBar token={authentication.token!} />
            <PeerContainer {...signedInUser.data} />
        </>
    );
}

export default Preview;