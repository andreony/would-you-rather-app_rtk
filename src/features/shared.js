import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"
import { receiveQuestions } from "./questions/questionsSlice"
import { setVisibilityFilter } from "./filters/filtersSlice"
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const handleInitialData = () => {
    return async (dispatch) => {
        dispatch(showLoading())
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setVisibilityFilter('SHOW_ANSWERED'))
        dispatch(hideLoading())
    }
}