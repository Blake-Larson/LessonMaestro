import { SignIn } from "@clerk/nextjs";
import Logo from "~/components/Logo";

const SignInPage = () => (
  <div className="relative flex flex-col items-center">
    <div className="absolute top-2 left-2">
      <Logo />
    </div>
    <div className="mt-20">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
      />
    </div>
  </div>
);
export default SignInPage;
