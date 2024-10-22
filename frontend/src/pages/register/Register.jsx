// RegisterPage.js
import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import RegisterForm from "./component/RegisterForm";
import useAuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const {error, registerAuth} = useAuthService();
  const navigate= useNavigate()

  const onSubmit = async(data) => {
    
    try{
      const register = await registerAuth(data);
      if(register){
        console.log("Registered")
        navigate("/login")
      }
      
      

    }catch{
      console.log('Registered component error, while registering', error)
    }
    
    
  };

  return (
    <PageLayout>
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  );
}

export default RegisterPage;
