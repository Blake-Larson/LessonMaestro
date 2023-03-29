import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex flex-col items-center">
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
