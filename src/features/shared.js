import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users/usersSlice"
import { receiveQuestions } from "./questions/questionsSlice"
import { setVisibilityFilter, VisibilityFilters } from "./filters/filtersSlice"
import { showLoading, hideLoading } from 'react-redux-loading-bar'


export const handleInitialData = () => {
    return async (dispatch) => {
        dispatch(showLoading())
        const { users, questions } = await getInitialData()
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED))
        dispatch(hideLoading())
    }
}