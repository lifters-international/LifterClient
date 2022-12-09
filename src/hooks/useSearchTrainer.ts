import React, { useState, useEffect } from 'react';

export type useSearchTrainerProps = {
    token: string;
};

export type useSearchtrainerState = {
    loading: boolean;
    setSearchTerm: (searchTerm: string) => void;
    searchTerm: string;
}

export const useSearchTrainer = (props: useSearchTrainerProps): useSearchtrainerState => {
    const [ state, setState ] = useState<useSearchtrainerState>({
        loading: false,
        searchTerm: "",
        setSearchTerm: (searchTerm: string) => {
            setState({
                ...state,
                searchTerm
            });
        }
    });

    useEffect(() => {
        if (state.searchTerm.length > 0) {}
        else {}

    }, [state.searchTerm]);

    return state;
}
