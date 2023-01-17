import React from 'react';

import { useNavigate } from "react-router-dom";

import { BsFillShieldLockFill } from "react-icons/bs";

import { TrainerVideoSummary, getDiff, shortenText, shortenNumber } from "../../utils";

export const VideoSummary: React.FC<{ profilePicture?: string, trainerName?: string } & TrainerVideoSummary> = ({ id, trainerName, thumbnail, duration, clientOnly, isClient, title, views, updatedAt, profilePicture }) => {
    const navigate = useNavigate();

    let durationSummary = new Date(duration * 1000).toISOString().substring(11, 19);

    durationSummary = durationSummary.substring(0, 3) === "00:" ? durationSummary.substring(3) : durationSummary;

    let date = new Date(new Date(updatedAt).toLocaleString());

    return (
        <div className={`videoSummary${clientOnly ?
            isClient ? " watchable" : ""
            : " watchable"}`}

            onClick={
                () => {
                    if ((clientOnly && isClient) || !clientOnly) navigate(`/videos/${id}`);
                }
            }
        >
            <div className="vidInfor">
                <img className="thumbnail" src={thumbnail} alt="thumbnail" />
                <span className="duration">{durationSummary}</span>
            </div>

            <div className={`bottom ${profilePicture ? "prof" : ""}`}>
                {
                    profilePicture && <img className="profilePicture" src={profilePicture} alt="profilePicture" />
                }

                <div>
                    <div className="desc">{shortenText(title, 52)}</div>
                    <div className="dets">
                        { shortenText(trainerName || "", 8) } &#8226; &nbsp;
                        {shortenNumber(views)} views &#8226; &nbsp;
                        {getDiff(date, new Date(new Date().toLocaleString()))} ago &nbsp;
                        {
                            clientOnly ?
                                isClient ? null : <BsFillShieldLockFill color="#FF3636" size={20} title="client only" />
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
