import React from 'react';
import { useMsal } from "@azure/msal-react";
import { b2cPolicies } from '../config/msalConfig';
import './Home.css'; // Import CSS for styling

function Home() {
    const { instance } = useMsal();
    const accounts = instance.getAllAccounts();
    console.log("Accounts",accounts);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         const authResponse = await instance.handleRedirectPromise();
    //         if (authResponse) {
    //             console.log("Authentication successful", authResponse);
    //         }
    //     };
    //     checkAuth();
    // }, [instance]);

    const handleSignUp = () => {
        instance.loginRedirect({
            authority: b2cPolicies.signUp.authority
        });
    };

    const handleSignIn = () => {
        instance.loginRedirect({
            authority: b2cPolicies.signIn.authority
        });
    };

    const handleProfileEdit = () => {
        instance.loginRedirect({
            authority: b2cPolicies.editProfile.authority
        });
    };

    const handlePasswordReset = () => {
        instance.loginRedirect({
            authority: b2cPolicies.resetPassword.authority
        });
    };

    const handleLogout = () => {
        instance.logoutRedirect();
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the StanceBeam App</h1>
            {accounts.length > 0 ? (
                <div className="user-actions">
                    <p className="user-greeting">Hello, {accounts[0].username}</p>
                    <button className="btn" onClick={handleProfileEdit}>Edit Profile</button>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button className="btn" onClick={handleSignIn}>Sign In</button>
                    <button className="btn btn-signup" onClick={handleSignUp}>Sign Up</button>
                    <button className="btn btn-reset" onClick={handlePasswordReset}>Reset Password</button>
                </div>
            )}
        </div>
    );
}

export default Home;









