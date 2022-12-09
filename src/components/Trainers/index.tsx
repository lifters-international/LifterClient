import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";
import SearchBar from "../SearchBar";
import TrainersCard from "../TrainersCard";

import { useSessionHandler, useSearchTrainer } from "../../hooks";

import "./index.css";

export type WorkoutsProps = {
}

const Workouts: React.FC<WorkoutsProps> = ({ }: WorkoutsProps) => {
    const authentication = useSessionHandler();
    const searchTrainers = useSearchTrainer();

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

    if ( searchTrainers.loading ) return <Loading />

    if ( searchTrainers.error) return <Error message="There was an error getting trainers." reload={true}/>

    return (
        <div className="Trainers">
            <NavBar token={authentication.token!}/>

            <div>
                <div className="TrainerHeader">
                    <SearchBar onSubmit={( value : string ) => {
                        searchTrainers.setSearchTerm(value);
                    }} 
                    placeholder="Search for Trainers" className="TrainersSearchView" iconClass="TrainerSearchView__Icon" searchInputClass="TrainerSearchView__Input" />
                
                    <div className="TrainersLink">Trainers</div>
                    <div className="VideosLink">Videos</div>
                </div>
                <h1>Trainers</h1>

                <div>
                    {
                        searchTrainers.data.length > 0 ? (
                            searchTrainers.data.map((trainers, index) => (
                                <TrainersCard
                                    key={index}
                                    {...trainers}
                                />
                            ))
                        ) : <div className="NoTrainersFound">No Trainers Found</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Workouts;
