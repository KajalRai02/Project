import { useForm } from 'react-hook-form';
import PageLayout from '../../components/PageLayout';
import LoginForm from './components/LoginForm';
import useAxios from '../../components/useAxios';

function LoginPage() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();  

  const { response, error, loading, fetchData } = useAxios(); 

  const onSubmit = async (data) => {
    await fetchData({
      url: '/api/auth/login',
      method: 'POST',
      data: {
        userName: data.Username,
        password: data.Password,
      },
    });    

    if (response) {
      console.log(response.headers);
      const token = response.headers['authorization'];
      if (token) {
        localStorage.setItem('accessToken', token);
        console.log('Token stored successfully:', token);
      } else {
        console.log('Token not found in headers');
      }
      reset();
    }    if (error) {
      console.error('Login error:', error);
    }
  };  
  
  return (
    <PageLayout>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  );

}export default LoginPage;