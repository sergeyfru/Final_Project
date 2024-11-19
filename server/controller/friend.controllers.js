import {
    addFriend,
    allMyFriends,
    confirmFriendship,
    rejectFriend,
} from "../models/friends.models.js";

export const _addFriend = async (req, res) => {
    try {
        const { user_id_1, user_id_2 } = req.body;

        const {
            user2,
            alredyFriend,
            itsme,
            newFriend,
            checkFriends,
            myFriends,
        } = await addFriend({ user_id_1, user_id_2 });
        console.log(
            "USERS CONTROLLERS",
            user2,
            alredyFriend,
            newFriend,
            checkFriends,
            myFriends
        );

        if (itsme) {
            return res
                .status(201)
                .json({ msg: "You can't add yourself as a friend." });
        }

        if (alredyFriend) {
            return res
                .status(201)
                .json({ msg: "You already have this request." });
        }

        if (!user2) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        if (!newFriend) {
            return res.status(404).json({ msg: "Friendship is not created" });
        }
        if (!myFriends) {
            return res.status(404).json({ msg: "You dont have friends" });
        }

        return res.json(myFriends);
    } catch (error) {
        console.log("Users controllers _addFriend =>", error);
        res.status(404).json({ msg: "Something went wrong" });
    }
};

export const _allMyFriends = async (req, res) => {
    const { u_id } = req.body;
    try {
        const myFriends = await allMyFriends({ u_id });
        if (!myFriends) {
            return res.status(404).json({ msg: "You dont have friends" });
        }

        return res.json(myFriends);
    } catch (error) {
        console.log("Users controllers _allMyFriends =>", error);
        res.status(404).json({ msg: "Something went wrong" });
    }
};

export const _rejectFriend = async (req, res) => {
    const { user_id_1, user_id_2 } = req.body;

    try {
        const myNewFriendsList = await rejectFriend({ user_id_1, user_id_2 });

        if (!myNewFriendsList) {
            res.status(404).json({ msg: "User did not find" });
        }

        res.json({ msg: "User was deleted from your list", myNewFriendsList });
    } catch (error) {
        console.log("Users controllers _allMyFriends =>", error);
        res.status(404).json({ msg: "Something went wrong" });
    }
};
export const _confirmFriendship = async (req, res) => {
    const { user_id_1, user_id_2 } = req.body;

    try {
        const myNewFriendsList = await confirmFriendship({
            user_id_1,
            user_id_2,
        });

        if (!myNewFriendsList) {
            res.status(404).json({ msg: "User did not find" });
        }

        res.json({ msg: "User was added to your friends", myNewFriendsList });
    } catch (error) {
        console.log("Users controllers _allMyFriends =>", error);
        res.status(404).json({ msg: "Something went wrong" });
    }
};
