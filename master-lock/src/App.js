import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import MainRoutes from "./routes/routes";
import './App.css';
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes/>
      </Router>
    </AuthProvider>
  );
}

export default App;
