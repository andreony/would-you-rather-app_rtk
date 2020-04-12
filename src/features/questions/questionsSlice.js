import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { saveQuestionAnswer, saveQuestion } from "../../utils/api";
import { updateUserAnswer, saveQuestionToUser } from "../users/usersSlice";
import { showLoading, hideLoading } from "react-redux-loading-bar";


const questionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.timestamp - a.timestamp
})
const initialState = questionsAdapter.getInitialState()

const questionsSlice = createSlice({
    name: 'questions',
    initialState: initialState,
    reducers:{
        addQuestion: questionsAdapter.addOne,
        receiveQuestions(state, action){
            questionsAdapter.setAll(state, action.payload)
        },
        answerQuestion(state, action){
            const { authedUser, qid, answer } = action.payload
            const votes = state.entities[qid][answer].votes

            !votes.includes(authedUser.userId) && votes.push(authedUser.userId)
        },
        /* for later usage */
        removeQuestion: questionsAdapter.removeOne
    }
})

export const questionsAll = state => state.questions

export const { addQuestion, receiveQuestions, answerQuestion, removeQuestion  } = questionsSlice.actions

export function handleAsyncAnswerQ ({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(showLoading())
        saveQuestionAnswer({ authedUser, qid, answer })
            .then( () => dispatch(answerQuestion({ authedUser, qid, answer })) )
            .then( () => dispatch(updateUserAnswer({ authedUser, qid, answer })) )
            .then( () => dispatch(hideLoading()))
    }
}

export const handleAsyncSaveQ = (question) => {
    return (dispatch) => {
        dispatch(showLoading())
        saveQuestion(question)
            .then( (question) => dispatch(addQuestion({...question})) )
            .then( (action) => dispatch(saveQuestionToUser(action.payload)) )
            .then( () => dispatch(hideLoading()))
    }
}

export default questionsSlice.reducer