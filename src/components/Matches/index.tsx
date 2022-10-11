import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import PeerMatchContainer from "../PeerMatch";
import DailyMatchLimit from '../DailyMatchLimit';
import Error from '../Error';
import { useSessionHandler, useGetUserMatchDetails } from '../../hooks';

const Matches: React.FC = () => {
    let { id } = useParams();
    const authentication = useSessionHandler();
    const matchedDetails = useGetUserMatchDetails(authentication.token!, id!);
    const [ dailyLimitReached, setDailyLimitReached ] = React.useState(false);
    const navigation = useNavigate();

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

    if (matchedDetails.error.length > 0) return <Navigate to="/404" replace={true} /> // No matter the error we want to return 404;
    
    if (matchedDetails.loading) return <Loading />;

    return (
        <>
            <NavBar token={authentication.token!}/>
            <div>
                <PeerMatchContainer {...matchedDetails.user!} allowAction next={() => { navigation("/messages") }} userToken={authentication.token!}
                    errFunc={
                        ( error ) => {
                            if (error[0].message === "You have reached your daily limit on matches." && dailyLimitReached === false ) setDailyLimitReached(true);
                        }
                    }
                />
            </div>
        </>
    );
}

export default Matches;