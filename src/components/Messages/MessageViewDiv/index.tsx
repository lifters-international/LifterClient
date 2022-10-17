import React from 'react';

import { Message, MessageWhoSent, MessageMetaDataType, capitalizeFirstLetter } from "../../../utils";

import "./MessageViewDiv.css";

export type MessageViewDivProps = {
    CurrentWhoSent: MessageWhoSent;
    lastMessage: boolean;
} & Message;

const MessageViewDiv: React.FC<MessageViewDivProps> = ( { id, status, metaDataType, message, createdAt, whoSent, CurrentWhoSent } : MessageViewDivProps) => {
    return (
        <>
            <div className={`MessageViewDiv`} data-id={id} id={`MessageViewDiv${id}`} >
                <div className={whoSent === CurrentWhoSent ? "YouSentMessage" : "TheySentMessage"} title={
                `
                    ${new Date(createdAt).toUTCString()} Message has been: ${ capitalizeFirstLetter(status.toLowerCase()) }
                `}>
                    {
                        metaDataType === MessageMetaDataType.TEXT ? (
                            <div className="MessageViewDivText">{message}</div>
                        ) : metaDataType === MessageMetaDataType.IMAGE ? (
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
    );
}

export default MessageViewDiv;