import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // Import the Dashboard component

function App({ instance }) {
    return (
        <MsalProvider instance={instance}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
                
            </Routes>
        </MsalProvider>
    );
}

export default App;
