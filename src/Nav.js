import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "./Netflix-Logo.wine.svg";
import avatar from "./Netflix-avatar.png";
import { useNavigate } from "react-router-dom";
const Nav = () => {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => {
            window.removeEventListener("scroll", transitionNavBar);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img
                    className="nav__logo"
                    src={logo}
                    alt=""
                    onClick={() => navigate("/")}
                />
                <img
                    className="nav__avatar"
                    src={avatar}
                    alt=""
                    onClick={() => navigate("/profile")}
                />
            </div>
        </div>
    );
};

export default Nav;
