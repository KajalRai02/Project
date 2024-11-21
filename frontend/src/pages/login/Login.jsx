import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import LoginForm from "./components/LoginForm";

import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

import useAuthService from "../../services/AuthService";
import CircularSpinner from "../../components/Forms/CircularSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";



function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { error, loginAuth } = useAuthService();




  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const onSubmit = async (data) => {
    try {
      const response = await loginAuth(data);

      const user = {
        id: response.id,
        username: response.userName,
        role: response.roles,
      };
      if (response) {
        toast.success("Successfully logged in");
        dispatch(login(user));
      }else{
        toast.error("Could not login")
      }

      if (response.roles === "SUPER_ADMIN") {
        navigate(`/dashboard/${response.roles}`);
      } else {
        navigate(`/dashboard/${response.roles}/${response.id}`);
      }
    } catch {
      console.log("error occured");
    }
    
  };

  return (
    
    <PageLayout>
      {error && <p>Invalid Credentials</p>}
      
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
