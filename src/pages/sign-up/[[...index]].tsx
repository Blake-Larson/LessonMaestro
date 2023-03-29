import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex flex-col items-center">
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
