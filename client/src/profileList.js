import { Link } from "react-router-dom";


const ProfileList = ({todisplay}) => {
    return ( <div className="profile-list">
        {
            todisplay.map(profile=>(
                
                    <Link to={`/profile/${profile.username}`} key={profile.id} style={{ textDecoration: 'none' }}>
                        <div className="profilepreview" >
                        {profile.username}
                        </div>
                    </Link>
                
            ))
        }

    </div> );
}
 
export default ProfileList;