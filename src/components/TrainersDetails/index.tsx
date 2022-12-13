import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { useSessionHandler, useGetTrainerDetails } from '../../hooks';

import Error from '../Error';
import Loading from "../Loading";
import NavBar from "../NavBar";
import Page404 from "../404";

import ReactStars from "react-rating-stars-component";

import { MdVerifiedUser } from "react-icons/md";

import "./index.css"

export type Props = {};

const TrainersDetails: React.FC<Props> = ({ }: Props) => {
    let { id } = useParams();
    const navigation = useNavigate();

    const authentication = useSessionHandler();
    const trainerDetails = useGetTrainerDetails({ id: id || "" });

    if (!id) return <Page404 />;

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            ||
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            ||
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (trainerDetails.loading) return <Loading />;

    if (trainerDetails.error) return <Error message="Problem finding trainer, please try again later." />;

    console.log(trainerDetails.data);
    return (
        <div className="TrainerDetailsPage">
            <NavBar token={authentication.token!} />

            <div className="TrianerDetails">
                <div className="bannerImage" style={{ backgroundImage: `url(${trainerDetails.data?.bannerImage})` }} />

                <div className="DetailsContainer">
                    <div className="dets">
                        <img className="trainerProfilePicture" src={trainerDetails.data?.profilePicture} alt={`${trainerDetails.data?.name} profile`} />
                        <div className="trainer-dets">
                            <div>
                                <div className="name-verification">
                                    <div className="trainerName">{trainerDetails.data?.name}</div>
                                    {
                                        trainerDetails.data?.onBoardCompleted ? 
                                        <MdVerifiedUser color="#FF3636" size={30} className="trainerVerified"/> : null
                                    }
                                </div>
                                <ReactStars
                                    name="Trainers"
                                    value={trainerDetails.data?.ratingsAverage!}
                                    editing={false}
                                />
                            </div>
                            <div className="trainerBio">{trainerDetails.data?.bio}</div>
                            <div>{trainerDetails.data?.clientCount} Clients</div>
                        </div>
                    </div>

                    <div className="trainer-dets-button">
                        <div className="button">Message</div>
                        <div className="button">Follow</div>
                        <div className="button">Share</div>
                        <div className="button">Write A Review</div>
                        {
                            trainerDetails.data?.onBoardCompleted ?
                                <div className="trainer-price button">
                                    Become Client<div className="price">${trainerDetails.data?.price}</div>
                                </div> :
                                <div className="button">Can't become client until trainer is verified</div>
                        }
                    </div>
                </div>

                <div className="TrainersSlides">
                    <div className="tabs">
                        <div className="tab">Home</div>
                        <div className="tab">Reviews</div>
                        <div className="tab">Write A Review</div>
                    </div>
                    <div className="slide">
                        asdadasdadasd
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainersDetails;
