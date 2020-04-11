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
            const { id, author } = action.payload
            console.log(id, author)
            const questions = state.entities[author].questions 
            !questions.includes(id) && questions.push(id)
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

export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers
  } = usersAdapter.getSelectors(state => state.users);

export default usersSlice.reducer