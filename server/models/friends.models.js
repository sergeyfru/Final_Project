import { db } from "../config/db.js";

export const addFriend = async ({ user_id_1, user_id_2 }) => {
    const trx = await db.transaction();
    try {
        const user2 = await trx("users")
            .select("u_id", "u_email", "u_firstname", "u_lastname")
            .where({ u_id: user_id_2 })
            .first();
        console.log("user2", user2);
        if (user2.u_id === user_id_1) {
            return { itsme: true };
        }
        if (!user2) {
            console.log(user2);
            await trx.rollback();
            return { user2 };
        }

        const checkFriends = await trx("friends")
            .select("user_id_1", "user_id_2", "friendship_date", "agreement")
            .where({ user_id_1, user_id_2 })
            .first();
        console.log("checkFriends", checkFriends);

        if (checkFriends) {
            console.log(checkFriends);
            console.log("user models ADD FRIEND => You are friends");
            await trx.rollback();
            return { checkFriends, alredyFriend: true };
        }

        const [newFriend] = await trx("friends").insert(
            { user_id_1, user_id_2, agreement: false, sent: true },
            ["user_id_1", "user_id_2", "friendship_date", "agreement"]
        );
        const [newFriend2] = await trx("friends").insert(
            {
                user_id_1: user_id_2,
                user_id_2: user_id_1,
                agreement: false,
                sent: false,
            },
            ["user_id_1", "user_id_2", "friendship_date", "agreement"]
        );
        if (!newFriend) {
            return { user2, newFriend };
        }
        const myFriends = await trx("users")
            .select(
                "users.u_id",
                "users.u_email",
                "users.u_firstname",
                "users.u_lastname",
                "friends.agreement",
                "friends.sent"
            )
            .join("friends", "users.u_id", "=", "friends.user_id_2")
            .where("friends.user_id_1", user_id_1);

        console.log("myFriends", myFriends);

        // const myFriends = await trx('friends')
        //     .select('user_id_1', 'user_id_2', 'friendship_date', 'agreement')
        //     .where({ user_id_1 })

        await trx.commit();

        return { myFriends, user2, newFriend };
    } catch (error) {
        await trx.rollback();
        console.log("Error in User models addFriend =>", error);
        throw new Error("Fiendship Error => Error in User models addFriend");
    }
};

export const allMyFriends = async ({ u_id }) => {
    try {
        const myFriends = await db("users")
            .select(
                "users.u_id",
                "users.u_email",
                "users.u_firstname",
                "users.u_lastname",
                "friends.agreement",
                "friends.sent"
            )
            .join("friends", "users.u_id", "=", "friends.user_id_2")
            .where("friends.user_id_1", u_id);

        return myFriends;
    } catch (error) {
        console.log("Error in User models allMyFriends =>", error);
        throw new Error("Error => Error in User models allMyFriends");
    }
};

export const rejectFriend = async ({ user_id_1, user_id_2 }) => {
    const trx = await db.transaction();
    try {
        const deletedFriend = await trx("friends")
            .del()
            .where({ user_id_1, user_id_2 })
            .returning(
                "user_id_1",
                "user_id_2",
                "friendship_date",
                "agreement"
            );

        const deletedFriend2 = await trx("friends")
            .del()
            .where({ user_id_1: user_id_2, user_id_2: user_id_1 })
            .returning(
                "user_id_1",
                "user_id_2",
                "friendship_date",
                "agreement"
            );

        if (!deletedFriend) {
            await trx.rollback();
            return deletedFriend;
        }
        const myNewFriendsList = await trx("users")
            .select(
                "users.u_id",
                "users.u_email",
                "users.u_firstname",
                "users.u_lastname",
                "friends.agreement",
                "friends.sent"
            )
            .join("friends", "users.u_id", "=", "friends.user_id_2")
            .where("friends.user_id_1", user_id_1);

        await trx.commit();
        return myNewFriendsList;
    } catch (error) {
        await trx.rollback();
        console.log("Error in User models allMyFriends =>", error);
        throw new Error("Error => Error in User models allMyFriends");
    }
};

export const confirmFriendship = async ({ user_id_1, user_id_2 }) => {
    const trx = await db.transaction();
    try {
        const UpdatedFriend = await trx("friends")
            .update({ agreement: true }, [
                "user_id_1",
                "user_id_2",
                "friendship_date",
                "agreement",
            ])
            .where({ user_id_1, user_id_2 });
        const UpdatedFriend2 = await trx("friends")
            .update({ agreement: true }, [
                "user_id_1",
                "user_id_2",
                "friendship_date",
                "agreement",
            ])
            .where({ user_id_1: user_id_2, user_id_2: user_id_1 });

        if (!UpdatedFriend) {
            await trx.rollback();
            return UpdatedFriend;
        }
        const myNewFriendsList = await trx("users")
            .select(
                "users.u_id",
                "users.u_email",
                "users.u_firstname",
                "users.u_lastname",
                "friends.agreement",
                "friends.sent"
            )
            .join("friends", "users.u_id", "=", "friends.user_id_2")
            .where("friends.user_id_1", user_id_1);

        await trx.commit();
        return myNewFriendsList;
    } catch (error) {
        await trx.rollback();
        console.log("Error in User models allMyFriends =>", error);
        throw new Error("Error => Error in User models allMyFriends");
    }
};
