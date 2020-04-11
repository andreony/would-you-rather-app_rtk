import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"
import { receiveQuestions } from "./questions/questionsSlice"
import { createBrowserHistory } from 'history';


export const browserHistory = createBrowserHistory();

export const handleInitialData = () => {
    return async (dispatch) => {
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
    }
}