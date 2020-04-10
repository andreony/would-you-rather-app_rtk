import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"
import { receiveQuestions } from "./questions/questionsSlice"


export const handleInitialData = () => {
    return async (dispatch) => {
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
    }
}