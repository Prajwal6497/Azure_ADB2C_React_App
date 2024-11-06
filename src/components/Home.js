// import React from 'react';
// import { useMsal } from "@azure/msal-react";
// import { b2cPolicies } from '../config/msalConfig';
// import './Home.css'; // Import CSS for styling

// function Home() {
//     const { instance } = useMsal();
//     const accounts = instance.getAllAccounts();
//     console.log("Accounts",accounts);

//     const handleSignUp = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.signUp.authority
//         });
//     };

//     const handleSignIn = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.signIn.authority
//         });
//     };

//     const handleProfileEdit = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.editProfile.authority
//         });
//     };

//     const handlePasswordReset = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.resetPassword.authority
//         });
//     };

//     const handleLogout = () => {
//         instance.logoutRedirect();
//     };

//     return (
//         <div className="home-container">
//             <h1 className="home-title">Welcome to the StanceBeam App</h1>
//             {accounts.length > 0 ? (
//                 <div className="user-actions">
//                     <p className="user-greeting">Hello, {accounts[0].username}</p>
//                     <button className="btn" onClick={handleProfileEdit}>Edit Profile</button>
//                     <button className="btn" onClick={handleLogout}>Logout</button>
//                 </div>
//             ) : (
//                 <div className="auth-buttons">
//                     <button className="btn" onClick={handleSignIn}>Sign In</button>
//                     <button className="btn btn-signup" onClick={handleSignUp}>Sign Up</button>
//                     <button className="btn btn-reset" onClick={handlePasswordReset}>Reset Password</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Home;















// import React, { useState, useEffect } from 'react';
// import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// import { b2cPolicies } from '../config/msalConfig';
// import './Home.css'; // Import CSS for styling

// function Home() {
//     const { instance } = useMsal();
//     const isAuthenticated = useIsAuthenticated(); // Check if authenticated
//     const [activeAccount, setActiveAccount] = useState(null); // Track active account
//     console.log(isAuthenticated, activeAccount)

//     useEffect(() => {
//         // Get the initial account if already logged in
//         const accounts = instance.getAllAccounts();
//         if (accounts.length > 0) {
//             setActiveAccount(accounts[0]);
//         }

//         // Listen for account changes on sign-in
//         const accountChangedListener = (newAccount) => {
//             if (newAccount) {
//                 setActiveAccount(newAccount);
//             } else {
//                 setActiveAccount(null); // No account means user is signed out
//             }
//         };

//         // Register event handler for account changes
//         const unsubscribe = instance.addEventCallback((event) => {
//             if (event.eventType === "msal:loginSuccess") {
//                 accountChangedListener(instance.getAllAccounts()[0]);
//             } else if (event.eventType === "msal:logoutSuccess") {
//                 accountChangedListener(null);
//             }
//         });

//         return () => unsubscribe && unsubscribe();
//     }, [instance]);

//     const handleSignUp = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.signUp.authority
//         });
//     };

//     const handleSignIn = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.signIn.authority
//         });
//     };

//     const handleProfileEdit = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.editProfile.authority
//         });
//     };

//     const handlePasswordReset = () => {
//         instance.loginRedirect({
//             authority: b2cPolicies.resetPassword.authority
//         });
//     };

//     const handleLogout = () => {
//         instance.logoutRedirect();
//     };

//     return (
//         <div className="home-container">
//             <h1 className="home-title">Welcome to the StanceBeam App</h1>
//             {isAuthenticated && activeAccount ? (
//                 <div className="user-actions">
//                     <p className="user-greeting">Hello, {activeAccount.username}</p>
//                     <button className="btn" onClick={handleProfileEdit}>Edit Profile</button>
//                     <button className="btn" onClick={handleLogout}>Logout</button>
//                 </div>
//             ) : (
//                 <div className="auth-buttons">
//                     <button className="btn" onClick={handleSignIn}>Sign In</button>
//                     <button className="btn btn-signup" onClick={handleSignUp}>Sign Up</button>
//                     <button className="btn btn-reset" onClick={handlePasswordReset}>Reset Password</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { b2cPolicies } from '../config/msalConfig';
import './Home.css'; // Import CSS for styling

function Home() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated(); // Check if authenticated
    const [activeAccount, setActiveAccount] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state to handle async updates

    useEffect(() => {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            setActiveAccount(accounts[0]);
        }

        // Listen for successful login events
        const unsubscribe = instance.addEventCallback((event) => {
            if (event.eventType === "msal:loginSuccess") {
                setActiveAccount(instance.getAllAccounts()[0]);
            } else if (event.eventType === "msal:logoutSuccess") {
                setActiveAccount(null);
            }
        });

        // Delay the initial loading state by 500ms to ensure MSAL is updated
        const loadingTimeout = setTimeout(() => setLoading(false), 500);

        // Cleanup the event listener and timeout on unmount
        return () => {
            unsubscribe && unsubscribe();
            clearTimeout(loadingTimeout);
        };
    }, [instance]);

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

    if (loading) {

    }

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the StanceBeam App</h1>
            {isAuthenticated && activeAccount ? (
                <div className="user-actions">
                    <p className="user-greeting">Hello, {activeAccount.username}</p>
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
