import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"
import { receiveQuestions } from "./questions/questionsSlice"
import { createBrowserHistory } from 'history';
import { setVisibilityFilter } from "./filters/filtersSlice";


export const browserHistory = createBrowserHistory();

export const handleInitialData = () => {
    return async (dispatch) => {
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setVisibilityFilter('SHOW_ANSWERED'))
    }
}