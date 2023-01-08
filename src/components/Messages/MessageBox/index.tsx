import React from "react";

import ProfilePicture from "../../ProfilePicture";
import MessageBoxContent from "../MessageBoxContent";
import Picker, { Theme } from 'emoji-picker-react';
import { SmileOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useGetUserMessages } from "../../../hooks";
import { MessageMetaDataType, MessageWhoSent } from '../../../utils';

import "./MessageBox.css";
import Loading from "../../Loading";

export type MessageBoxProps = {
    currentMatchId: string;
    token: string;
    name: string;
    profilePicture: string;
}

export type EmojiObject = {
    unified: string;
    emoji: string;
    originalUnified: string;
    names: string[];
    activeSkineTone: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ currentMatchId, token, name, profilePicture } : MessageBoxProps ) => {
    const userMessages = useGetUserMessages(token, currentMatchId);
    const [ showEmojiPicker, setShowEmojiPicker ] = React.useState(false);
    const Messageref =  React.useRef<HTMLTextAreaElement>(null);

    const handleEmojiClick = (event: any, emojiObject: any) => {
        if (Messageref.current) Messageref.current.value += ( emojiObject as EmojiObject ).emoji;
    }

    if (profilePicture.length === 0 ) {
        return (
            <div className="MessageBox">
                <div className="MessageBoxEmpty">
                    Click on Chat to load in load in the Messages 
                </div>
            </div>
        )
    }

    if ( userMessages.loading ) return (
        <div className="MessageBoxLoading">
            <Loading/>
        </div>
    )

    return (
        <div className="MessageBox MessageBoxContainer">
            <div className="MessageBoxDetails">
                <ProfilePicture image={profilePicture} alt={name + " picture"} imageClass="MessageBoxDetailsProfilePicture" />
                <div className="MessageBoxDetailsName">{name}</div>
            </div>

            <MessageBoxContent messages={userMessages.userMessages || []} whoSent={userMessages.whoSent as MessageWhoSent } sendReadMessage={userMessages.sendReadMessage!}/>

            <div className="MessageBoxInput">
                {
                    showEmojiPicker ? (
                        <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
                    ) : null
                }
                <SmileOutlined className="MessageBoxEmojiPicker" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                <textarea className="MessageBoxTextInput" title="Message..." placeholder="Message..." ref={Messageref} />
                <ArrowUpOutlined className="MessageBoxSendButton" onClick={
                    () => {
                        if ( Messageref.current ) {
                            const message = Messageref.current.value;
                            if ( message.length > 0 ) {
                                Messageref.current.value = "";
                                userMessages.sendMessage!(
                                    token,
                                    currentMatchId,
                                    message,
                                    MessageMetaDataType.TEXT,
                                );
                            }
                        }
                    }
                }/>
            </div>
        </div>
    )
};

export default MessageBox;
