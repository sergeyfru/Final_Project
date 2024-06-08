import { db } from '../config/db.js'


export const addToMyList = async ({ u_id, gameid }) => {

    const trx = await db.transaction()
    try {
        const checkGame = await trx('user_game').select('ug_id', 'u_id', 'gameid').where({ u_id, gameid })
        if (checkGame.length > 0) {
            return null
        }
        await trx('user_game').insert({ u_id, gameid }, ['ug_id', 'u_id', 'gameid'])

        const mygames = await trx('user_game')
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
    try {

        const mygames = await db('user_game')
            .select('user_game.gameid', 'games.name', 'games.averagerating', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
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
            'gameid', 'name', 'image', 'thumbnail', 'minplayers', 'averagerating',
            'maxplayers', 'minplaytime', 'maxplaytime', 'playingtime',
            'yearpublished', 'wanttoplay', 'description', 'boardgamecategory'
        ).orderBy('name')
        return allGames
    } catch (error) {
        console.log('Error in Game models AllGames =>', error);
        throw new Error('AllMyGames failed =>Error in Game models AllGames')
    }
}

export const updateFetchGames = async (game) => {
    const {
        gameid, name, image, thumbnail, minplayers, maxplayers, minplaytime,
        maxplaytime, playingtime, yearpublished, wanttoplay, averagerating, description, boardgamecategory
    } = game

    try {
        const [gameInMyDB] = await db('games').update({
            gameid, name, image, thumbnail, minplayers, maxplayers, minplaytime,
            maxplaytime, playingtime, yearpublished, wanttoplay, averagerating, description, boardgamecategory
        }, [
            'gameid', 'name', 'image', 'thumbnail', 'minplayers', 'maxplayers', 'minplaytime',
            'maxplaytime', 'averagerating',
            'playingtime', 'yearpublished', 'wanttoplay', 'description', 'boardgamecategory'
        ])
            .where({ gameid })
        // console.log(gameInMyDB);
        return gameInMyDB

    } catch (error) {
        console.log('Error in Game models fetchGame =>', error);
        throw new Error('fetchGame failed =>Error in Game models fetchGame')
    }
}

export const fetchGames = async (game) => {
    const {
        gameId, name, image, thumbnail, minPlayers, maxPlayers, minplaytime,
        maxplaytime, playingTime, yearPublished, wantToPlay, averageRating, description, boardgamecategory
    } = game
    console.log(gameId, name, image, thumbnail, minPlayers, maxPlayers, minplaytime,
        maxplaytime, playingTime, yearPublished, wantToPlay, description, boardgamecategory);
    // return {msg:'we are reached endpoint',game:{
    //     gameid: gameId, name, image, thumbnail, minplayers: minPlayers, maxplayers: maxPlayers,
    //     minplaytime, maxplaytime,
    //     playingtime: playingTime, yearpublished: yearPublished, wanttoplay: wantToPlay,
    //     averagerating: averageRating,
    //      description, boardgamecategory
    // }}
    try {
        const [gameInMyDB] = await db('games').insert({
            gameid: gameId, name, image, thumbnail, minplayers: minPlayers, maxplayers: maxPlayers,
            minplaytime, maxplaytime,
            playingtime: playingTime, yearpublished: yearPublished, wanttoplay: wantToPlay,
            averagerating: averageRating,
            description, boardgamecategory
        }, [
            'gameid', 'name', 'image', 'thumbnail', 'minplayers', 'maxplayers', 'minplaytime',
            'maxplaytime', 'averagerating',
            'playingtime', 'yearpublished', 'wanttoplay', 'description', 'boardgamecategory'
        ])
        // console.log(gameInMyDB);
        return gameInMyDB

    } catch (error) {
        console.log('Error in Game models fetchGame =>', error);
        throw new Error('fetchGame failed =>Error in Game models fetchGame')
    }
}

export const delMyGame = async ({ u_id, gameid }) => {
    const trx = await db.transaction()
    try {

        const letDel = await trx('user_game').del().where('gameid', '=', `${gameid}`, '&&', 'u_id', '=', `${u_id}`).returning('gameid', 'name')
        const notDelList = await trx('user_game')
            .select('user_game.gameid', 'games.name', 'games.averagerating',
                'games.thumbnail', 'games.minplayers', 'games.maxplayers',
                'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id })

        trx.commit()
        return notDelList
    } catch (error) {

        await trx.rollback()
        console.log('Error in Game models delMyGame =>', error);
        throw new Error('delMyGame failed =>Error in Game models delMyGame')

    }
}

export const myFriendsCollection = async ({ u_id, user_id_1, user_id_2, user_id_3, user_id_4, user_id_5 }) => {
    const trx = await db.transaction()
    try {


        const myCollection = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id })
        console.log('collection with 1 user', myCollection);
        const combinedCollection = [...myCollection]


        const collection1 = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id: user_id_1 })

        collection1.forEach(item => {
            if (!combinedCollection.some(game => game.gameid === item.gameid)) {
                combinedCollection.push(item)
            }
        });
        if (!user_id_2) {
            console.log('You dont have user_id_2 ');
            await trx.commit()
            return combinedCollection
        }

        const collection2 = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id: user_id_2 })

        collection2.forEach(item => {
            if (!combinedCollection.some(game => game.gameid === item.gameid)) {
                combinedCollection.push(item)
            }
        });

        console.log('collection with 2 users', combinedCollection);

        if (!user_id_3) {
            console.log('You dont have user_id_3 ');
            await trx.commit()
            return combinedCollection
        }


        const collection3 = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id: user_id_3 })

        collection3.forEach(item => {
            if (!combinedCollection.some(game => game.gameid === item.gameid)) {
                combinedCollection.push(item)
            }
        });
        console.log('collection with 3 users', combinedCollection);


        if (!user_id_4) {
            console.log('You dont have user_id_4 ');
            await trx.commit()
            return combinedCollection
        }

        const collection4 = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id: user_id_4 })

        collection4.forEach(item => {
            if (!combinedCollection.some(game => game.gameid === item.gameid)) {
                combinedCollection.push(item)
            }
        });
        console.log('collection with 4 users', combinedCollection);

        if (!user_id_5) {
            console.log('You dont have user_id_5 ');
            await trx.commit()
            return combinedCollection
        }



        const collection5 = await trx('user_game')
            .select('user_game.u_id', 'user_game.gameid', 'games.name', 'games.averagerating','games.minplaytime', 'games.thumbnail', 'games.minplayers', 'games.maxplayers', 'games.maxplaytime', 'games.description', 'games.boardgamecategory')
            .join('games', 'games.gameid', '=', 'user_game.gameid')
            .where({ u_id: user_id_5 })

        collection5.forEach(item => {
            if (!combinedCollection.some(game => game.gameid === item.gameid)) {
                combinedCollection.push(item)
            }
        });

        console.log('collection with 5 users', combinedCollection);

        await trx.commit()
        return combinedCollection

    } catch (error) {

        await trx.rollback()
        console.log('Error in Game models myFriendsCollection =>', error);
        throw new Error('myFriendsCollection failed =>Error in Game models myFriendsCollection')

    }


}