import React from 'react';
import { Navigate } from 'react-router-dom';
import Error from "../Error";

export const CancelClient: React.FC<{ clientId?: string }> = ({ clientId }) => {

    if ( !clientId ) return <Error message="Problem getting client" reload={true} />

    return (
        <Navigate to={`/trainers?&client=${clientId}&tab=settings`} />
    )
}
