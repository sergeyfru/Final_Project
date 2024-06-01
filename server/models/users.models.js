import { db } from '../config/db.js'

export const register = async ({ u_email, u_firstname, u_lastname, p_password }) => {
    const trx = await db.transaction();

    try {
        const [user] = await trx('users').insert(
            { u_email, u_lastname, u_firstname },
            ['u_id', 'u_email', 'u_lastname', 'u_firstname']
        );

        await trx('passwords').insert({ u_id: user.u_id, p_password });

        await trx.commit();

        return user

    } catch (error) {
        await trx.rollback()
        console.log('Error in Users models Register =>', error);
        throw new Error('Register failed =>Error in Users models Register')
    }
}

export const all = async () => {
    try {
        const users = await db('users').select('u_id', 'u_email', 'u_lastname', 'u_firstname').orderBy('u_id')

        return users

    } catch (error) {
        console.log('Error in Users models All=>', error);
        throw new Error('Register failed =>Error in Users models All')
    }
}

export const login = async (u_email) => {
    const trx = await db.transaction()
    try {
        // const user = await trx('users')
        //     .select('users.u_id','users.u_email', 'users.u_firstname', 'users.u_lastname', 'passwords.p_password')
        //     .join('passwords', 'users.u_id', '=', 'passwords.u_id')
        //     .where( 'users.u_email',u_email)
        //     .first()
        // console.log(user);
        const user = await trx('users')
            .select('u_id', 'u_email', 'u_firstname', 'u_lastname')
            .where({ u_email })
            .first()
        if (!user) {
            console.log('user models => user not found');
            await trx.rollback()
            return { user: null, hashpassword: null }
        }

        const hashpassword = await trx('passwords')
            .select('u_id', 'p_password')
            .where({ u_id: user.u_id })
            .first()

        await trx.commit()

        return { user, hashpassword }
    } catch (error) {
        await trx.rollback()
        console.log('Error in User models Login =>', error);
        throw new Error('Login failed => Error in User models Login')

    }
}



