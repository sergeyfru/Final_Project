import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect,  } from "react"
import { BoardGame, EnumRegisterStatus } from '../../types/type.ts'
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/store.ts"
import { addGameSlice, filteringGames } from "./games_slice.ts"
import { useGetAllGames } from "./game_hook.ts"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Category from '../selectors/Category.tsx'
import Time from '../selectors/Time.tsx'
import PlayersNumber from '../selectors/PlayersNumber.tsx'
import SearchGame from '../selectors/SearchGame.tsx'


const Game = () => {
    const dispatch = useAppDispatch()
    const GetAllGames = useGetAllGames()
    const allgames = useAppSelector(state => state.gamesReducer.allGames)
    const gemeStore = useAppSelector(state => state.gamesReducer)

    const inputSearch = useAppSelector(state => state.selectorReducer.inputSearch)
    const inputCategory = useAppSelector(state => state.selectorReducer.inputcategory)
    const inputMinTime = useAppSelector(state => state.selectorReducer.inputminTime)
    const inputMaxTime = useAppSelector(state => state.selectorReducer.inputmaxTime)
    const inputMaxPlayerNumber = useAppSelector(state => state.selectorReducer.inputmaxPlayerNumber)
    const inputMinPlayerNumber = useAppSelector(state => state.selectorReducer.inputminPlayerNumber)


    const filter: BoardGame[] = useAppSelector(state => state.gamesReducer.filter)
    useEffect(() => {
        if (allgames.length === 0) {
            getGame()

        }
        filteringGame

        // const games = useAppSelector(state => state.gamesReducer.allGames)

    }, [inputCategory, inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber])


    const filteringGame = () => {
        dispatch(filteringGames({ inputCategory, inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber }))
    }
    const getGame = async () => {
        try {
            GetAllGames()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Axios error', error.message);
                console.log('Axios error', error);
            } else {
                console.error('Unexpected error', error);
            }

        }
    }



    const addGame = async (game: BoardGame) => {
        try {
            const u_id = localStorage.getItem("u_id")
            const gameid = game.gameid
            dispatch(addGameSlice({ u_id, gameid }))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
                console.log('Axios error', error);
                return error
            } else {
                console.error('Unexpected error', error);
            }

        }

    }



    return (
        <div style={{}}>
            <h3>All games {filter.length}</h3>
            {
                gemeStore.status === EnumRegisterStatus.Loading ? <FontAwesomeIcon icon={faSpinner} spinPulse style={{ fontSize: "64px" }} /> :
                    <>
                        <>
                            <SearchGame />
                            <Category />
                            <Time />
                            <PlayersNumber />
                            {/* <Searching /> */}
                        </>
                        <div style={{display:'flex', flexWrap:'wrap'}}>
                            {
                                filter.map((item,) => {
                                    // return <h2 key={i}>{item.u_id}</h2>
                                    return (
                                        <div key={item.gameid} style={{ display: "flex", border: '1px solid black', margin: '4px', width: 'calc(50% - 10px)', textAlign: 'center' }}>
                                            <div style={{ marginRight: 'auto' }}>
                                                <h2>{item.name}</h2>
                                                <img src={item.thumbnail} alt="" />
                                                {/* <p style={{maxWidth:'300px'}}>{item.description}</p> */}
                                            </div>
                                            <div style={{ marginLeft: 'auto', textAlign:'start' }}>
                                                <h4><span style={{ marginRight:'65px'}}>Rating: </span> <span style={{marginLeft:'70px', marginRight:'20px'}}>{item.averagerating}</span></h4>
                                                <h4><span style={{ marginRight:'30px'}}>Number of players: </span> <span style={{marginLeft:'30px', marginRight:'20px'}}>{item.minplayers} - {item.maxplayers}</span></h4>
                                                <h4><span style={{ marginRight:'50px'}}>Time for play: </span><span style={{marginLeft:'30px', marginRight:'20px'}}>{item.minplaytime} - {item.maxplaytime}</span></h4>
                                                <h4><span style={{ marginRight:'30px'}}> Category:</span> <span style={{marginLeft:'30px', marginRight:'20px'}}>{item.boardgamecategory}</span> </h4>
                                                <button onClick={() => addGame(item)}>Add to my collection</button>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
            }
        </div>
    )
}
export default React.memo(Game)