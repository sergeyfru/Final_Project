import { db } from "../config/db.js";


export const addFriend = async ({ user_id_1, u2_email }) => {
    const trx = await db.transaction()
    try {
        const user2 = await trx('users').select('u_id', 'u_email', 'u_firstname', 'u_lastname').where({ u_email: u2_email }).first()
        console.log("user2",user2);
        if(user2.u_id === user_id_1){
            return{itsme:true}
        }
        if (!user2) {
            console.log(user2);
            await trx.rollback()
            return {user2}
        }

        const checkFriends = await trx('friends')
        .select('user_id_1', 'user_id_2', 'friendship_date', 'agreement')
        .where({ user_id_1, user_id_2: user2.u_id }).first()
        console.log("checkFriends",checkFriends);
        if (checkFriends) {
            console.log(checkFriends);
            console.log('user models ADD FRIEND => You are friends');
            await trx.rollback()
            return { checkFriends, alredyFriend: true }
        }

        const [newFriend] = await trx('friends').insert({ user_id_1, user_id_2: user2.u_id, agreement: false }, ['user_id_1', 'user_id_2', 'friendship_date', 'agreement'])
 
        await trx.commit()
 
        return {newFriend,user2,}

    } catch (error) {
        await trx.rollback()
        console.log('Error in User models addFriend =>', error);
        throw new Error('Fiendship Error => Error in User models addFriend')
    }
}
