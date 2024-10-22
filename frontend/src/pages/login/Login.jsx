import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import LoginForm from "./components/LoginForm";
import useAxios from "../../components/useAxios";
import { useNavigate } from "react-router-dom";

let role
let id

function LoginPage() {

  const navigate= useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm(); 
  
  const {  loading,error,fetchData } = useAxios(); 
  
  const onSubmit = async (data) => {
    const response = (await fetchData({
      url: "/api/auth/login",
      method: "POST",
      data: {
        userName: data.Username,
        password: data.Password,
      },
    })).data;

    role=response.roles
    id= response.id

    navigate(`/dashboard/${role}/${id}` )
  
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
        id= {id}
      />
    </PageLayout>
  );
}export default LoginPage;