import React from 'react';
import Lottie from 'react-lottie-player'
import LiftersNavBar from "../../assests/LifterNavBar.json";
import { useNavigate } from "react-router-dom";
import { useLogIn } from "../../hooks";
import "../CreateAccount/CreateAccount.css";
import Loading from '../Loading';
import Error from '../Error';

import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";

const LogIn: React.FC = () => {
    const password = React.useRef<HTMLInputElement>(null);
    const username = React.useRef<HTMLInputElement>(null);
    const logInState = useLogIn();
    const navigate = useNavigate();

    if (logInState.loggedInSuccess) navigate("/");

    return (
        <div className="account-div">
            <div className="hero-section">
                <img src="/logo.png" alt="logo" className="logo" />
                <h1>LIFTERS</h1>
                <h2>HOME FOR ALL THINGS GYM</h2>
            </div>

            <div className="athlete-red-door-container">
                <img
                    src="/landing-page-hero-section-man-image.png"
                    alt="athlete"
                    className="athlete-image"
                />

                <img
                    src="/hero-section-line-vector.png"
                    alt="line"
                    className='line-vector-image'
                />

                <div className="red-door"></div>

                <div className="shadow"></div>
            </div>

            <div className="account">

                {
                    logInState.loading ? <Loading /> : null
                }

                {
                    logInState.error.length > 0 ? <Error {...logInState.error[0]} /> : null
                }

                <div className="account-title">Login To Account</div>

                <div className="icon-input">
                    <CgProfile className="account-icon" color="white" />
                    <input type="text" placeholder="UserName/email: " className="account-input username" ref={username} />
                </div>

                <div className="icon-input">
                    <RiLockPasswordFill className="account-icon" color="white" />
                    <input type="password" placeholder="Password: " className="account-input password" ref={password} />
                </div>

                <div className="buttonsContainer">
                    <button type="button" className="main-button" onClick={() => {
                        logInState.logIn(username.current!.value, password.current!.value);
                    }}>
                        <div>
                            LOG IN
                        </div>
                        <div>
                            &#8599;
                        </div>
                    </button>

                    <button className="side-button" onClick={() => {
                        navigate("/createAccount");
                    }} type="button">
                        <div>
                            Don't have an Account?
                        </div>

                        <div className="color-red">
                            Sign up
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogIn;