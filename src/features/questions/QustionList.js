import React from 'react'
import Question from './Question'

const QuestionList = ({questions, authedUser}) => {
	if(!authedUser.userId){
		return <div className="App-logo">Loading...</div>
	}
	return (
		<ul className="w-50 mx-auto mb-1 pl-0">
			{questions.ids.map( (id) => (
				<Question key={id} id={id} />
			))}
		</ul>
	)
}
export default QuestionList