import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col items-start justify-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-white/80 w-4/5 sm:max-w-96 text-black sm:text-2xl">
          <h1 className="text-4xl font-bold">
            BLY
            <br />
            Reparation électronique
          </h1>
          <p>Balbala, PK13 Oum salama</p>
          Djibouti
          <p className="text-sm">
            Ouverture : Dimanche au samedi, <br /> De 8H00 à 17h00
          </p>
          <Link
            href="/login"
            className="hover:underline text-sm text-green-700 justify-end flex"
          >
            <Button>Admin</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
