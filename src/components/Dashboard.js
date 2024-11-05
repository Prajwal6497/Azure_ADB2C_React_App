import React from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { b2cPolicies } from '../config/msalConfig'; 

function Dashboard() {
    const { instance } = useMsal();
    const accounts = instance.getAllAccounts();
    const navigate = useNavigate();

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
                    <p className="user-greeting">Hello, {accounts[0].username}</p>
                    <button className="btn" onClick={handleProfileEdit}>Edit Profile</button>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button className="btn" onClick={() => navigate('/')}>Sign In</button>
                    <button className="btn btn-signup" onClick={() => navigate('/')}>Sign Up</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
