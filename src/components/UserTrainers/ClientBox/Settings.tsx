import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoMdSend } from "react-icons/io";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { TrainersDecision, fetchGraphQl, getDiff, UpdateTrainerClient } from "../../../utils";

import { createTrainerClient, cancelCreateTrainersRequest, updateTrainerClientSettings } from "../../../graphQlQuieries"

import { CheckBox } from "../../CheckBox";

type SettingsProps = {
    name: string;
    profilePicture: string;
    trainersDecision: TrainersDecision;
    dateCreated: number;
    client: string;
    token: string;
    canSeeUserFoodHistory: boolean;
}

export const Settings: React.FC<SettingsProps> = ({ name, profilePicture, client, trainersDecision, token, dateCreated, canSeeUserFoodHistory }) => {
    const [acceptClientLoading, setAcceptClientLoading] = useState(false);

    const [ settingsDropDown, setSettingsDropDown] = useState(false);

    const [ updateSettings, setUpdateSettings ] = useState<UpdateTrainerClient>();

    const [ savingLoading, setSavingLoading] = useState(false);

    const acceptClient = async (accept: boolean) => {
        if (acceptClientLoading) return;

        setAcceptClientLoading(true);

        fetchGraphQl( accept? createTrainerClient : cancelCreateTrainersRequest, { token, trainerId: client })
            .then(() => {
                setAcceptClientLoading(false);

                window.location.reload();
            })
    }

    return (
        <div className="ClientSettings">
            <div className="ClientBoxDetails">
                <div className="client-infor">
                    <img src={profilePicture} alt={name + " picture"} className="profile-pic" />
                    <div className="client-name">{name}</div>
                </div>

                <div className="client-tabs">
                    <Link
                        to={`/trainers/?&client=${client}&tab=messages`}
                        className="client-tab"
                    >
                        <IoMdSend size={40} color="#FF3636" />
                    </Link>
                </div>
            </div>

            <div className="ClientBoxContent">
                {
                    trainersDecision === TrainersDecision.VERIFYING_PAYMENT || trainersDecision === TrainersDecision.PENDING || trainersDecision === TrainersDecision.DENIED ?
                        (
                            <div className="AcceptClientBoxContent">
                                <h1 className="name">
                                    {`${trainersDecision === TrainersDecision.DENIED ? "Re-" : ""}`}
                                    Apply to be {name}'s client
                                </h1>

                                <div className="benefitContainer">
                                    <h1>Benefits</h1>

                                    <div className="benefits">
                                        <div title={`You will be able to message ${name} and ask them questions`}>Messaging</div>
                                        <div title={`You will be able to book training sessions with ${name}`}>Booking Sessions</div>
                                        <div title={`You will be able to watch video's that ${name} has dedicated for clients only`}>Access to client only videos</div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <div className="button accept"
                                        onClick={
                                            () => acceptClient(true)
                                        }
                                    >
                                        {
                                            acceptClientLoading ?
                                                "Loading..." :
                                                trainersDecision === TrainersDecision.VERIFYING_PAYMENT ?
                                                    "Verifying Payment. We will notify you once verified" : `${trainersDecision === TrainersDecision.DENIED ? "Re-" : ""}Apply`
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="AcceptClientBoxContent accepted">
                                <h1 className="date">Client Since: {getDiff(new Date(new Date(dateCreated).toLocaleString()), new Date(new Date().toLocaleString()))} ago </h1>

                                <div className="dropdown">
                                    <h1 className="title" onClick={() => setSettingsDropDown(!settingsDropDown)}>
                                        Trainers Settings
                                        {
                                            !settingsDropDown ?  <AiOutlineArrowDown size={30} className="arrow" onClick={() => setSettingsDropDown(true)} /> : <AiOutlineArrowUp size={30} className="arrow" onClick={() => setSettingsDropDown(false)} />
                                        }
                                    </h1>

                                    {
                                        !settingsDropDown && (
                                            <div className="contents">
                                                <div className="button save"
                                                    onClick={() => {
                                                        setSavingLoading(true);
                                                        fetchGraphQl(updateTrainerClientSettings, { token, clientId: client, infor: updateSettings })
                                                        .then((res) => window.location.reload());
                                                    }}
                                                >
                                                    {`${savingLoading ? "Saving...": "Save"}`}
                                                </div>
                                                <CheckBox
                                                    checked={canSeeUserFoodHistory}
                                                    label="Can Trainer See Your Daily Food History"
                                                    des="Activating this will allow Trainer to see your daily food history"
                                                    onChange={( val : boolean ) => setUpdateSettings(prev => ({ ...prev, canSeeUserFoodHistory: val }) ) }
                                                />
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="button"
                                    onClick={
                                        () => acceptClient(false)
                                    }

                                    title="This will end the client subscription and delete them as a client"
                                >
                                    {
                                        acceptClientLoading ?
                                            "Loading..." : `Cancel Subscription`
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
