import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const [currUser, setcurrUser] = useState('')
    const [searchWith, setsearchWith] = useState('search for user')
    useEffect(() => {
        axios.get("http://localhost:3500/users/currentuser", { withCredentials: true }).then((res) => {
            setcurrUser(res.data.username)
        })
    }, [])

    const goMyProf = () => {
        navigate(`/profile/${currUser}`)
    }
    const goCreate = () => {
        navigate('/create')
    }

    const goHome = () => {
        navigate('/home')
    }

    const handleLogout = () => {
        axios.get('http://localhost:3500/auth/logout', { withCredentials: true }).then((res) => {

            navigate('/')
        })

    }

    const handleSearch = async (e) => {    
          setsearchWith(e.target.value)    
    }

    const setusername=(e)=>{
        return new Promise((resolve) => {
            setsearchWith(e);
            resolve(); // Resolve the Promise to indicate that setusername is complete
        });
    }


    const handleFocus = () => {
        setsearchWith('')
    }
    const handleActualSearch = () => {
        navigate(`/search/user/${searchWith}`)
    }
    return (
        <div className="top">
            <div className="homeheader">
                <div className="navlogo">
                    <Link to={'/home'}>
                        <img src="/logo.png" />
                    </Link>
                </div>
                <div className="othernav">
                    <div className="navbuttons">
                        <button id='homebutton' onClick={goHome}>Home</button>
                        <button id='create' onClick={goCreate}>Create</button>
                        <button id="prof" onClick={goMyProf}>{currUser}</button>
                        <button id="log" onClick={handleLogout}>Logout</button>

                    </div>
                    <div className="search-container">
                        <input type="text" value={searchWith} onFocus={() => handleFocus()}  onChange={(event) => handleSearch(event)} style={{ fontSize: '1.5vmin' }} />
                        <button className="search-button" onClick={() => handleActualSearch()} style={{
                            backgroundImage: 'url("/search.png")', backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        </button>
                    </div>
    
                </div>
            </div>
        </div>

    );
}

export default Navbar;