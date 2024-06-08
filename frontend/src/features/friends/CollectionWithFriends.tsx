
import {  useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { EnumRegisterStatus, User } from "../../types/type";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import SelectFormCollectionWithFriends from "./SelectFormCollectionWithFriends";
import { useJoinCollection } from "../games/game_hook";
import { useAllMyFrinds } from "./frieds_hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";



const CollectionWithFriends = () => {
    const myFriends: User[] = useAppSelector(state => state.friendsReducer.myFriends.filter(user => user.agreement === true))
    const collectionWithFriends = useAppSelector(state => state.gamesReducer.collectionWithFriends)
    const status = useAppSelector(state => state.gamesReducer.status)
    const u_id = localStorage.getItem('u_id')
    const [user_id_1, setUser_id_1] = useState<string>('')
    const [user_id_2, setUser_id_2] = useState<string>('')
    const [user_id_3, setUser_id_3] = useState<string>('')
    const [user_id_4, setUser_id_4] = useState<string>('')
    const [user_id_5, setUser_id_5] = useState<string>('')
    const joinCollection = useJoinCollection()
    const allMyFrinds = useAllMyFrinds()

    useEffect(() => {
        console.log('u_id', u_id);

        allMyFrinds({ u_id })
    }, [])


    const handleChange1 = (e: SelectChangeEvent) => {
        if (user_id_2.length > 0 && e.target.value === '') {
            alert('You have to select someone here')
        } else if (e.target.value === user_id_2 || e.target.value === user_id_3 || e.target.value === user_id_4 || e.target.value === user_id_5) {

            alert('You already chose this friend')
        } else {
            setUser_id_1(e.target.value)
        }

    }

    const handleChange5 = (e: SelectChangeEvent) => {
        if (e.target.value === user_id_1 || e.target.value === user_id_2 || e.target.value === user_id_3 || e.target.value === user_id_4) {

            alert('You already chose this friend')
        } else {
            setUser_id_5(e.target.value)
        }

    }


    const createCollection = async () => {
        await joinCollection({ u_id, user_id_1, user_id_2, user_id_3, user_id_4, user_id_5 })
        setUser_id_1('')
        setUser_id_2('')
        setUser_id_3('')
        setUser_id_4('')
        setUser_id_5('')
    }

    return (
        <>
            <FormControl required sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="demo-simple-select-required-label">First Friend</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={`${user_id_1}`}
                    label="First friend "
                    autoWidth
                    onChange={handleChange1}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        myFriends.map(user => {
                            return (
                                <MenuItem value={`${user.u_id}`}>{user.u_firstname} {user.u_lastname}</MenuItem>
                            )
                        })
                    }


                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>




            <SelectFormCollectionWithFriends check_1={user_id_1} check_2={user_id_3}
                check_3={user_id_4} check_4={user_id_5}
                setState={setUser_id_2} next={user_id_3}
                previous={user_id_1} present={user_id_2} />

            <SelectFormCollectionWithFriends check_1={user_id_1} check_2={user_id_2}
                check_3={user_id_4} check_4={user_id_5}
                setState={setUser_id_3} next={user_id_4}
                previous={user_id_2} present={user_id_3} />

            <SelectFormCollectionWithFriends check_1={user_id_1} check_2={user_id_2}
                check_3={user_id_3} check_4={user_id_5}
                setState={setUser_id_4} next={user_id_5}
                previous={user_id_3} present={user_id_4} />


            <FormControl disabled={user_id_4.length <= 0} sx={{ m: 1, minWidth: 145 }}>
                <InputLabel id="demo-simple-select-required-label">Select Friend</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={`${user_id_5}`}
                    label="Second friend "
                    autoWidth
                    onChange={handleChange5}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        myFriends.map(user => {
                            return (
                                <MenuItem value={`${user.u_id}`}>{user.u_firstname} {user.u_lastname}</MenuItem>
                            )
                        })
                    }


                </Select>
            </FormControl>

            <Button onClick={createCollection}>Create collection</Button>

            {
                status === EnumRegisterStatus.Loading ? <div><h2>Loading:</h2><FontAwesomeIcon icon={faSpinner} spinPulse style={{ fontSize: "64px" }} /></div> :

           <>
            {
                collectionWithFriends.length > 0 ? <><h2>Your join Collection: {collectionWithFriends.length}</h2></> : <></>
            }
            <Stack flexDirection={'row'} sx={{ m: 4 }} flexWrap={'wrap'}>


                {
                    collectionWithFriends.map(item => {
                        return (
                            <div key={item.gameid} style={{ display: "flex", border: '1px solid black', margin: '4px', width: 'calc(50% - 26px)', textAlign: 'center', padding:"0 8px" }}>
                                <div style={{ marginRight: 'auto' }}>
                                    <h2>{item.name}</h2>
                                    <img src={item.thumbnail} alt="" />

                                    {/* <p style={{maxWidth:'300px'}}>{item.description}</p> */}
                                </div>
                                <div style={{ marginLeft: 'auto', textAlign: 'start' }}>
                                    <h4><span style={{ marginRight: '65px' }}>Rating: </span> <span style={{ marginLeft: '70px', marginRight: '20px' }}>{item.averagerating}</span></h4>
                                    <h4><span style={{ marginRight: '30px' }}>Number of players: </span> <span style={{ marginLeft: '30px', marginRight: '20px' }}>{item.minplayers} - {item.maxplayers}</span></h4>
                                    <h4><span style={{ marginRight: '50px' }}>Time for play: </span><span style={{ marginLeft: '30px', marginRight: '20px' }}>{item.minplaytime} - {item.maxplaytime}</span></h4>
                                    <h4><span style={{ marginRight: '30px' }}> Category:</span> <span style={{ marginLeft: '30px', marginRight: '20px' }}>{item.boardgamecategory}</span> </h4>
                                </div>
                            </div>
                        )
                    })
                }
            </Stack>
            </>
             }
        </>

    )
}


export default CollectionWithFriends