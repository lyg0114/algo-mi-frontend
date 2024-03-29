import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min'
import Login from "./components/Login";
import QuestionsLayout from "./components/user/question/QuestionsLayout";
import QuestionSaveLayout from "./components/user/question/QuestionSave/QuestionSaveLayout";
import {AuthProvider} from "./components/context/AuthContext";
import PrivateRoute from "./components/util/PrivateRoute";
import Logout from "./components/Logout";
import QuestionViewLayout from "./components/user/question/QuestionView/QuestionViewLayout";
import SignUp from "./components/SignUp";
import LandingPage from "./components/landingpage/LandingPage";
import CheckEmailPage from "./components/landingpage/CheckEmailPage";

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<LandingPage/>}/>
                        <Route path='/main' element={
                            <PrivateRoute>
                                <QuestionsLayout/>
                            </PrivateRoute>
                        }/>
                        <Route path="/save-question/:id?" element={<QuestionSaveLayout/>}/>
                        <Route path="/view-question/:id?" element={<QuestionViewLayout/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/logout' element={<Logout/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/check-email' element={<CheckEmailPage/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App
