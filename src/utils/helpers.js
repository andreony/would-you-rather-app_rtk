export const formatQuestion = (question, author, authedUser) => {
    return {
        ...question,
        authorName: author.name,
        avatarURL: author.avatarURL,
        hasAnsweredOptOne: question.optionOne.votes.includes(authedUser.userId),
        hasAnsweredOptTwo: question.optionTwo.votes.includes(authedUser.userId)
    }
}