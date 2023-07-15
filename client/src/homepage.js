import Navbar from "./navbar";
import {  useState, useEffect } from "react";
import axios from "axios";
import QuizList from "./quizlist";
import ProfileList from "./profileList";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
    const navigate=useNavigate()
    const[displayQuiz, setdisplayQuiz]=useState([])
    const[priority, setpriority]=useState('recent')
    const[noRecords,setnoRecords]=useState(false)
    const[displayProfile, setdisplayProfile]=useState([])
    const[noOtherUsers,setnoOtherUsers]=useState(false)
    const[renderProfile, setrenderProfile]=useState(false)
    useEffect(()=>{

        if(priority=='recent'){
            axios.get("http://localhost:3500/quiz?priority=recent", { withCredentials: true }).then((res)=>{
            if (res.data == 'error') {
                navigate('/')
            }
            if(res.data=='no records found'){
                setnoRecords(true)
            }else{
                setdisplayQuiz(res.data)
            }
           
        })
        }else{
            axios.get("http://localhost:3500/quiz?priority=popular", { withCredentials: true }).then((res)=>{
            if (res.data == 'error') {
                navigate('/')
            }
            if(res.data=='no records found'){
                setnoRecords(true)
            }else{
                setdisplayQuiz(res.data)
            }
        })

        }
        axios.get("http://localhost:3500/users",{withCredentials:true}).then((res)=>{
            if(res.data.length>0){
                setdisplayProfile(res.data[0])
                setrenderProfile(true)
            }else{
                setnoOtherUsers(true)
            }
        })
    },[priority])
    
    const handleChangefeed=(e)=>{
        if(e===1){
            setpriority('recent')
        }else{
            setpriority('popular')
        }

    }

    return (
        <div className="home">
            <Navbar />

            <div className="homebody">
                <div className="content">
                    <div className="feedchoise">
                    <button className="feedButton" onClick={()=>handleChangefeed(1)}>Most Recent</button>
                    <button className="feedButton" onClick={()=>handleChangefeed(2)}>Most Popular</button>
                    </div>
                    {displayQuiz &&!noRecords && <QuizList Quizzes={displayQuiz} />}
                    {noRecords && <div className="quizpreview"> <h3>No Quizzes Found</h3></div>}
                </div>
                <div className="sidebar">
                   <div className="umaykn">
                    <h2 >Other users</h2> 
                   </div>
                   <div className="profiless">
                            {noOtherUsers && <h3>No Other Users</h3>}
                            {!noOtherUsers && renderProfile && <ProfileList todisplay={displayProfile} />}
                    </div>
                </div>
            </div>

        </div>);
}

export default Homepage;