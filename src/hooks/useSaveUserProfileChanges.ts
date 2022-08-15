import React from 'react';
import { fetchGraphQl, GraphqlError, RequestResult, delay, userInformationToSave } from "../utils";
import { updateUserInformationMutation } from "../graphQlQuieries";

export type userSaveUserProfileChangesProps = {
    token: string;
    userInfor: userInformationToSave;
}

export type SaveUserInformationState = {
    isSaving: boolean;
    result?: RequestResult;
    error: GraphqlError[];
    saveSuccessfully: boolean;
    save: (params: userSaveUserProfileChangesProps) => void;
    saveAsync: (params: userSaveUserProfileChangesProps) => Promise<void>;
}

export const useSaveUserProfileChanges = () => {
    const [state, setState] = React.useState<SaveUserInformationState>({
        isSaving: false,

        saveSuccessfully: false,
        
        error: [],

        save: (params: userSaveUserProfileChangesProps) => {
            state.saveAsync(params);
        },

        saveAsync: async (params: userSaveUserProfileChangesProps) => {
            setState({
                ...state,
                isSaving: true
            });

            const result = await fetchGraphQl(updateUserInformationMutation, params);

            const data: { updateUserInformation: RequestResult } = result.data;

            if (data.updateUserInformation.type === "successful") {
                setState({
                    ...state,
                    isSaving: false,
                    result: data.updateUserInformation
                });

                await delay(1000);

                setState({
                    ...state,
                    saveSuccessfully: true,
                });

                await delay(1000);

                setState({
                    ...state,
                    saveSuccessfully: false,
                });
            }
        }
    });

    return state;
}