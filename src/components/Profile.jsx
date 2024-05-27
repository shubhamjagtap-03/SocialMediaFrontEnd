import { useEffect } from 'react';
import '../css/UserProfileCard.css';

const Profile=({setProgress})=> {
  useEffect(() =>{
    setProgress(30);
    setTimeout(() => {
        setProgress(100);
    },1000)
  },[])
  return (
  <div>
    <div style={{display:"flex",
     justifyContent:"space-evenly",
     margin:"18px 0px"
     }}>
    <div>
      <img  style={{width:'160px',height:'160px',borderRadius:'80px'}} src="https://c4.wallpaperflare.com/wallpaper/692/93/295/women-actress-brunette-long-hair-wallpaper-preview.jpg" alt="" />
    </div>
    <div>
      <h1>Emma Watson</h1>
      <div  style={{display:'flex', justifyContent:"space-between"}}>
        <h6>40post</h6>
        <h5>follower</h5>
        <h5>following</h5>
      </div>
    </div>
    </div>
  </div>
  );
}

export default Profile;
