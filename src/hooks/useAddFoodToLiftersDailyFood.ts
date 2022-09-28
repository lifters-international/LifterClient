import React, { useState } from "react";

import { AddFoodToLiftersDailyFood } from "../graphQlQuieries";

import { fetchGraphQl, delay } from "../utils";

export type AddFoodToLiftersDailyFoodStates = {
    addFoodToLiftersDailyFood: ( foodId : string) => void;
    statement: string;  
}

export const useAddFoodToLiftersDailyFood = ( token: string): AddFoodToLiftersDailyFoodStates => {
    const [statement, setStatement] = useState("Add to Daily Food");

    const addFoodToLiftersDailyFood = async (foodId: string) => {
        if ( token == null ) return;

        setStatement("Adding...");

        const response = await fetchGraphQl(AddFoodToLiftersDailyFood, { token, foodId });

        if (response.errors) {
            setStatement("Problem Adding Food, please try again later.");
        }else {
            setStatement("Added Food");
        }

        await delay(2000);

        setStatement("Add to Daily Food");
    };

    return { addFoodToLiftersDailyFood, statement };
}
