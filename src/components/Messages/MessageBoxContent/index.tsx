import React from 'react';

import "./MessageBoxContent.css";
import { Message, MessageWhoSent } from '../../../utils';
import MessageViewDiv from "../MessageViewDiv";

export type MessageBoxContentProps = {
    messages: Message[];
    whoSent: MessageWhoSent;
    sendReadMessage?: ( messageId: string ) => void;
}

const MessageBoxContent: React.FC<MessageBoxContentProps> = ({ messages, whoSent, sendReadMessage }) => {
    if (messages.length === 0 ) {
        return (
            <div className="MessageBoxContent">
                <div className="NoMessages">Start by saying hi 👋</div>
            </div>
        )
    }

    return (
        <div className={`MessageBoxContent Content`}>
            {
                messages.map( (message, index) => {
                    sendReadMessage!(message.id);
                    return (
                        <MessageViewDiv key={`MessageViewDiv-${index}`} 
                            {...message}
                            lastMessage={index === messages.length - 1}
                            CurrentWhoSent={whoSent}
                        />
                    )
                })
            }
        </div>
    )
}

export default MessageBoxContent;