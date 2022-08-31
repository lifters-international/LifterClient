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
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        }
    }, [messages]);

    if (messages.length === 0 ) {
        return (
            <div className="MessageBoxContent">
                <div className="NoMessages">Start by saying hi 👋</div>
            </div>
        )
    }

    return (
        <div className={`MessageBoxContent Content`} ref={contentRef}>
            {
                messages.map( (message, index) => {
                    sendReadMessage!(message.id);
                    if ( index === 0 ) return (
                        <MessageViewDiv key={`MessageViewDiv-${index}`} 
                            {...message}
                            lastMessage={index === messages.length - 1}
                            CurrentWhoSent={whoSent}
                        />
                    );
                    else if ( messages[index].whoSent === messages[index - 1].whoSent ) return (
                        <MessageViewDiv key={`MessageViewDiv-${index}`} 
                            {...message}
                            lastMessage={index === messages.length - 1}
                            CurrentWhoSent={whoSent}
                        />
                    );
                    else return ( <div className="divideTheySentYouSent" key={`divideTheySentYou-${index}`}>
                        <MessageViewDiv key={`MessageViewDiv-${index}`} 
                            {...message}
                            lastMessage={index === messages.length - 1}
                            CurrentWhoSent={whoSent}
                        />
                    </div> )
                })
            }
        </div>
    )
}

export default MessageBoxContent;