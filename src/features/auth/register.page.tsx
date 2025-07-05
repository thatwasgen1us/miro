import { AuthLayout } from "@/features/auth/ui/auth-layout";
import { RegisterForm } from "@/features/auth/ui/register-form";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
  <AuthLayout
    title="Регистрация" 
    description="Введите ваш email и пароль для регистрации в системе" 
    form={<RegisterForm />}
    footerText={<>Уже есть аккаунт? <Link to={ROUTES.LOGIN}> Войти </Link></>}
  />)
}

export const Component = RegisterPage;
