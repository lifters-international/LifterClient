import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar";

import { useSessionHandler, useGetFood, useSearchFood } from '../../hooks';

import Loading from "../Loading";
import Error from '../Error';
import NavBar from "../NavBar";
import FoodDetails from "./FoodDetails";
import { AiOutlineBarChart, AiOutlinePlus } from "react-icons/ai";

import "./index.css";

const FoodView: React.FC = () => {
    const authentication = useSessionHandler();
    const { foods, loading, error } = useGetFood();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { foods: searchFood, loading: searchLoading, error: searchError } = useSearchFood(search, authentication.token!);

    if (authentication.loading || loading || searchLoading) return <Loading />

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            ||
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (error || searchError) return <div>There was a problem reaching the server. Please try again later.</div>

    return (
        <>
            <NavBar token={authentication.token!} />
            <div className="FoodContainer">
                <div className="FoodHeader">
                    <SearchBar
                        onChange={(event) => setSearch(event.target.value)}
                        className="FoodSearchView"
                        iconClass="FoodSearchView__Icon"
                        searchInputClass="FoodSearchView__Input"
                        placeholder="Search Lifters Foods"
                        showIcon={false}
                    />

                    <div className="FoodViewIconDiv">
                        <AiOutlinePlus
                            className="FoodSearchView_Add_Icon NavBarLottie"
                            size={50}
                            onClick={() => navigate('/createFood')}
                        />
                        <AiOutlineBarChart
                            className="FoodSearchView_Analysis NavBarLottie"
                            size={50}
                            onClick={() => navigate('/foodAnalysis')}
                        />
                    </div>

                </div>

                <div className="FoodItemView">
                    {
                        search.length > 0 ? (
                            searchFood.map((food) => (
                                <div key={`foot-item-${food.id}`}>
                                    <FoodDetails {...food} token={authentication.token!} />
                                </div>
                            ))
                        ) : (
                            foods.map((food) => (
                                <div key={`foot-item-${food.id}`}>
                                    <FoodDetails {...food} token={authentication.token!} />
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default FoodView;