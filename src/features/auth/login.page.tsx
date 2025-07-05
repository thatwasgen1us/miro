import { AuthLayout } from "@/features/auth/ui/auth-layout";
import { LoginForm } from "@/features/auth/ui/login-form";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
  <AuthLayout 
    title="Вход в систему" 
    description="Введите ваш email и пароль для входа в систему" 
    form={<LoginForm />}
    footerText={<>Нет аккаунта? <Link to={ROUTES.REGISTER}> Зарегистрироваться </Link></>}
    />
  )
}

export const Component = LoginPage;
