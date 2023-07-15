import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileList from "./profileList";

const SearchResult = () => {

    const navigate = useNavigate()
    const { username } = useParams()
    const[matchDisplay,setmatchDisplay]=useState([])
    const[noUsers, setnoUsers]=useState(false)
    useEffect(()=>{
            axios.get(`http://localhost:3500/users/search/${username}`,{withCredentials:true}).then((res)=>{
                if(res.data=='error'){
                    navigate('/')
                }else if(res.data=='no user'){
                    setnoUsers(true)
                }else{
                    setnoUsers(false)
                    setmatchDisplay(res.data)
            }
            })
            
    },[username])
    return ( <div>
            <Navbar/>
            <div className="searchresults">
                {noUsers && <h1>No users found :/ </h1>}
                {!noUsers && 
                
                <>
                <h1>User with {username}</h1>
                <ProfileList todisplay={matchDisplay} />
                </>
                }
            </div>

    </div> );
}
 
export default SearchResult;