import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './screens/admin/Login'
import UserLogin from './screens/customer/UserLogin'
import Dashboard from './screens/admin/Dashboard'
import Authentication from './screens/admin/Authentication'

export default function App() {
    return (
        <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/authentication" element={<Authentication />} />
            <Route path="/user/login" element={<UserLogin />} />
        </Routes>
    )
}
