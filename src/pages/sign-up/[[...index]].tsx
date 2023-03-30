import { SignUp } from "@clerk/nextjs";
import Logo from "~/components/Logo";

const SignUpPage = () => (
  <div className="flex flex-col items-center">
    <div className="absolute top-2 left-2">
      <Logo />
    </div>
    <div className="mt-20">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
      />
    </div>
  </div>
);
export default SignUpPage;
