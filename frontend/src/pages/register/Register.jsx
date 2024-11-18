// RegisterPage.js
import { useForm } from "react-hook-form";
import PageLayout from "../../components/PageLayout";
import RegisterForm from "./component/RegisterForm";
import useAuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularSpinner from "../../components/Forms/CircularSpinner";

function RegisterPage() {
  let title = "Register";

  const userRole = useSelector((state) => state.auth.user.role);

  if (userRole === "SUPER_ADMIN") {
    title = "Register Admin";
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { error, registerAuth, createAdmin } = useAuthService();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.loading);


  const onSubmit = async (data) => {
    try {
      if (userRole === "SUPER_ADMIN") {
        console.log("Registering Admin ");
        const adminRegistered = await createAdmin(data);
        if (adminRegistered) {
          navigate("/dashboard/SUPER_ADMIN");
        }
      } else {
        const register = await registerAuth(data);
        if (register) {
         
          navigate("/login");
        }
      }
    } catch {
      console.log("Registered component error, while registering", error);
    }
  };

  return (
    <PageLayout>
      {loading ? (
        <CircularSpinner />
      ) : (
        <RegisterForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          title={title}
        />
      )}
    </PageLayout>
  );
}

export default RegisterPage;
