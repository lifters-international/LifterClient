import * as React from 'react';
import { Navigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import PeerMatchContainer from "../PeerMatch";
import Error from '../Error';
import DailyMatchLimit from '../DailyMatchLimit';
import { useSessionHandler, useGetUserMatches } from '../../hooks';

const Home: React.FC = () => {
    const authentication = useSessionHandler();
    const [ dailyLimitReached, setDailyLimitReached ] = React.useState(false);
    const [userMatches, setUserMatches] = useGetUserMatches(authentication.token!);
    const [currentMatch, setCurrentMatch] = React.useState(0);

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (
            authentication.error[0].message === "jwt expired"
            ||
            authentication.error[0].message === "User does not exist."
        ) return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true}/>;
    }

    if (userMatches.error.length > 0) {
        if (userMatches.error[0].message === "User does not exist.") return <Navigate to="/createAccount" replace={true} />
        else if (
            userMatches.error[0].message === "You have reached your daily limit on matches." && dailyLimitReached === false
        ) setDailyLimitReached(true);
    }

    if (userMatches.loading) return <Loading />;

    return (
        <>  
            <NavBar token={authentication.token!}/>
            <div>
                {
                    !dailyLimitReached ? (
                        <PeerMatchContainer { ...userMatches.users[currentMatch] } allowAction={true} next={
                            () => {
                                if (currentMatch + 1 < userMatches.users!.length) {
                                    setCurrentMatch(currentMatch + 1);
                                }else {
                                    setUserMatches({ ...userMatches, refreshTimes: userMatches.refreshTimes + 1 });
                                    setCurrentMatch(0);
                                }
                            }
                        } userToken={authentication.token!} errFunc={
                            ( error ) => {
                                if (error[0].message === "You have reached your daily limit on matches." && dailyLimitReached === false ) setDailyLimitReached(true);
                            }
                        }/>
                    ) : <DailyMatchLimit />
                }
            </div>
        </>
    );
}

export default Home;