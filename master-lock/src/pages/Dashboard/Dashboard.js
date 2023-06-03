import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { ProtectedLayout } from "../../components/ProtectedLayout";

export default function Dashboard(){

    return(
        <ProtectedLayout>
                <div className="dashboard-container">
                    <Navbar/>    
                    <Outlet/>
                </div>
        </ProtectedLayout>
    );
}