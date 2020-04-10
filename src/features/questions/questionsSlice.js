import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

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
        /* for later usage */
        removeQuestion: questionsAdapter.removeOne
    }
})

export const { addQuestion, receiveQuestions, removeQuestion } = questionsSlice.actions

export default questionsSlice.reducer