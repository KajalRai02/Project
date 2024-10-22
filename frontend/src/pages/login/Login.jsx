
import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import LoginForm from "./components/LoginForm";

import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

import useAuthService from "../../services/AuthService";


function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const {error, loading, loginAuth} = useAuthService();

  //const {  loading,error,fetchData } = useAxios();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const onSubmit = async (data) => {
    try{
      const response= await loginAuth(data)

      const user={
        id:response.id,
        username:response.userName,
        role:response.roles
      }
      dispatch(login(user));
      if(response.roles ===  'SUPER_ADMIN'){
        navigate(`/dashboard/${response.roles}`)
      }
      else{
        navigate(`/dashboard/${response.roles}/${response.id}`)
      }
      

    }catch{
      console.log("error occured")
    }
    //TODO : if response is null , undefined or error , make sure this portion of code is not executed
    
  };


  return (
    <PageLayout>
      {loading && <p>Loading...</p>} 
      {error && <p>Error: {error}</p>} 
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  );
}

export default LoginPage;



  // const response = (await fetchData({
    //   url: "/api/auth/login",
    //   method: "POST",
    //   data: {
    //     userName: data.Username,
    //     password: data.Password,
    //   },
    // })).data;
    // console.log(response)
