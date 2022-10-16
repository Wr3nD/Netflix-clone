import React, { useState } from "react";
import "./Login.css";
import SignUpScreen from "./SignUpScreen";
import logo from "../Netflix-Logo.wine.svg";
const Login = () => {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src={logo} alt="" />
                <button
                    className="loginScreen__button"
                    onClick={() => setSignIn(true)}
                >
                    Sign in
                </button>

                <div className="loginScreen__gradient"></div>

                <div className="loginScreen__body">
                    {signIn ? (
                        <SignUpScreen />
                    ) : (
                        <>
                            <h1>Unlimited Films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at any time</h2>
                            <h3>
                                Reado to watch ? Enter your email to create or
                                restart your membership
                            </h3>
                            <div className="loginScreen__input">
                                <form>
                                    <input
                                        type="email"
                                        placeholder="Email Adress"
                                    />
                                    <button
                                        className="loginScreen__getStarted"
                                        onClick={() => setSignIn(true)}
                                    >
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
