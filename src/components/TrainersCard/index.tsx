import React from "react";

import { useNavigate } from "react-router-dom";

import ReactStars from "react-rating-stars-component";

import { TrainersSummary } from "../../utils";

import "./index.css";

const TrainersCard : React.FC<TrainersSummary> = ({ id, name, bio, profilePicture, price, ratingsAverage }) => {
    const navigate = useNavigate();

    return (
        <div className="TrainersSummary">
            <div className="Header">
                <img src={profilePicture} alt="TrainersPicture" />
                <div className="dividerContainer">
                    <div className="name-price">
                        <div className="name">{name}</div>
                        <div className="name price">${price}</div>
                    </div>
                    <ReactStars
                        value={ratingsAverage}
                        edit={false}
                    />
                </div>
            </div>

            <div>
                <div className="bio">{bio}</div>
            </div>

            <div className="FoodDetails_Button" onClick={() => navigate("/trainer/" + id)}>
                VIEW TRAINER
            </div>
        </div>
    )
}

export default TrainersCard;
