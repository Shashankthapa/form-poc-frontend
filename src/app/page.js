import Image from "next/image";
import LoginSignupSlider from "./login/loginSignUpSlider";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <LoginSignupSlider />
    </main>
  );
}
