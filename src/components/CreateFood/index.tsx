import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./index.css"

import { LabelInputDiv } from "../LabelInputDiv";
import { RegisterButton } from "../RegisterButton";
import Error from '../Error';

import { NutritionUnits, NutritionFactsJson, NutritionFacts, fetchGraphQl } from "../../utils";
import { useSessionHandler } from '../../hooks';
import { UserCreateFood } from "../../graphQlQuieries"
import Loading from "../Loading";
import NavBar from "../NavBar";

export const CreateFood: React.FC = () => {
    const units = Object.values(NutritionUnits).filter(unit => isNaN(Number(unit)));
    const authentication = useSessionHandler();
    const [name, setName] = useState("");

    const [foodServing, setFoodServing] = useState<NutritionFactsJson>({
        measurment: 0,
        unit: units[0] as NutritionUnits,
    });

    const [loading, setLoading] = useState(false);

    const [calories, setCalories] = useState(0);

    const [nutriftionFacts, setNutriftionFacts] = useState<NutritionFacts>({
        totalFat: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        saturatedFat: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        transFat: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        cholesterol: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        sodium: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        totalCarbohydrate: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        dietaryFiber: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        totalSugars: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        addedSugars: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        protein: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        vitaminD: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        calcium: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        iron: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        },

        potassium: {
            measurment: 0,
            unit: units[0] as NutritionUnits,
        }
    });

    const handleSubmit = async () => {
        if (
            name.length <= 0 ||
            foodServing.measurment <= 0
        ) return alert("Please fill in all fields");

        setLoading(true);
        const response = await fetchGraphQl(UserCreateFood, {
            foodInput: {
                name,
                servingSize: foodServing,
                calories,
                nutritionFacts: nutriftionFacts
            },
            token: authentication.token!
        });
        setLoading(false);

        if (response.errors) return alert(response.errors[0].message);

        else {
            alert("Food created successfully");
            navigate("/food")
        }
    }

    const navigate = useNavigate();

    if (authentication.loading || loading) return <Loading />

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            || 
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    return (
        <>
            <NavBar token={authentication.token!} />
            <div className="FormContainer">
                <h1>Create Food</h1>

                <LabelInputDiv>
                    <label htmlFor="name">Name of Food</label>
                    <input placeholder="Food's Name" type="text" name="name"
                        value={name} onChange={(input) => setName(input.target.value)}
                    />
                </LabelInputDiv>

                <div className="selection-label-input-div">
                    <LabelInputDiv>
                        <label htmlFor="servingSize">Food Serving Size</label>
                        <input placeholder="0" type="number" name="servingSize"
                            value={foodServing.measurment} onChange={(input) => setFoodServing({
                                ...foodServing,
                                measurment: Number(input.target.value)
                            })}
                        />
                    </LabelInputDiv>
                    <select
                        title="Serving Size Units"
                        className="selection-label-input-div__select"
                        value={foodServing.unit}
                        onChange={(input) => setFoodServing({
                            ...foodServing,
                            unit: input.target.value as NutritionUnits
                        })}
                    >
                        {
                            units.map((unit, index) => (
                                <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                            ))
                        }
                    </select>
                </div>

                <LabelInputDiv>
                    <label htmlFor="calories">Calories</label>
                    <input placeholder="0" type="number" name="calories"
                        value={calories} onChange={(input) => setCalories(Number(input.target.value))}
                    />
                </LabelInputDiv>

                <h1>Nutrition Facts</h1>

                <div className="scrollView">
                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="totalFat">Total Fat</label>
                            <input placeholder="0" type="number" name="totalFat"
                                value={nutriftionFacts.totalFat.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    totalFat: {
                                        ...nutriftionFacts.totalFat,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.totalFat.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                totalFat: {
                                    ...nutriftionFacts.totalFat,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="saturatedFat">Saturated Fat</label>
                            <input placeholder="0" type="number" name="saturatedFat"
                                value={nutriftionFacts.saturatedFat.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    saturatedFat: {
                                        ...nutriftionFacts.saturatedFat,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.saturatedFat.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                saturatedFat: {
                                    ...nutriftionFacts.saturatedFat,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="transFat">Trans Fat</label>
                            <input placeholder="0" type="number" name="transFat"
                                value={nutriftionFacts.transFat.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    transFat: {
                                        ...nutriftionFacts.transFat,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.transFat.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                transFat: {
                                    ...nutriftionFacts.transFat,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="cholesterol">Cholesterol</label>
                            <input placeholder="0" type="number" name="cholesterol"
                                value={nutriftionFacts.cholesterol.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    cholesterol: {
                                        ...nutriftionFacts.cholesterol,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.cholesterol.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                cholesterol: {
                                    ...nutriftionFacts.cholesterol,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="sodium">Sodium</label>
                            <input placeholder="0" type="number" name="sodium"
                                value={nutriftionFacts.sodium.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    sodium: {
                                        ...nutriftionFacts.sodium,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.sodium.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                sodium: {
                                    ...nutriftionFacts.sodium,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="totalCarbohydrate">Total Carbohydrate</label>
                            <input placeholder="0" type="number" name="totalCarbohydrate"
                                value={nutriftionFacts.totalCarbohydrate.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    totalCarbohydrate: {
                                        ...nutriftionFacts.totalCarbohydrate,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.totalCarbohydrate.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                totalCarbohydrate: {
                                    ...nutriftionFacts.totalCarbohydrate,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="dietaryFiber">Dietary Fiber</label>
                            <input placeholder="0" type="number" name="dietaryFiber"
                                value={nutriftionFacts.dietaryFiber.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    dietaryFiber: {
                                        ...nutriftionFacts.dietaryFiber,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.dietaryFiber.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                dietaryFiber: {
                                    ...nutriftionFacts.dietaryFiber,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="addedSugars">Added Sugars</label>
                            <input placeholder="0" type="number" name="addedSugars"
                                value={nutriftionFacts.addedSugars.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    addedSugars: {
                                        ...nutriftionFacts.addedSugars,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.addedSugars.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                addedSugars: {
                                    ...nutriftionFacts.addedSugars,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="totalSugars">Total Sugars</label>
                            <input placeholder="0" type="number" name="totalSugars"
                                value={nutriftionFacts.totalSugars.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    totalSugars: {
                                        ...nutriftionFacts.totalSugars,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.totalSugars.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                totalSugars: {
                                    ...nutriftionFacts.totalSugars,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="vitaminD">VitaminD</label>
                            <input placeholder="0" type="number" name="vitaminD"
                                value={nutriftionFacts.vitaminD.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    vitaminD: {
                                        ...nutriftionFacts.vitaminD,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.vitaminD.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                vitaminD: {
                                    ...nutriftionFacts.vitaminD,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="iron">Iron</label>
                            <input placeholder="0" type="number" name="iron"
                                value={nutriftionFacts.iron.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    iron: {
                                        ...nutriftionFacts.iron,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.iron.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                iron: {
                                    ...nutriftionFacts.iron,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="calcium">Calcium</label>
                            <input placeholder="0" type="number" name="calcium"
                                value={nutriftionFacts.calcium.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    calcium: {
                                        ...nutriftionFacts.calcium,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.calcium.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                calcium: {
                                    ...nutriftionFacts.calcium,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="potassium">Potassium</label>
                            <input placeholder="0" type="number" name="potassium"
                                value={nutriftionFacts.potassium.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    potassium: {
                                        ...nutriftionFacts.potassium,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.potassium.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                potassium: {
                                    ...nutriftionFacts.potassium,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="selection-label-input-div nutrition-facts">
                        <LabelInputDiv>
                            <label htmlFor="protein">Protein</label>
                            <input placeholder="0" type="number" name="protein"
                                value={nutriftionFacts.protein.measurment} onChange={(input) => setNutriftionFacts({
                                    ...nutriftionFacts,
                                    protein: {
                                        ...nutriftionFacts.protein,
                                        measurment: Number(input.target.value)
                                    }
                                })}
                            />
                        </LabelInputDiv>
                        <select
                            title="Serving Size Units"
                            className="selection-label-input-div__select"
                            value={nutriftionFacts.protein.unit}
                            onChange={(input) => setNutriftionFacts({
                                ...nutriftionFacts,
                                protein: {
                                    ...nutriftionFacts.protein,
                                    unit: input.target.value as NutritionUnits
                                }
                            })}
                        >
                            {
                                units.map((unit, index) => (
                                    <option key={`serving-size-units-${index}`} value={unit}>{unit}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <RegisterButton title="Create Food" onClick={handleSubmit} />
            </div>
        </>
    )
}
export default CreateFood;