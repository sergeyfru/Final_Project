import { addFriend } from "../models/friends.models.js";



export const _addFriend = async (req, res) => {
    try {

        const { user_id_1, u2_email } = req.body

        const { user2, alredyFriend,itsme, newFriend, checkFriends } = await addFriend({ user_id_1, u2_email })
        console.log('USERS CONTROLLERS', user2, alredyFriend, newFriend, checkFriends);
if(itsme){
    return res.status(404).json({msg:"You can't add yourself as a friend."})
}

        if (alredyFriend) {
            return res.status(404).json({ msg: 'You are already friends.', checkFriends })
        }

        if (!user2) {
            return res.status(404).json({ msg: 'User does not exist.' })
        }

        return res.json({newFriend})

    } catch (error) {
        console.log('Users controllers _addFriend =>', error);
        res.status(404).json({ msg: 'Something went wrong' })
    }
}