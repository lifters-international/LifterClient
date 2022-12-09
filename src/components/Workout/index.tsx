import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";

import { useSessionHandler } from "../../hooks";

export type WorkoutsProps = {
}

const Workouts: React.FC<WorkoutsProps> = ({ }: WorkoutsProps) => {
    const authentication = useSessionHandler();

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            || 
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (
            authentication.error[0].message === "jwt expired"
            ||
            authentication.error[0].message === "User does not exist."
        ) return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true}/>;
    }



    return (
        <div className="Workouts">
            <NavBar token={authentication.token!}/>

            <div>
                <h1>Trainers</h1>
            </div>
        </div>
    );
}

export default Workouts;
