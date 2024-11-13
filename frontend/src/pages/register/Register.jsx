// RegisterPage.js
import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import RegisterForm from "./component/RegisterForm";
import useAuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RegisterPage() {
  let title = "Register";

  //firstly i need to check if there is token present in local storage

  const userRole = useSelector((state) => state.auth.user.role);
  console.log("This is userRole i am tring to retrieve from redux =",userRole)

  if (userRole === "SUPER_ADMIN") {
    title = "Register Admin";
  }

  // get the role from redux
  // if role exists and is superadmin
  //pass the title as registering super admin else register
  //also pass the api call based on role.[onsubmit]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { error, registerAuth, createAdmin } = useAuthService();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (userRole === "SUPER_ADMIN") {
        console.log("Registering Admin ");
        const adminRegistered=await createAdmin(data)
        if(adminRegistered){
          navigate('/dashboard/SUPER_ADMIN')
        }

      } else {
        const register = await registerAuth(data);
        if (register) {
          console.log("Registered");
          navigate("/login");
        }
      }
    } catch {
      console.log("Registered component error, while registering", error);
    }
  };

  return (
    <PageLayout>
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        title={title}
      />
    </PageLayout>
  );
}

export default RegisterPage;
