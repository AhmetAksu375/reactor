import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import {deleteToken} from '../../utils/auth'

export default function home() {

  return (
    <div>home

<nav className="mb-6">
          <Link to="/login" className="mr-4 text-blue-500">Login</Link>
          <Link to="/register" className="text-blue-500">Register</Link>
          <Link to="/addCompa" className="text-blue-500">Register</Link>
          <Link to="/login" className="text-blue-500" onClick={deleteToken}>logout</Link>
        </nav>
    </div>
  )
}
