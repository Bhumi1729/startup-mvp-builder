import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="signin-glow signin-glow-1" />
      <div className="signin-glow signin-glow-2" />
      <div className="signin-glow signin-glow-3" />
      {/* Card wrapper with focused glow */}
      <div className="relative z-10 flex justify-center items-center">
        <div className="card-glow" />
        <div className="relative z-10">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
