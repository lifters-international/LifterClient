import React from 'react';
import Lottie from 'react-lottie-player'
import LiftersNavBar from "../../assests/LifterNavBar.json";
import Loading from "../Loading";
import Notice from "../Notice";
import Error from "../Error";
import { useSignUp } from '../../hooks';
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

import { CgProfile } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

const CreateAccount: React.FC = () => {
    const signUp = useSignUp();
    const email = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const username = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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
                    signUp.loading ? <Loading /> : null
                }

                {
                    signUp.error.length > 0 ? <Error {...signUp.error[0]} /> : null
                }

                {
                    signUp.signUpSuccessful ? <Notice message="Sign Up Successful" onClose={() => {
                        navigate("/logIn");
                    }} /> : null
                }
                <div className="account-title">Create Account</div>
                
                <div className="icon-input">
                    <CgProfile className="account-icon" color="white" />
                    <input type="text" placeholder="UserName: " className="account-input username" ref={username} />
                </div>

                <div className="icon-input">
                    <HiOutlineMail className="account-icon" color="white" />
                    <input type="text" placeholder="Email: " className="account-input email" ref={email} />
                </div>

                <div className="icon-input">
                    <RiLockPasswordFill className="account-icon" color="white" />
                    <input type="password" placeholder="Password: " className="account-input password" ref={password} />
                </div>

                <div className="buttonsContainer">
                    <button type="button" className="main-button" onClick={() => {
                        signUp.signUp(username.current?.value || "", email.current?.value || "", password.current?.value || "");
                    }}>
                        <div>
                            CREATE ACCOUNT
                        </div>
                        <div>
                            &#8599;
                        </div>
                    </button>

                    <button className="side-button" onClick={() => {
                        navigate("/logIn");
                    }} type="button">
                        <div>
                            Already have an Account?
                        </div>

                        <div className="color-red">
                            Log in
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;