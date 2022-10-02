import React from 'react';

import { fetchGraphQl, LiftersDailyFoodAnalstics, getCurrentDate } from '../utils';

import { getLiftersDailyFoodAnalytics } from "../graphQlQuieries";

export type DailyFoodAnalsticsState = {
    loading: boolean;
    error: boolean; 
    analysis: LiftersDailyFoodAnalstics | null;
}

export const useGetDailyFoodAnalystics = ( token : string ): DailyFoodAnalsticsState => {
    const [ state, setState ] = React.useState<DailyFoodAnalsticsState>({
        loading: true,
        error: false,
        analysis: null
    });

    React.useEffect(() => {
        const getDailyFoodAnalystics = async () => {
            if ( token == null ) return;
            
            const res = await fetchGraphQl(getLiftersDailyFoodAnalytics, { token, date: getCurrentDate() });
            if (res.errors) {
                setState({
                    ...state,
                    loading: false,
                    error: true
                });
            } else {
                setState({
                    ...state,
                    loading: false,
                    error: false,
                    analysis: res.data.getLiftersDailyFoodAnalytics
                });
            }
        };
        getDailyFoodAnalystics();
    }, [ token ]);

    return state;
}