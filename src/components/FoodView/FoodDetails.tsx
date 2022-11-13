import React from 'react';

import VerifiedFood from "./VerifiedFood";
import UnVerifiedFood from "./UnVerifiedFood";

import { Food } from "../../utils";

import { useAddFoodToLiftersDailyFood } from "../../hooks";

export type Props = {
    token: string;
    action?: boolean;
} & Food;

const FoodDetails: React.FC<Props> = ({ id, name, calories, servingSize, nutritionFacts, token, action, adminCreated }) => {
    const { addFoodToLiftersDailyFood, statement } = useAddFoodToLiftersDailyFood(token);

    return (
        <div className="FoodDetails">
            <div className="FoodDetails__Name">{name}</div>
            {
                adminCreated ? (
                    <VerifiedFood />
                ) : (
                    <UnVerifiedFood />
                )
            }
            <div className="FoodDetails__ImportantInfor">
                <div className="FoodDetails__Divides">
                    <div className="FoodDetails__TextImportant">Serving Size: </div>
                    <div className="FoodDetails__TextImportantMU">{servingSize.measurment}{servingSize.unit}</div>
                </div>

                <div className="FoodDetails__Divides">
                    <div className="FoodDetails__TextImportant">Calories: </div>
                    <div className="FoodDetails__TextImportantMU">{calories}</div>
                </div>
            </div>

            <div>
                <div className="FoodDetails__TextImportantFacts">Nutrition Facts</div>
                <div className="FoodDetails__NutritionFacts">
                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Carbohydrates: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.totalCarbohydrate.measurment}{nutritionFacts.totalCarbohydrate.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Protein: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.protein.measurment}{nutritionFacts.protein.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Total Fat: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.totalFat.measurment}{nutritionFacts.totalFat.unit}</div>
                    </div>
                    
                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Saturated Fat: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.saturatedFat.measurment}{nutritionFacts.saturatedFat.unit}</div>
                    </div>
                    
                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Cholesterol: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.cholesterol.measurment}{nutritionFacts.cholesterol.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Sodium: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.sodium.measurment}{nutritionFacts.sodium.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Dietary Fiber: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.dietaryFiber.measurment}{nutritionFacts.dietaryFiber.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Total Sugars: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.totalSugars.measurment}{nutritionFacts.totalSugars.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Added Sugars: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.addedSugars.measurment}{nutritionFacts.addedSugars.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Vitamin D: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.vitaminD.measurment}{nutritionFacts.vitaminD.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Calcium: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.calcium.measurment}{nutritionFacts.calcium.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Iron: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.iron.measurment}{nutritionFacts.iron.unit}</div>
                    </div>

                    <div className="FoodDetails__Divide">
                        <div className="FoodDetails__TextImportant">Potassium: </div>
                        <div className="FoodDetails__TextImportantMU">{nutritionFacts.potassium.measurment}{nutritionFacts.potassium.unit}</div>
                    </div>
                </div>
            </div>

            {
                action ? (
                    <button
                        type="button"
                        className="FoodDetails_Button"
                        onClick={() => addFoodToLiftersDailyFood(id)}
                    >
                        {statement}
                    </button>
                ) : null
            }
        </div>
    )
}

FoodDetails.defaultProps = {
    action: true
}

export default FoodDetails;