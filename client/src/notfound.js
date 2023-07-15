import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const NotFound = () => {
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3500/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/')
            }
        })
    },[])

    return ( <div >
            <Navbar/>
            <div className="notfoundpage">
                <h1 >404</h1>
                <h2>Page Not Found {":'("}</h2>
            </div>
    </div> );
}
 
export default NotFound;