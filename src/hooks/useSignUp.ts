import React from "react";

import { fetchGraphQl, GraphqlError } from "../utils";

import { userSignUpMutation } from "../graphQlQuieries";

export type SignUpState = {
    signUp: (userName: string, email: string, password: string) => void;
    signUpSuccessful: boolean;
    error: Array<GraphqlError>;
    loading: boolean;
}

export const useSignUp = () => {
    const [state, setState] = React.useState<SignUpState>({
        signUpSuccessful: false,
        loading: false,
        error: [],
        signUp: (userName: string, email: string, password: string) => {

            if ( userName.length < 1 || email.length < 1 || password.length < 1 ) {
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
            }
            else { 
                setState({ ...state, loading: true });
                fetchGraphQl(userSignUpMutation, {
                    password,
                    email,
                    username: userName,
                }).then(response => {
                    setState({ ...state, loading: false });
                    if (response.errors) {
                        setState({ ...state, error: response.errors });
                    } else {
                        setState({ ...state, signUpSuccessful: true });
                    }
                });
            }
        },
    });

    return state
}