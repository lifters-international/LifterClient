import * as React from 'react';
import Loading from "../Loading";
import NavBar from "../NavBar";
import PeerMatchContainer from "../PeerMatch";
import { Navigate } from "react-router-dom";
import { useSessionHandler, useGetUserMatches } from '../../hooks';
import Error from '../Error';

const Home: React.FC = () => {
    const authentication = useSessionHandler();
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
    }

    if (userMatches.loading) return <Loading />;

    return (
        <>  
            <NavBar token={authentication.token!}/>
            <div>
                <PeerMatchContainer {...userMatches.users![currentMatch]} allowAction={true} next={
                    () => {
                        if (currentMatch + 1 < userMatches.users!.length) {
                            setCurrentMatch(currentMatch + 1);
                        }else {
                            setUserMatches({ ...userMatches, refreshTimes: userMatches.refreshTimes + 1 });
                            setCurrentMatch(0);
                        }
                    }
                } userToken={authentication.token!} />
            </div>
        </>
    );
}

export default Home;