'use client'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { login } from "../../fetcher/auth"
import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation'

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default function Page() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const router = useRouter();

  async function onSubmit(values) {
    const res = await login(values.username, values.password);
    console.log(res);

    const cookies = new Cookies(null, {path:'/'});

    if (res.status === 200) {
      cookies.set('token', res.data.accessToken);
      cookies.set('refreshToken', res.data.refreshToken);
      // localStorage.setItem('token', res.data.accessToken);
      // localStorage.setItem('refreshToken', res.data.refreshToken);

      router.push('/');
    } else {
      form.setError('root.serverError', {message: res.data.message});
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to I Do Work
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">

          <div className="text-red-500 mb-8">
            <ErrorMessage errors={form.errors} name="root.serverError" />
          </div>

          <FormField
            control={form.control}
            name="username"
            className="flex flex-col space-y-2 w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            className="flex flex-col space-y-2 w-full mb-8"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </Button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <Button asChild>
            <Link href="#" 
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8">
                Sign up &rarr;
                <BottomGradient />
            </Link>
          </Button>
        </form>
      </Form>
    </div>
    
  )
}