import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import SearchResult from "./SearchResult";
import { useSessionHandler } from '../../hooks';
import Error from '../Error';

import "./Search.css";

const Search: React.FC = () => {
    let { query } = useParams();
    const authentication = useSessionHandler();

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true}/>;
    }

    return (
        <>
            <NavBar token={authentication.token!}/>
            <div className="SearchResult">
                <SearchResult query={query!} token={authentication.token!}/>
            </div>
        </>
    );
};

export default Search;