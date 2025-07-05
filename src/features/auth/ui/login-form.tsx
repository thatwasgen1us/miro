import { useLogin } from "@/features/auth/model/use-login";
import { Button } from "@/shared/ui/kit/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email обязателен"
    })
    .email("Неверный email"),
  password: z
    .string({
      required_error: "Пароль обязателен"
    })
  .min(6, "Пароль должен содержать не менее 6 символов")
})

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const {errorMessage, isPending, login} = useLogin()

  const onSubmit = form.handleSubmit(login)

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control} 
          name="email"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="admin@gmail.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField 
          control={form.control} 
          name="password"
          render={({ field }) => (
          <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="********" type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />

        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button 
          type="submit"
          className="cursor-pointer"
          disabled={isPending}
        >
          Войти
        </Button>
      </form>
    </Form>
  )
}