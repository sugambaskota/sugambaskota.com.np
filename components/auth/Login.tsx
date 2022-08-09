import * as React from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

import LoginForm from "./LoginForm";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (router?.query?.error) {
      notification.error({
        message: router?.query?.error,
      });
    }
  }, [router]);

  React.useEffect(() => {
    if (session?.data?.user && session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    signIn("credentials", {
      email: values?.email,
      password: values?.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mt-6 mb-4 text-center text-3xl font-semibold transition-colors duration-500 dark:text-white">
        Login
      </h1>
      <div>
        <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
