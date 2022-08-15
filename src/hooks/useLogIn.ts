import React from 'react';

import { fetchGraphQl, GraphqlError, JsonToken } from '../utils';

import { userLogInMutation } from '../graphQlQuieries';

export type LogInState = {
    logIn: (userName: string, password: string) => void;

    loggedInSuccess: boolean;

    error: GraphqlError[];

    loading: boolean;
}

export const useLogIn = (saveToken = true) => {
    const [ state, setState ] = React.useState<LogInState>({
        logIn: (userName: string, password: string) => {
            if (userName.length < 1 || password.length < 1) {
                setState({
                    ...state,
                    error: [{
                        extensions: {
                            code: "Please feel out the form currectly",
                            exception: {
                                name: "Incorrectly Filled Form",
                                message: "Please feel out the form currectly",
                                stacktrace: []
                            }
                        },

                        locations: [
                            {
                                column: 0,
                                line: 0,
                            }
                        ],

                        path: [],
                        
                        message: "Please fill in all fields"
                    }],
                    loading: false
                });
            } else {
                setState({ ...state, loading: true });
                fetchGraphQl(userLogInMutation, {
                    username: userName,
                    password
                }).then(response => {
                    if (response.data) {
                        const data: { logIn: JsonToken} = response.data;

                        if (data.logIn.token) {
                            if (saveToken) {
                                localStorage.setItem('token', data.logIn.token);
                            }

                            setState({
                                ...state,
                                loggedInSuccess: true,
                                error: [],
                                loading: false
                            });
                        }else {
                            setState({
                                ...state,
                                loggedInSuccess: false,
                                error: [],
                                loading: false
                            });
                        }
                    } else {
                        setState({
                            ...state,
                            error: response.errors,
                            loading: false
                        });
                    }
                }).catch(err => {
                    setState({
                        ...state,
                        error: [{
                            extensions: {
                                code: "Incorrect Password or Email",
                                exception: {
                                    name: "Incorrect Password or Email",
                                    message: "Incorrect Password or Email",
                                    stacktrace: []
                                }
                            },
    
                            locations: [
                                {
                                    column: 0,
                                    line: 0,
                                }
                            ],
    
                            path: [],
                            
                            message: "Incorrect Password or Email"
                        }],
                        loading: false
                    });
                });
            }
        },
        loggedInSuccess: false,
        error: [],
        loading: false 
    });

    return state;
}