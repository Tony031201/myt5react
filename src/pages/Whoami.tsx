import React,{useEffect,useState} from 'react';
import { Whoami } from '../api/userApi.ts';

function WhoamiTest(){
    const [data, setData] = useState<any[]>([]);

    useEffect(()=>{
        async function who() {
            try{
                const user = await Whoami();
                setData(user);
            }catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        who();
    },[])

    return (
        <div>
          <h1>whoami page</h1>

        </div>
      );
}

export default WhoamiTest