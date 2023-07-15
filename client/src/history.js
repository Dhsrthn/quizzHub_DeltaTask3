import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'

const History = () => {
    const navigate = useNavigate()
    const { username } = useParams()
    const [quizAttend, setquizAttend]=useState([])

    useEffect(() => {
        axios.get(`http://localhost:3500/users/${username}`, { withCredentials: true }).then((res) => {
            if (res.data == 'error') {
                navigate('/')
            }
            const { username, id, quizhistory} = res.data[0]

            if (eval(id) == res.data[1]) {

                setquizAttend(quizhistory)
            } else {

                navigate(`/profile/${username}`)
            }
        })
    }, [])
    return ( <div className="historypage">
        <Navbar/>

        <div className="History">
        <h1>History of quizzes taken by you</h1>
        {!(quizAttend.length>0) && <h2>You have not attended any quizzes</h2>}
        {(quizAttend.length>0) && 
        
                    quizAttend.map((quiz,quizIndez)=>(
                        <div className='eachquiz' key={quizIndez}>
                            <h2>QuizName: {quiz[0]}</h2>
                            <h3>Scored {quiz[1]} out of {quiz[2]}</h3>
                        </div>
                    ))}
         </div>
    </div> );
}
 
export default History;