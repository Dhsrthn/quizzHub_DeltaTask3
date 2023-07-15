import { Link, useNavigate } from "react-router-dom";
import {  useEffect, useState, } from "react";
import axios from 'axios'


const Welcome = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3500/',{withCredentials:true}).then((res)=>{
            if(res.data===true){
                navigate('/home')
            }
        })
    },[])
   
    const [regUsername, setregUsername] = useState('')
    const [password, setpassword] = useState('')
    const [logUsername, setlogUsername]=useState('')
    const [logPassword, setlogPassword]= useState('')
    const [OpenLogin, setOpenLogin] = useState(false)
    const [signedup, setsignedup] = useState(false)
    const [OpenSignup, setOpenSignup] = useState(false)
    const[userFound, setuserFound]=useState(true)
    const[wrongPassword,setwrongPassword]=useState(false)
    const[alreadyUser,setalreadyuser]=useState(false)
    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3500/auth/login',{username: logUsername, password: logPassword},{withCredentials:true}).then((res)=>{
            setuserFound(true)
            setwrongPassword(false)
            if(res.data=='no user'){
                setuserFound(false)
            }else if(res.data=='wrong password'){
                setwrongPassword(true)
            }
            else{
                navigate('/home')
            }
        }).catch((err)=>console.log(err))
        
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3500/auth/register', { username: regUsername, password: password }).then((res)=>{
            if(res.data=='user exists'){
                setalreadyuser(true)
            }else{
                setalreadyuser(false)
                setsignedup(true)
            }
        }).catch((err)=>console.log(err))
        setOpenSignup(false)
    }

    return (

        <div className="welcomepage">
            <div className="logo">
                <Link to={'/'}>
                    <img src="/logo.png" />
                </Link>

            </div>
            <div className="ent">
                <div className="signup">
                    <button style={{ width: '20vw' }} onClick={() => {
                       setalreadyuser(false)
                        setsignedup(false)
                        setOpenSignup((prev) => !prev)
                    
                    }}>Signup</button>

                    {
                        OpenSignup && <div className="signupdialogue">
                            <form onSubmit={handleSignUp} >
                                <label>UserName</label>
                                <input type="text" onChange={(event) => {
                                    setregUsername(event.target.value)
                                }} style={{height:'2vmin'}}></input>
                                <br /> 
                                <label>Password   </label>
                                <input type="password" onChange={(event) => {
                                    setpassword(event.target.value)
                                }} style={{height:'2vmin'}}></input>
                                <br />
                                <button id="sub">submit</button>
                                
                            </form>
                            
                        </div>
                    }
                        {alreadyUser&& <h3>User Already Exists</h3>}
                        {signedup && <h3>User created, Login with same credentials</h3>}
                </div>

                <div className="login">
                    <button style={{ width: '20vw' }} onClick={() => {
                        if(OpenLogin){
                            setuserFound(true)
                            setwrongPassword(false)
                           
                        }
                        setalreadyuser(false)
                        setOpenLogin((prev) => !prev)
                        setOpenSignup(false)
                        
                    }
                    }> Login</button>
                    {OpenLogin && <div className="logindialogue">
                        <form onSubmit={handleLogin} >
                            <label>UserName</label>
                            <input type="text" onChange={(event) => {
                                    setlogUsername(event.target.value)
                                }} style={{height:'2vmin'}}></input>
                            <br />
                            <label>Password   </label>
                            <input type="password" onChange={(event) => {
                                    setlogPassword(event.target.value)
                                }} style={{height:'2vmin'}}></input>
                            <br />
                            <button id="login">submit</button>
                            {!userFound && <p>User not found, try again</p>}
                            {wrongPassword&& <p>Wrong password, try again</p>}
                        </form>
                    </div>}
                </div>

            </div>
        </div>);
}

export default Welcome;
