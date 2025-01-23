import React,{useEffect,useState} from 'react';
import { Signout } from '../api/userApi.ts';

function TestSignOut(){
    const [user, setUser] = useState<any[]>([]);

    useEffect(()=>{
        async function signup() {
            try{
                const user = await Signout();
                // setUser(user);
                localStorage.setItem("isLoggedIn", "false");
            }catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        signup();
    },[])

    return (
        <div>
          <h1>Sign Out</h1>
        </div>
      );
}

export default TestSignOut