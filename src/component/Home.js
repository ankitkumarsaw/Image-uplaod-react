import User from '../account/User'
import Button from 'react-bootstrap/Button';
import Imagegallery from './Imagegallery'
import { useState } from 'react'
import {logout} from '../firebase/Firebase'

export default function Home(){
    const userLogout = async () =>{
        try{
          await logout()
          setUser(null)
        } 
        catch(error){
         console.log(error.message)
        }
     }
    const [user, setUser] = useState()
    console.log(user)
    return(
        <div>
        {user ? <div> <Button variant="outline-success"  onClick={userLogout} >Logout</Button> 
        <div>
            <h6>{user.displayName}</h6>
            <h6>{user.email}</h6>
        </div>
         <Imagegallery user={user} /> </div>: <User setUser={setUser}/>}
        </div>
    )
}