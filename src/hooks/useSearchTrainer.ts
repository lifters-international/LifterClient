import { fetchGraphQl, TrainersSummary } from '../utils';
import React, { useState, useEffect } from 'react';

import { searchTrainers } from "../graphQlQuieries";

export type useSearchtrainerState = {
    loading: boolean;
    error: boolean;
    setSearchTerm: (searchTerm: string) => void;
    searchTerm: string;
    data: TrainersSummary[]
}

export const useSearchTrainer = ( ): useSearchtrainerState => {
    const [ state, setState ] = useState<useSearchtrainerState>({
        loading: false,
        error: false,
        searchTerm: "",
        setSearchTerm: (searchTerm: string) => {
            setState({
                ...state,
                searchTerm
            });
        },
        data: []
    });

    useEffect(() => {
        setState({
           ...state,
            loading: true
        });

        const SearchFunc = async ( search : string ) => {
            let req = await fetchGraphQl(searchTrainers, { search })

            let data: {  searchTrainers : TrainersSummary[] } = req.data;

            if ( req.errors ) {
                setState({ ...state, error: true })
            }else {
                setState({
                   ...state,
                    loading: false,
                    data: data.searchTrainers
                });
            }
        }

        SearchFunc(state.searchTerm);

    }, [state.searchTerm]);

    return state;
}
