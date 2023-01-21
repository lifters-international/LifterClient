import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { MessageView } from "./MessageView";

import { AiFillSetting, AiFillSmile } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

import Picker, { Theme } from 'emoji-picker-react';

import { TrainersClientMessage } from "../../../utils";

export type EmojiObject = {
    unified: string;
    emoji: string;
    originalUnified: string;
    names: string[];
    activeSkineTone: string;
}

export type MessageProps = {
    token: string;
    name: string;
    profilePicture: string;
    client: string;
    trainer: string;
    messages: TrainersClientMessage[];
    sendMessage?: ( token: string, message: string, metaDataType: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO" ) => void;
    sendReadMessage?: ( messageId: string ) => void;
}

export const Message: React.FC<MessageProps> = ({ token, name, profilePicture, client, trainer, messages, sendMessage, sendReadMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const Messageref = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleEmojiClick = (emojiObject: any, event: any) => {
        if (Messageref.current) Messageref.current.value += (emojiObject as EmojiObject).emoji;
    }

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        }
    }, [messages]);

    return (
        <div className="ClientMessage MessageBoxContainer">
            <div className="ClientBoxDetails">
                <Link className="client-infor" to={`/trainer/${trainer}`}>
                    <img src={profilePicture} alt={name + " picture"} className="profile-pic" />
                    <div className="client-name">{name}</div>
                </Link>

                <div className="client-tabs">
                    <Link
                        to={`/trainers/?&client=${client}&tab=settings`}
                        className="client-tab"
                    >
                        <AiFillSetting size={40} color="#FF3636" />
                    </Link>
                </div>
            </div>

            {
                messages.length === 0 ? (
                    <div className="MessageBoxContent">
                        <div className="NoMessages">Start by saying hi 👋</div>
                    </div>
                ) : (
                    <div className="MessageBoxContent Content" ref={contentRef}>
                        {
                            messages.map((message, index) => {
                                if (index === 0) return (
                                    <MessageView key={`MessageView-${index}`}
                                        {...message}
                                        lastMessage={index === messages.length - 1}
                                        sendReadMessage={sendReadMessage}
                                    />
                                );

                                else if (messages[index].whoSent === messages[index - 1].whoSent) return (
                                    <MessageView
                                        key={`MessageView-${index}`}
                                        {...message}
                                        lastMessage={index === 0}
                                        sendReadMessage={sendReadMessage}
                                    />
                                );
                                else return (<div className="divideTheySentYouSent" key={`divideTheySentYou-${index}`}>
                                    <MessageView key={`MessageViewDiv-${index}`}
                                        {...message}
                                        lastMessage={index === messages.length - 1}
                                        sendReadMessage={sendReadMessage}
                                    />
                                </div>)
                            })
                        }
                    </div>
                )
            }

            <div className="MessageBoxInput">
                {
                    showEmojiPicker ? (
                        <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
                    ) : null
                }
                <AiFillSmile className="MessageBoxEmojiPicker" size={20} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                <textarea className="MessageBoxTextInput" title="Message..." placeholder="Message..." ref={Messageref} />
                <BiSend className="MessageBoxSendButton" size={30} onClick={
                    () => {
                        if (Messageref.current) {
                            const message = Messageref.current.value;
                            if (message.length > 0) {
                                Messageref.current.value = "";
                                sendMessage!( token, message, "TEXT" )
                            }
                        }
                    }
                } />
            </div>
        </div>
    )
}
