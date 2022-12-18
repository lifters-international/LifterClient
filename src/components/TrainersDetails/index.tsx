import React, { useState } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";

import { useSessionHandler, useGetTrainerDetails } from '../../hooks';

import Error from '../Error';
import Loading from "../Loading";
import NavBar from "../NavBar";
import Page404 from "../404";

import { TrainerHomeSlide } from "./TrainerHomeSlide";
import { TrainerRatingSlide } from "./TrainerRatingSlide";
import { TrainerWriteSlide } from "./TrainerWriteSlide";

import ReactStars from "../ReactStars";

import { MdVerifiedUser, MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { HiPencil } from "react-icons/hi";

import "./index.css";

const TrainersDetails: React.FC = () => {
    let { id } = useParams();
    const location = useLocation();
    let queryShow = new URLSearchParams(location.search).get("show");

    queryShow = ["home", "reviews", "write"].includes(queryShow || "" ) ? queryShow : "home";

    const authentication = useSessionHandler();
    const trainerDetails = useGetTrainerDetails({ id: id || "" });

    const [show, setShow] = useState(queryShow);

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
                                    value={trainerDetails.data?.ratingsAverage!}
                                    edit={false}
                                />
                            </div>
                            <div className="trainerBio">{trainerDetails.data?.bio}</div>
                            <div>{trainerDetails.data?.clientCount} Clients</div>
                        </div>
                    </div>

                    <div className="trainer-dets-button">
                        <AiFillMessage color="#FF3636" size={40} title="message" className="button" />
                        <IoIosShareAlt color="#FF3636" size={40} title="share" className="button" />
                        {
                            trainerDetails.data?.onBoardCompleted ?
                                <div className="trainer-price button">
                                    <MdAttachMoney color="#FF3636" size={40} title={`Become a client for $${trainerDetails.data?.price}`} />
                                </div> :
                                <MdMoneyOff color="#FF3636" size={40} title="Can't become client until trainer is verified" className="button" />
                        }
                    </div>
                </div>

                <div className="TrainersSlides">
                    <div className="tabs">
                        <div className={`tab${show === "home" ? " showing" : ""}`} onClick={() => setShow("home")}>
                            <AiFillHome color="#FF3636" size={40} title="home"/>
                        </div>
                        <div className={`tab${show === "reviews" ? " showing" : ""}`} onClick={() => setShow("reviews")}>
                            <BsStars color="#FF3636" size={40} title="Reviews"/>
                        </div>
                        <div className={`tab${show === "write" ? " showing" : ""}`} onClick={() => setShow("write")}>
                            <HiPencil color="#FF3636" size={40} title="Write A Review" />
                        </div>
                    </div>
                    <div className="slide">
                        { show === "home" && <TrainerHomeSlide gyms={trainerDetails.data?.gyms!} trainerId={id}  token={authentication.token!} /> }
                        { show === "reviews" && <TrainerRatingSlide ratings={trainerDetails.data?.ratings!} /> }
                        { show === "write" && <TrainerWriteSlide token={authentication.token!} name={ trainerDetails.data?.name! } trainerId={id} /> }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainersDetails;
