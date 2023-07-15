import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizList from "./quizlist";

const Profile = () => {
    const navigate = useNavigate()
    const { username } = useParams()
    const [pageuser, setpageuser] = useState('')
    const [numberquizzes, setnumberquizzes] = useState('')
    const [Viewer, setViewer] = useState(false)
    const [noUser, setnoUser] = useState(false)
    const [noQuizzes, setnoQuizzes] = useState(false)
    const [quizList, setquizList] = useState([])

    const handleHistory = () => {
        navigate(`/profile/${username}/history`)
    }

    useEffect(() => {
        axios.get(`http://localhost:3500/users/${username}`, { withCredentials: true }).then((res) => {
            if (res.data == 'error') {
                navigate('/')
            } else if (res.data == 'no user') {
                setnoUser(true)
            } else {
                setnoUser(false)
                const { username, id, noquizzes, quizlist } = res.data[0]
                setpageuser(username)
                setnumberquizzes(noquizzes)
                if (eval(id) == res.data[1]) {
                    setViewer(false)
                } else {
                    setViewer(true)
                }
            }

        })
        axios.get('http://localhost:3500/quiz/myquizzes', { withCredentials: true }).then((res) => {
            if (res.data.length == 0) {
                setnoQuizzes(true)
            } else {
                setnoQuizzes(false)
                setquizList(res.data)
            }
        })
    }, [username])

    return (
        <div className="profilepage">
            <Navbar />
            {noUser && <h2>No such user exist with the username {username}</h2>}
            {!noUser &&
                <>
                    <div className="profileviewer">
                        <div id="userimg"><img src="/user.png" alt="" /></div>
                        <div className="profileinfo"><h2>Username: {pageuser}</h2>
                            <h2>No of quizzes: {numberquizzes}</h2>

                            {!Viewer && <button id='historybutton' onClick={() => { handleHistory() }} >History</button>}</div>
                    </div>
                    <div className="quizlist">
                        {noQuizzes && <><h2>No Quizzes Found</h2></>}
                        {!noQuizzes && <QuizList Quizzes={quizList} />}
                    </div>
                </>
            }
        </div>);
}

export default Profile;