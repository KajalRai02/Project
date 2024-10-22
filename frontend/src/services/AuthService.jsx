
import useAxios from "../components/useAxios";


const useAuthService = () => {

    const {  loading,error,fetchData } = useAxios();

    const loginAuth=async(data)=>{
        try{

            const response = (await fetchData({
                url: "/api/auth/login",
                method: "POST",
                data: {
                  userName: data.Username,
                  password: data.Password,
                },
            })).data;
            return response;

        }catch(error){
            console.log("Problem logging in .", error)
            return;
        }
        
    }

    const registerAuth = async(data)=>{
        try{

            const response = await fetchData({
                url: "/api/student/register",
                method: "POST",
                data: {
                  userName: data.Username,
                  password: data.Password,
                  email: data.Email
                },
            });
            return response;

        }catch(error){
            console.log("Problem while registering .", error)
            return;
        }
        
    }

    const logoutAuth = ()=>{
        
        //remove local storage 
        //remove cookies
        //remove redux

    }
    return {error, loading, loginAuth, registerAuth}
 
}

export default useAuthService