import React, { useState } from 'react';

import { Food } from "../../utils";

export type Props = {

} & Food;

const FoodDetails: React.FC<Props> = ({ id, name, calories, servingSize, nutritionFacts }) => {
    return (
        <div className="FoodDetails">
            <div className="FoodDetails__Name">{name}</div>
            <div className="FoodDetails__ImportantInfor">
                <div className="FoodDetails__TextImportant">Serving Size: {servingSize.measurment}{servingSize.unit}</div>
                <div className="FoodDetails__TextImportant">Calories: {calories}</div>
            </div>

            <div>
                <div className="FoodDetails__TextImportantFacts">Nutrition Facts</div>
                <div className="FoodDetails__NutritionFacts">
                    <div className="FoodDetails__NutritionFacts__Item">Carbohydrates: {nutritionFacts.totalCarbohydrate.measurment}{nutritionFacts.totalCarbohydrate.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Protein: {nutritionFacts.protein.measurment}{nutritionFacts.protein.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Total Fat: {nutritionFacts.totalFat.measurment}{nutritionFacts.totalFat.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Saturated Fat: {nutritionFacts.saturatedFat.measurment}{nutritionFacts.saturatedFat.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Cholesterol: {nutritionFacts.cholesterol.measurment}{nutritionFacts.cholesterol.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Sodium: {nutritionFacts.sodium.measurment}{nutritionFacts.sodium.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Dietary Fiber: {nutritionFacts.dietaryFiber.measurment}{nutritionFacts.dietaryFiber.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Total Sugars: {nutritionFacts.totalSugars.measurment}{nutritionFacts.totalSugars.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Added Sugars: {nutritionFacts.addedSugars.measurment}{nutritionFacts.addedSugars.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Vitamin D: {nutritionFacts.vitaminD.measurment}{nutritionFacts.vitaminD.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Calcium: {nutritionFacts.calcium.measurment}{nutritionFacts.calcium.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Iron: {nutritionFacts.iron.measurment}{nutritionFacts.iron.unit}</div>
                    <div className="FoodDetails__NutritionFacts__Item">Potassium: {nutritionFacts.potassium.measurment}{nutritionFacts.potassium.unit}</div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails;