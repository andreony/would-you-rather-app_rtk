import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
    loading: false
})

const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers:{
        addUser: usersAdapter.addOne,
        receiveUsers(state, action){
            usersAdapter.setAll(state, action.payload)
        },
        updateUserAnswer(state, action){
            const {authedUser, qid, answer} = action.payload
            state.entities[authedUser.userId].answers[qid] = answer
        },
        saveQuestionToUser(state, action){
            const { authedUser, qid } = action.payload
            const questions = state.entities[authedUser.userId].questions 
            !questions.includes(qid) && questions.push(qid)
        },
        /* for later */
        removeUser: usersAdapter.removeOne
    }
})

export const { 
    addUser, 
    receiveUsers, 
    updateUserAnswer, 
    saveQuestionToUser, 
    removeUser 
} = usersSlice.actions

export default usersSlice.reducer