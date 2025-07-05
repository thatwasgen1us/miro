import { useRegister } from "@/features/auth/model/use-register";
import { Button } from "@/shared/ui/kit/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email обязателен"
    })
    .email("Неверный email"),
  password: z
    .string({
      required_error: "Пароль обязателен"
    })
  .min(6, "Пароль должен содержать не менее 6 символов"),
  confirmPassword: z.string().optional()
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Пароли не совпадают",
})

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema)
  })

  const {errorMessage, isPending, register} = useRegister()

  const onSubmit = form.handleSubmit(register)


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
            <Input placeholder="user@gmail.com" type="email" {...field} />
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
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input placeholder="********" type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField 
          control={form.control} 
          name="confirmPassword"
          render={({ field }) => (
          <FormItem>
          <FormLabel>Подтвердите пароль</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button 
          className="cursor-pointer" 
          type="submit"
          disabled={isPending}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}