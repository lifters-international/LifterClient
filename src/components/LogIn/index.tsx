import React from 'react';
import Lottie from 'react-lottie-player'
import LiftersNavBar from "../../assests/LifterNavBar.json";
import { useNavigate } from "react-router-dom";
import { useLogIn } from "../../hooks";
import "../CreateAccount/CreateAccount.css";
import Loading from '../Loading';
import Error from '../Error';

const LogIn: React.FC = () => {
    const password = React.useRef<HTMLInputElement>(null);
    const username = React.useRef<HTMLInputElement>(null);
    const logInState = useLogIn();
    const navigate = useNavigate(); 

    if ( logInState.loggedInSuccess ) navigate("/");

    return (
        <div className="account">

            {
                logInState.loading ? <Loading /> : null
            }

            {
                logInState.error.length > 0 ? <Error {...logInState.error[0] } /> : null
            }

            <Lottie
                animationData={LiftersNavBar}
                loop
                speed={0.2}
                play
                className="lottie"
            />

            <div className="account-title">Login To Account</div>
            <input type="text" placeholder="UserName/email: " className="account-input username" ref={username}/>
            <input type="password" placeholder="Password: " className="account-input password" ref={password}/>

            <div className="buttonsContainer">
                <button className="account-buttons login-button" onClick={ () => {
                    logInState.logIn(username.current!.value, password.current!.value);
                }} type="button" style={{background: "green"}}>Login</button>

                <button className="account-buttons create-button" onClick={ () => {
                    navigate("/createAccount");
                }} type="button" style={{background: "#00bcd4"}} >Don't have an Account? Create One Now</button>
            </div>
        </div>
    );
}

export default LogIn;