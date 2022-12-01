import React from "react";
import { Navigate } from "react-router-dom";

import { useSessionHandler, useGetDailyFoodAnalystics } from '../../hooks';

import { VictoryPie } from 'victory';
import ProgressBar from "../ProgressBar";
import FoodView from "../FoodView/FoodDetails";
import Loading from "../Loading";
import Error from '../Error';
import NavBar from "../NavBar";

import "./index.css";

const FoodAnalysis: React.FC = () => {
    const authentication = useSessionHandler();
    const { loading, error, analysis } = useGetDailyFoodAnalystics(authentication.token!);

    if ( authentication.loading ) return <Loading />

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

    if ( loading ) return <Loading />

    if (error) return <div>There was a problem reaching the server. Please try again later.</div>

    const total = (
        (analysis?.Fat || 0) +
        (analysis?.Carbs || 0) +
        (analysis?.Protein || 0)
    );

    return (
        <>
            <NavBar token={authentication.token!} />

            <div className="ChartContainer">
                <div className="ChartTitle">Macronutrient BreakDown</div>

                <div className="Chart">
                    <div>
                        {
                            analysis?.Calories === 0 ? (
                                <div className="ChartTitleNoFood">No food has been logged today.</div>
                            ) : (
                                <VictoryPie
                                    data={[
                                        { x: "Protein", y: analysis?.Protein },
                                        { x: "Carbs", y: analysis?.Carbs },
                                        { x: "Fat", y: analysis?.Fat },
                                    ]}
                                    colorScale={["rgba(131, 167, 234, 1)", "rgb(163, 221, 163)", "rgb(255, 112, 112)"]}
                                    height={50}
                                    width={150}
                                    animate={{
                                        duration: 2000
                                    }}
                                    radius={20}
                                    style={{
                                        labels: {
                                            fill: "#01200e",
                                            fontSize: 5,
                                            fontWeight: "bold"
                                        }
                                    }}
                                />

                            )
                        }
                    </div>

                    <div className="ChartLabel">
                        {
                            analysis?.Calories === 0 ? null : (
                                <>
                                    <div className="fatsTextColor">
                                        Fats: {((analysis?.Fat || 0) / total * 100).toFixed(2)}%
                                    </div>
                                    <div className="proteinTextColor">
                                        Protiens {((analysis?.Protein || 0) / total * 100).toFixed(2)}%
                                    </div>
                                    <div className="carbsTextColor">
                                        Carbs {((analysis?.Carbs || 0) / total * 100).toFixed(2)}%
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="ChartTitle Size15" >Estimated % of Calories</div>
            </div>

            <div className="ChartContainer ProgressBarContainer">
                <div className="ChartTitle">Daily Macronutrient Goals</div>

                <div className="ProgressBarsContainer">
                    <div className="ProgressBarContain">
                        <div className="ProgressBarsTitle">Fats</div>
                        <ProgressBar bgColor="rgb(255, 112, 112)" completed={
                            Number(
                                (
                                    (
                                        (analysis?.Fat || 0) / (analysis?.FatsGoal || 0)
                                    ) * 100
                                ).toFixed(2)
                            )
                        } />
                        <div className="ProgressBarsDes">{analysis?.Fat} / {analysis?.FatsGoal} g</div>
                    </div>

                    <div className="ProgressBarContain">
                        <div className="ProgressBarsTitle">Protien</div>
                        <ProgressBar bgColor="rgba(131, 167, 234, 1)" completed={
                            Number(
                                (
                                    (
                                        (analysis?.Protein || 0) / (analysis?.ProteinGoal || 0)
                                    ) * 100
                                ).toFixed(2)
                            )
                        } />
                        <div className="ProgressBarsDes">{analysis?.Protein} / {analysis?.ProteinGoal} g</div>
                    </div>

                    <div className="ProgressBarContain">
                        <div className="ProgressBarsTitle">Carbs</div>
                        <ProgressBar bgColor="rgb(163, 221, 163)" completed={
                            Number(
                                (
                                    (
                                        (analysis?.Carbs || 0) / (analysis?.CarbsGoal || 0)
                                    ) * 100
                                ).toFixed(2)
                            )
                        } />
                        <div className="ProgressBarsDes">{analysis?.Carbs} / {analysis?.CarbsGoal} g</div>
                    </div>
                </div>
            </div>

            <div className="ProgressBarContain">
                <div className="ProgressBarsTitle">Calories</div>
                <ProgressBar bgColor="red" completed={
                    Number(
                        (
                            (
                                (analysis?.Calories || 0) / (analysis?.CalorieGoal || 0)
                            ) * 100
                        ).toFixed(2)
                    )
                } />
                <div className="ProgressBarsDes">{analysis?.Calories} / {analysis?.CalorieGoal}</div>
            </div>


            <div className="FoodAteTodayView">
                <div className="FoodAteTodayTitle">Food Ate Today</div>
                <div>
                    {
                        analysis?.Foods.map((food, index) => (
                            (
                                <div key={`food-item-${food.id}-${index}`} style={{ marginBottom: 5 }}>
                                    <FoodView {...food} action={false} token={authentication.token!} />
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FoodAnalysis;