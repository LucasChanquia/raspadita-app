"use client";

import { useStoreGame } from "./store/store";
import { useRouter } from "next/navigation"

export default function Home() {
  const { name, setName } = useStoreGame();
  console.log(name);
  
  const route = useRouter()

  function handleinput(e: any) {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  }

  function handleClik() {
    route.push('/inicio')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="pb-[50px] text-3xl text-red-700">
        RASPADITA APP
      </h1>
      <form className="flex flex-col gap-2 shadow-custom p-8 rounded-md">
        <label className="text-black ">Ingresá tu nombre:</label>
        <input
          type="text"
          onChange={(e) => {
            handleinput(e);
          }}
          className="rounded-md bg-transparent border-2 border-[#33366A] border-solid text-gray-950 pl-1"
        ></input>
      </form>
      <button className="border rounded-2xl bg-[#FF8087] px-6 py-2 mt-[50px]" onClick={handleClik}>
        Iniciar
      </button>
    </main>
  );
}
