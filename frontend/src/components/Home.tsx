import React from "react"
import HomeNav from "../features/friends/HomeNav"
import CollectionWithFriends from "../features/friends/CollectionWithFriends.tsx"
// import { Route, Routes } from "react-router-dom"
// import Auth from "../auth/Auth"
// import Friends from "../features/friends/Friends"

const Home = () => {



    return (
        <>
            <HomeNav />
            {/* <Routes>

                <Route path='/home/searchfriend' element={<Auth><Friends /></Auth>} />
                <Route path='/home/myfriends' element={<Auth><h2>My Friends</h2></Auth>} />
                <Route path='/home/settings' element={<Auth><h2>Settings</h2></Auth>} />
            </Routes> */}
            <CollectionWithFriends />

        </>
    )
}

export default React.memo(Home)
// export default Home