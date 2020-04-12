import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../../utils/helpers'
import { handleAsyncAnswerQ } from './questionsSlice'
import { Redirect } from 'react-router-dom'
import ProgressBar from '../questions/ProgressBar'

const QuestionView = ({id, question, authedUser, dispatch, hasAnswered}) => {

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
	
	const { authorName, avatarURL, optionOne, optionTwo, hasAnsweredOptOne, hasAnsweredOptTwo } = question
	const optOneCounts = question.optionOne.votes.length
	const optTwoCounts = question.optionTwo.votes.length

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
	if (questionAnswer.answered || hasAnswered){
		return (
				<div className="card w-50 mx-auto mb-3">
			<div className="card-header">
				<b>Asked by {authorName} </b>
			</div>
			<div className="card-body py-2">
				<div className="row align-intems-center">
					<div className="col-sm-4 d-flex flex-column justify-content-center align-items-center border-right w-100">
						<img src={avatarURL} alt="avatar" width="120px" height="120px" className="rounded immage"/>
						<div className="text-center my-2">
								<b>{authorName}</b>
						</div>
					</div>
					<div className="col-sm-8">
						<div className="card-title font-weight-bold">Results:</div>
							<div className="row">
								<div className="col-sm-12">
									<div 
										className={hasAnsweredOptOne 
												? "card bg-success-light position-relative mb-2"
												: "card mb-2"
										}>
										<div className="your-answer">You</div>
										<div className="card-body py-2">
												<p>{question.optionOne.text}</p>
												<ProgressBar percentage={(optOneCounts * 100 / (optOneCounts + optTwoCounts)).toFixed(1) }/>
												<p><b>{`${optOneCounts} out of ${optOneCounts + optTwoCounts} votes`}</b></p>
										</div>
								</div>
							</div>
							<div className="col-sm-12">
								<div 
									className={hasAnsweredOptTwo 
											? "card bg-success-light your-answer mb-2"
											: "card mb-2"
									}>
									<div className="your-answer">You</div>
									<div className="card-body py-2">
											<p>{question.optionTwo.text}</p>
											<ProgressBar percentage={(optTwoCounts *100 / (optOneCounts + optTwoCounts)).toFixed(1)}/>
											<p><b>{`${optTwoCounts} out of ${optOneCounts + optTwoCounts} votes`}</b></p>
									</div>
								</div>
							</div>
						</div>
																			
					</div>
				</div>
			</div>
		</div>
	)
	}

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
			question: questions.entities[id] && users.entities[authedUser.userId]
				?	formatQuestion(questions.entities[id], users.entities[authedUser.userId], authedUser)
				: null,
			dispatch: props.dispatch,
			hasAnswered: users.entities[authedUser.userId] 
				? users.entities[authedUser.userId].answers[id] ? true : false
				: null
	}
}

export default connect(mapStateToProps)(QuestionView)
