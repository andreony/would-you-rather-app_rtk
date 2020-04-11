import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../../utils/helpers'
import { answerQuestion, handleAsyncAnswerQ } from './questionsSlice'
import { Redirect } from 'react-router-dom'

const QuestionView = ({id, question, authedUser, dispatch}) => {


	const [questionAnswer, setQuestionAnswer] = useState({
		authedUser,
		qid: id,
		answer:'',
		answered: false
	})

	if(!authedUser.userId)
		return <Redirect to="/login"/>

	if(!question)
		return <div className="App-logo">Loading...</div>
	
	const { authorName, avatarURL, optionOne, optionTwo  } = question

	const onChange = (e) => setQuestionAnswer( {...questionAnswer, answer: e.target.value})

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!questionAnswer.answer) 
			return 
		dispatch(handleAsyncAnswerQ(
			{...questionAnswer}
		))
		setQuestionAnswer({...questionAnswer, answered: true})
	}
	if (questionAnswer.answered)
		return <Redirect to={`/question/${id}/answer`} />

	return(
		<div className="card w-50 mx-auto mb-3">
			<div className="card-header">
				<h6 className="font-weight-bold">{authorName} askes:</h6>  
			</div>
			<div className="card-body">
				<div className="row align-intems-center">
					<div className="col-sm-4 d-flex flex-column align-items-center border-right w-100">
						<div>
								<img src={avatarURL} alt="avatar" width="100px" height="100px" className="rounded immage"/>
						</div>
						<div className="card-text text-center my-2">
								<b>{authorName}</b>
						</div>
					</div>
					<div className="col-sm-8">
					<div className="card-title font-weight-bold">Would you rather</div>
						<form onSubmit={handleSubmit}>
							<div className="custom-control custom-radio mb-2">
								<input
									id='q1' 
									className="custom-control-input"
									type="radio" 
									name={question.id} 
									value="optionOne"
									onChange={onChange}
								/>
								<label htmlFor='q1' className="custom-control-label px-2">{optionOne.text}</label>
							</div>
							<div className="custom-control custom-radio mb-2">
								<input 
									id='q2'
									className="custom-control-input"
									type="radio" 
									name={question.id}
									onChange={onChange}
									value="optionTwo"
								/>
								<label htmlFor='q2' className="custom-control-label px-2">{optionTwo.text}</label>
							</div>
							<button 
								className="btn btn-outline-info my-2"
								type='submit'
								> Submit
							</button>
						</form>
					</div>
				</div>
				
			</div>
		</div>
	)
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
	const { id } = props.match.params
	return{
			id,
			authedUser,
			users,
			question: questions.entities[id] 
				?	formatQuestion(questions.entities[id], users.entities[authedUser.userId], authedUser)
				: null,
			dispatch: props.dispatch
	}
}

export default connect(mapStateToProps)(QuestionView)
