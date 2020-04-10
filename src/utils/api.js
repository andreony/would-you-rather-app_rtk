import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'

export async function getInitialData () {
    const [users, questions] = await Promise.all([
        _getUsers(),
        _getQuestions(),
    ])
    //console.log(eithers)
    return {
        users,
        questions
    }
  }

export function saveQuestion (info) {
    return _saveQuestion(info)
}

export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
}
