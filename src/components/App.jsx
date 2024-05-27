import React, { useState } from "react";
import {BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Search from "./Search";
import Login from "./Login";
import Register from "./Register";
import Create from "./Create";
import SideBar from "./SideBar";
import LoadingBar from 'react-top-loading-bar'
import PrivateRoutes from './PrivateRoutes'
import AuthProvider from "./AuthProvider";


function App(){
  const [progress, setProgress] = useState(0);
    return (
            <Router>
            <LoadingBar color='#35323a'progress={progress} onLoaderFinished={() => setProgress(0)}/>
            <AuthProvider>
            <SideBar />
                <Routes >
                <Route path="/login" element={<Login setProgress={setProgress}></Login>} />
                    <Route path="/register" element={<Register setProgress={setProgress}></Register>} />
                    <Route element ={<PrivateRoutes/>}>
                    <Route exact path="/" element={<Home setProgress={setProgress} ></Home>} />
                    <Route exact path="/profile" element={<Profile setProgress={setProgress}></Profile>} />
                    <Route exact path="/create" element={<Create setProgress={setProgress}></Create>} />
                    <Route path="/search" element={<Search setProgress={setProgress}></Search>} />
                    </Route>               
                </Routes>
                </AuthProvider>
            </Router>
         
      
    )
}
export default App;