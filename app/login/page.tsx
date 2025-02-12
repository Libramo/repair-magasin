import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
      <div className="mx-auto my-auto">
        <h1>BLY Reparation électronique</h1>
        <div className="flex flex-row justify-center gap-10 p-5 mx-auto">
          <Button className="bg-accent text-black border hover:text-white">
            <Link href="/">Accueil</Link>
          </Button>
          <Button asChild>
            <LoginLink>Se connecter</LoginLink>
          </Button>
        </div>
      </div>
    </main>
  );
}
