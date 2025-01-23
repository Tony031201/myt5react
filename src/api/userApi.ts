import apiClient from "./apiClient.ts";

//signup

export const Signup = async(username:string,answer:string)=>{
    const userdata = {
        username:username,
        answer:answer
    }

    try{
        const response = await apiClient.post('/user/signup',userdata)
        console.log(response)
        return response.data;
    }catch (error) {
        console.error("Error in SignUp API:", error);
        throw error;
    }
}

export const Whoami = async()=>{

    const response = await apiClient.get('/user/whoami')
    console.log(response.data)
    return response.data;
}

export const Signin = async(username:string)=>{
    try{
        const userdata = {
            username:username
        }

        const response = await apiClient.post('/user/signin',userdata)
        console.log(response)
        return response.data;
    }catch (error) {
        console.error("Error in SignIn API:", error);
        throw error;
    }
}

export const Signout = async()=>{
    try{
        const response = await apiClient.get('/user/signout')
        console.log(response)
        return response.data;
    }catch (error) {
        console.error("Error in SignOut API:", error);
        throw error;
    }
}

export const Ask = async(question:string)=>{
    const data = {
        question:question
    }

    try{
        const response = await apiClient.post('/conversation/pred',data)
        console.log(response.data)
        return response.data
    }catch (error) {
        console.error("Error in Ask API:", error);
        throw error;
    }
}