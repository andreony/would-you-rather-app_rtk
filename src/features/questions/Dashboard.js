import React from 'react'
import { connect, useSelector } from 'react-redux'
import Question from './Question'
import { selectAuthedUser } from '../auth/authedUserSlice'

const Dashboard = ({ids, authedUser, history}) =>{

     if(!authedUser.userId){
        history.push('/login')
     }
     return (
         <div className="container">
             <ul className="w-50 mx-auto mb-1">
                {ids.map( (id) => (
                    <Question key={id} id={id} />
                ))}
             </ul>
         </div>
     )
 }
 
 const mapStateToProps = ({questions, authedUser}) => {
     const { ids } = questions
    return {
        ids,
        authedUser
    }
 }
 
 export default connect(mapStateToProps)(Dashboard)