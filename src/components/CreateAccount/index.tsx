import React from 'react';
import Lottie from 'react-lottie-player'
import Pear from "../../assests/PearLogo.json";
import Loading from "../Loading";
import Notice from "../Notice";
import Error from "../Error";
import { useSignUp } from '../../hooks';
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
const CreateAccount: React.FC = () => {
    const signUp = useSignUp(); 
    const email = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const username = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    return (
        <div className="account">
            {
                signUp.loading ? <Loading /> : null
            }

            {
                signUp.error.length > 0 ? <Error { ...signUp.error[0] } /> : null
            }

            {
                signUp.signUpSuccessful ? <Notice message="Sign Up Successful" onClose={() => {
                    navigate("/logIn");
                }}/>  : null
            }

            <Lottie
                animationData={Pear}
                loop
                speed={1}
                play
                className="lottie"
            />
            <div className="account-title">Create Account</div>
            <input type="text" placeholder="UserName: " className="account-input username" ref={username}/>
            <input type="text" placeholder="Email: " className="account-input email" ref={email}/>
            <input type="password" placeholder="Password: " className="account-input password" ref={password}/>
            <div className="buttonsContainer">
                <button className="account-buttons create-button" onClick={ () => {
                    signUp.signUp(username.current?.value || "", email.current?.value || "", password.current?.value || "");
                }} type="button">Create Account</button>
                <button className="account-buttons login-button" onClick={ () => {
                    navigate("/logIn");
                }} type="button">Already have an account? Login Now</button>
            </div>
        </div>
    );
}

export default CreateAccount;