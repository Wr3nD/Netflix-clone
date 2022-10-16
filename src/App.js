import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/UserSlice";
import ProfileScreen from "./screens/ProfileScreen";
function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                console.log("TADY", userAuth);
                dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
            } else {
                dispatch(logout());
            }
        });
        return unsubscribe;
    }, [dispatch]);
    return (
        <div className="app">
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <Routes>
                        <Route
                            exact
                            path="/profile"
                            element={<ProfileScreen />}
                        />
                        <Route exact path="/" element={<HomeScreen />} />
                    </Routes>
                )}
            </Router>
        </div>
    );
}

export default App;
