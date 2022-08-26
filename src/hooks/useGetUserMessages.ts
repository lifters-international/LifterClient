import React from "react";
import { io } from "socket.io-client";

import { getUserMessages } from "../graphQlQuieries";
import { GetUserMessagesResult, fetchGraphQl, Message, MessageWhoSent, getServerUrl, MessageMetaDataType } from "../utils";

export type UserMessagesState = {
    userMessages: Message[] | null;
    loading: boolean;
    whoSent: MessageWhoSent | null;
    error: any;
    sendReadMessage?: ( messageId: string ) => void;
    sendMessage?: ( token: string, matchId: string, message: string, metaDataType: MessageMetaDataType) => void;
};

export const useGetUserMessages = ( token: string, matchId: string ): UserMessagesState => {
    const [ messageState, setMessageState ] = React.useState<UserMessagesState>({
        userMessages: null,
        loading: false,
        error: null,
        whoSent: null,
    });

    React.useEffect( () => {
        if ( token == null ) return;

        fetchGraphQl( getUserMessages, { token, matchId }).then( result => {
            let data :  GetUserMessagesResult = result.data;

            const socket = io(getServerUrl() + "messages", {
                query: {
                    token
                }
            });
    
            socket.on("NewMessage", ( newMessage: { matchId: string, message: Message }) => {
                if ( newMessage.matchId === matchId ) {
                    console.log(newMessage)
                    setMessageState(prevState => {
                        return {
                            ...prevState,
                            userMessages: [...(prevState.userMessages || []), newMessage.message].sort( (a, b) => Number(a.createdAt) - Number(b.createdAt)),
                        };
                    } );
                }
            });
    
            setMessageState(prevState => {
                return {
                    ...prevState,
                    loading: true,
                };
            });
            
            if ( result.errors ) {
                setMessageState(prevState => {
                    return {
                        ...prevState,
                        error: result.errors,
                        loading: false,
                    };
                });
            }else {
                setMessageState(prevState => {
                    return {
                        ...prevState,
                        userMessages: data.getUserMessages.messages.sort( (a, b) => Number(a.createdAt) - Number(b.createdAt)),
                        whoSent: data.getUserMessages.whoIsUser,
                        loading: false,
                        sendMessage: ( token: string, matchId: string, message: string, metaDataType: MessageMetaDataType) => {
                            socket.emit("sendMessage", { token, matchId, message, metaDataType})
                        },
                        sendReadMessage: ( messageId: string) => {
                            socket.emit("sendReadMessage", { messageId, token, matchId })
                        }
                    };
                } );
            }
        });

    }, [ token, matchId ] );


    return messageState;
}