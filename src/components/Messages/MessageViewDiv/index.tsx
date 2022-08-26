import React from 'react';

import { Message, MessageWhoSent, MessageMetaDataType } from "../../../utils";

import "./MessageViewDiv.css";

export type MessageViewDivProps = {
    CurrentWhoSent: MessageWhoSent;
    lastMessage: boolean;
} & Message;

const MessageViewDiv: React.FC<MessageViewDivProps> = ( { id, status, metaDataType, message, createdAt, whoSent, CurrentWhoSent, lastMessage } : MessageViewDivProps) => {
    return (
        <>
            <div className={`MessageViewDiv ${whoSent === CurrentWhoSent ? "YouSent" : "TheySent"}`} data-id={id} id={`MessageViewDiv${id}`} title={createdAt.toString()}>
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
            {
                lastMessage ? <div className="MessageViewDivDidSee">{status.toLowerCase()}</div> : null
            }
        </>
    );
}

export default MessageViewDiv;