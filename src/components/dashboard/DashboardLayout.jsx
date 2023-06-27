import React from "react"
import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"

export default function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader />
            <main>
                <Outlet />
            </main>
            <DashboardFooter />
        </div>
    )
}