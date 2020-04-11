import React from 'react'

const UserSummary = ({avatarURL, name, questions, answers}) => (
	<div className="card mb-3">
		<div className="card-body p-2">
			<div className="row row align-items-center">
				<div className="col-sm-3 border-right">
					<img src={avatarURL} alt="avatar" width="100px" height="100px" className="rounded immage"/>
				</div>
				<div className="col-sm-6 border-right">
					<h4>{name}</h4>
					<div className="d-flex align-items-center justify-content-between border-bottom my-2 pb-2">
						<span>Answered questions</span>
						<span>{Object.keys(answers).length}</span>
					</div>
					<div className="d-flex align-items-center justify-content-between my-2">
						<span>Created questions</span>
						<span>{questions.length}</span>
					</div>
				</div>
				<div className="col-sm-3">
					<div className="card">
						<div className="card-header">Score</div>
						<div className="card-body d-flex justify-content-center align-items-center py-2">
							<div className="score-circle">{Object.keys(answers).length + questions.length}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default UserSummary