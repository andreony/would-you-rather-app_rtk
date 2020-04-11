import { createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
    name:'autherdUser',
    initialState: {
        userId: '',
        name:'',
        avatarURL:''
    },
    reducers:{
        authenticateUser(state, action){
            const { id, name, avatarURL } = action.payload
            return {userId:id, name, avatarURL}
        },
        logoutUser(state,action){
            return {userId:''}
        }
    }
})

export const selectAuthedUser = state => state.autherdUser

export const { authenticateUser,  logoutUser} = authedUserSlice.actions
export default authedUserSlice.reducer
