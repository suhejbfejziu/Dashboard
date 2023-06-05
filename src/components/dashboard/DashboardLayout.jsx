import React from "react"
import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"

export default function DashboardLayout({darkMode}) {
    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader />
            <main className={darkMode ? "bg-[#2c2c2c] text-white" : ""}>
                <Outlet />
            </main>
            <DashboardFooter />
        </div>
    )
}