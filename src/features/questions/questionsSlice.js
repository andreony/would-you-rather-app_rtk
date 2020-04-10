import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { saveQuestionAnswer, saveQuestion } from "../../utils/api";
import { updateUserAnswer, saveQuestionToUser } from "../users/usersSlice";

const questionsAdapter = createEntityAdapter()
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

export const { addQuestion, receiveQuestions, answerQuestion, removeQuestion  } = questionsSlice.actions

export const handleAsyncAnswerQ = ({ authedUser, qid, answer }) => {
    return (dispatch) => {
        saveQuestionAnswer({ authedUser, qid, answer })
            .then( () => dispatch(answerQuestion({ authedUser, qid, answer })) )
            .then( () => dispatch(updateUserAnswer({ authedUser, qid, answer })) )
    }
}

export const handleAsyncSaveQ = (question) => {
    return (dispatch) => {
        saveQuestion(question)
            .then( (question) => dispatch(addQuestion(question)) )
            .then( ({id, author}) => dispatch(saveQuestionToUser({id, author})) )
    }
}

export default questionsSlice.reducer