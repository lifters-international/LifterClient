import React, { useEffect } from "react";

import { TrainersClientMessage, capitalizeFirstLetter } from "../../../utils";

export type MessageViewProps = {
    lastMessage: boolean;
    sendReadMessage?: ( messageId: string ) => void;
} & TrainersClientMessage;

export const MessageView: React.FC<MessageViewProps> = ({ id, status, timeRead, whoSent, metaDataType, message, createdAt, sendReadMessage }) => {
    useEffect(() => {
        if ( whoSent === "TRAINERS" && status === "DELIVERED" ) sendReadMessage!(id);
    }, [ ]);

    return (
        <>
            <div className={`MessageViewDiv`} data-id={id} id={`MessageViewDiv${id}`} >
                <div className={whoSent === "LIFTERS" ? "YouSentMessage" : "TheySentMessage"} title={
                `
                    ${new Date(createdAt).toUTCString()} Message has been: ${ capitalizeFirstLetter(status.toLowerCase()) }
                `}>
                    {
                        metaDataType === "TEXT" ? (
                            <div className="MessageViewDivText">{message}</div>
                        ) : metaDataType === "IMAGE" ? (
                            <div className="MessageViewDivImage">
                                <img src={message} alt="message" />
                            </div>
                        ) : (
                            <div className="MessageViewDivVideo">
                                <video src={message} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
