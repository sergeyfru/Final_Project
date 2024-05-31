import { db } from '../config/db.js'


export const addToMyList = async ({ u_id, gameid }) => {

    const trx = await db.transaction()
    try {
        await trx('user_game').insert({ u_id, gameid }, ['ug_id', 'u_id', 'gameid'])

        const mygames = await db('user_game')
            .select('user_game.gameid', 'games.name')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id })




        await trx.commit()
        return mygames

    } catch (error) {
        await trx.rollback()
        console.log('Error in Game models AddToMyList =>', error);
        throw new Error('AddToMyList failed =>Error in Game models AddToMyList')
    }
}

export const myGames = async ({ u_id }) => {
    console.log('g.models => allMyGames');
    try {

        const mygames = await db('user_game')
            .select('user_game.gameid', 'games.name', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id })

        return mygames

    } catch (error) {
        console.log('Error in Game models MyGames =>', error);
        throw new Error('MyGames failed =>Error in Game models MyGames')
    }
}

export const allGames = async () => {
    try {
        const allGames = await db('games').select(
            'gameid', 'name', 'image', 'thumbnail', 'minplayers',
            'maxplayers', 'minplaytime', 'maxplaytime', 'playingtime', 
            'yearpublished', 'wanttoplay', 'description', 'boardgamecategory'
        )
        return allGames
    } catch (error) {
        console.log('Error in Game models AllGames =>', error);
        throw new Error('AllMyGames failed =>Error in Game models AllGames')
    }
}

export const fetchGames = async (game) => {
    const {
        gameId, name, image, thumbnail, minPlayers, maxPlayers, minplaytime,
        maxplaytime, playingTime, yearPublished, wantToPlay, description, boardgamecategory
    } = game
    // console.log(gameId, name, image, thumbnail, minPlayers, maxPlayers, minplaytime,
    //     maxplaytime, playingTime, yearPublished, wantToPlay, description, boardgamecategory);
    // return 'we are reached endpoint'
    try {
        const [gameInMyDB] = await db('games').insert({
            gameid: gameId, name, image, thumbnail, minplayers: minPlayers, maxplayers: maxPlayers,
            // minplaytime, maxplaytime,
            playingtime: playingTime, yearpublished: yearPublished, wanttoplay: wantToPlay,
            //  description, boardgamecategory
        }, [
            'gameid', 'name', 'image', 'thumbnail', 'minplayers', 'maxplayers', 'minplaytime',
            'maxplaytime',
            'playingtime', 'yearpublished', 'wanttoplay', 'description', 'boardgamecategory'
        ])
        // console.log(gameInMyDB);
        return gameInMyDB

    } catch (error) {
        console.log('Error in Game models fetchGame =>', error);
        throw new Error('fetchGame failed =>Error in Game models fetchGame')
    }
}