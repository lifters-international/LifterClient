import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";
import SearchBar from "../SearchBar";
import { VideoSummary } from "../TrainersDetails/VideoSummary";

import { RiEmpathizeFill } from "react-icons/ri";

import { useSessionHandler, useSearchVideo } from "../../hooks";

import "./index.css";

const Workouts: React.FC = () => {
    const authentication = useSessionHandler();
    const searchVideos = useSearchVideo(authentication.token!);
    const navigate = useNavigate();

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
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (searchVideos.loading) return <Loading />

    if (searchVideos.error) return <Error message="There was an error getting videos." reload={true} />

    return (
        <div className="Videos">
            <NavBar token={authentication.token!} />

            <div>
                <div className="VideosHeader">
                    <SearchBar onSubmit={( value : string ) => {
                        searchVideos.setSearchTerm(value);
                    }}
                        placeholder="Search for Trainers Videos" className="VideosSearchView" iconClass="TrainerSearchView__Icon" searchInputClass="VideosSearchView__Input" />

                    <RiEmpathizeFill className="TrainersLink" size={60} color="red" onClick={() => navigate("/trainers")}/>
                </div>
                <div className="VideoSummaryContainer">
                    {
                        searchVideos.data.map((video, index) => {
                            return <VideoSummary key={index} {...video} />
                        })
                    }
                </div>

                {
                    searchVideos.data.length === 0 && <div className="NoVideosFound">No Trainers Found</div>
                }
            </div>
        </div>
    );
}

export default Workouts;
