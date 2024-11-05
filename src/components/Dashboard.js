import React from 'react';
import { useMsal } from "@azure/msal-react";
import { b2cPolicies } from '../config/msalConfig'; 

function Dashboard() {
    const { instance } = useMsal();
    const accounts = instance.getAllAccounts();

    const handleProfileEdit = () => {
        instance.loginRedirect({
            authority: b2cPolicies.editProfile.authority
        });
    };

    const handleLogout = () => {
        instance.logoutRedirect();
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Dashboard</h1>
            {accounts.length > 0 ? (
                <div className="user-actions">
                    <p className="user-greeting">Hellorfrfr, {accounts[0].username}</p>
                    <button className="btn" onClick={handleProfileEdit}>Edit Profile</button>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                // Optionally, redirect to home or show a message if no account is found
                <p className="error-message">User not signed in. Redirecting...</p>
            )}
        </div>
    );
}

export default Dashboard;
