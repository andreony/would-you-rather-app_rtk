import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"


export const handleInitialData = () => {
    return (dispatch) => {
        return getInitialData()
            .then( ({ users, questions })  => {
                dispatch(receiveUsers(users))
            })
    }
}