import React from 'react';

import ReactStar from "../ReactStars";

import { TrainersRatings, getDiff } from "../../utils";

export const TrainerRatingSlide: React.FC<{ ratings: TrainersRatings[] }> = ({ ratings }) => {
    return (
        <div className="TrainerRatingSlide">
            {
                ratings.map((rating, index) => {
                    return (
                        <div className="rating" key={index} >
                            <div className="name-prof-date">
                                <img src={rating.lifterProfilePicture} alt="profile" className="profile-image" />
                                <div>
                                    <div className="name">{rating.lifterName}</div>
                                    <div className="date">{getDiff(new Date(new Date(rating.createdAt).toLocaleString()), new Date(new Date().toLocaleString()))} ago</div>
                                </div>
                            </div>
                            <ReactStar
                                value={rating.rating}
                                edit={false}
                            />
                            <div className="comment">{rating.comment}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
