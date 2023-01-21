import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Error from "../Error";

export const CancelClient: React.FC<{ clientId?: string }> = ({ clientId }) => {
    const location = useLocation();

    let queryShow = new URLSearchParams(location.search).get("redirectTab");

    if ( !clientId ) return <Error message="Problem getting client" reload={true} />

    return (
        <Navigate to={`/trainers?&client=${clientId}&tab=${ queryShow || "settings"}`} />
    )
}
