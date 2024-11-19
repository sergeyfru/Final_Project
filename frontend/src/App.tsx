// import {useState} from 'react'
import "./App.css";
import Header from "./components/Header.tsx";
import Game from "./features/games/Game.tsx";
import { Route, Routes } from "react-router-dom";
import Registration from "./features/users/Registration.tsx";
import Login from "./features/users/Login.tsx";
import Home from "./components/Home.tsx";
import MyCollection from "./features/games/MyCollection.tsx";
import Auth from "./auth/Auth.tsx";
import MyFriends from "./features/friends/MyFriends.tsx";
import Friends from "./features/friends/Friends.tsx";
import { nanoid } from "@reduxjs/toolkit";
import HomeNav from "./features/friends/FriendsNav.tsx";
import FriendsInvitations from "./features/friends/FriendsInvitations.tsx";
import CollectionWithFriends from "./features/friends/CollectionWithFriends.tsx";
import MySettings from "./features/users/MySettings.tsx";

function App() {
    return (
        <>
            <Header />
            <Routes>
                {/* <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login page={'Login'}/>} />
        <Route path='/register' element={<Registration page={'Registration'}/>} />
      <Route path='/mygames' element={<MyCollection />} /> */}

                <Route path="/allgames" element={<Game key={5456} />} />

                {/* <Route path='/allgames' element={<Game />} /> */}

                <Route path="/" element={<Home key={nanoid()} />} />
                <Route path="/home" element={<HomeNav key={nanoid()} />} />

                <Route
                    path="/home/myfriends"
                    element={<MyFriends key={nanoid()} />}
                />
                <Route
                    path="/home/myfriends/pending"
                    element={<MyFriends key={nanoid()} />}
                />
                <Route
                    path="/home/myfriends/myinvitation"
                    element={<FriendsInvitations key={nanoid()} />}
                />
                <Route path="/home/searchfriend" element={<Friends />} />
                <Route path="/home/settings" element={<MySettings />} />
                <Route
                    path="/home/joincollection"
                    element={<CollectionWithFriends />}
                />
                <Route path="/mygames" element={<MyCollection />} />

                <Route path="/login" element={<Login page={"Login"} />} />
                <Route
                    path="/register"
                    element={<Registration page={"Registration"} />}
                />

        {/* <Route path='/allgames' element={<Auth key={1234}><Game  key={5456}/></Auth>} />

        <Route path='/' element={<Auth key={123} ><Home  key={nanoid()}/></Auth>} />
        <Route path='/home' element={<Auth><HomeNav key={nanoid()}/></Auth>} />

        <Route path='/home/myfriends' element={<Auth><MyFriends key={nanoid()}/> </Auth>} />
        <Route path='/home/myfriends/pending' element={<Auth><MyFriends key={nanoid()} /> </Auth>} />
        <Route path='/home/myfriends/myinvitation' element={<Auth><FriendsInvitations key={nanoid()} /> </Auth>} />
        <Route path='/home/searchfriend' element={<Auth><Friends /></Auth>} />
        <Route path='/home/settings' element={<Auth><MySettings /></Auth>} />
        <Route path='/home/joincollection' element={<Auth><CollectionWithFriends/></Auth>} />

        <Route path='/login' element={<Login page={'Login'} />} />
        <Route path='/register' element={<Registration page={'Registration'} />} />
        <Route path='/mygames' element={<Auth><MyCollection /></Auth>} /> */}
            </Routes>
        </>
    );
}

export default App;
