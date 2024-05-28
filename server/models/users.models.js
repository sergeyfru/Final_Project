import {db} from '../config/db.js'

export const register = async({u_email,u_firstname,u_lastname,p_password}) =>{
    const trx = await db.transaction();

    try {
        const [user] = await trx('users').insert(
                {u_email,u_lastname,u_firstname},
                ['u_id','u_email','u_lastname', 'u_firstname']
            );
        
        await trx('passwords').insert({u_id:user.u_id,p_password});

        await trx.commit();

        return user
        
    } catch (error) {
        await trx.rollback()
        console.log('Error in Users models Register =>',error);
        throw new Error('Register failed =>Error in Users models Register')
    }
}

export const all = async()=>{
    try {
        const users = await db('users').select('u_id','u_email','u_lastname', 'u_firstname').orderBy('u_id')
        
        return users
        
    } catch (error) {
        console.log('Error in Users models All=>',error);
        throw new Error('Register failed =>Error in Users models All')
    }
}