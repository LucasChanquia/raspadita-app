"use client";


import { useState } from "react";
import { useStoreGame } from "./store/store";
import { useRouter } from "next/navigation";
import { Analytics } from '@vercel/analytics/react';


export default function Home() {
  const { name, setName, setGenre, genre } = useStoreGame();
  const [isFormValid, setIsFormValid] = useState(false);

  
  const route = useRouter();

  function handleinput(e: any) {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
    if(value !== ''){
      setIsFormValid(true);
    }
  }

  function handleClik() {
    route.push("/inicio");
  }

  function handleSelect (e: any) {
    const value = e.target.value
    setGenre(value)
    if(value !== ''){
      setIsFormValid(true);
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="pb-[50px] text-3xl text-red-700">RASPADITA APP</h1>
      <form className="flex flex-col gap-2 shadow-custom p-8 rounded-md">
        <label className="text-black ">Ingresá tu nombre:</label>
        <input
          type="text"
          onChange={(e) => {
            handleinput(e);
          }}
          className="rounded-md bg-transparent border-2 border-[#33366A] border-solid text-gray-950 pl-1"
        ></input>
        <label>Seleccioná tu genero:</label>
        <select name="genre" className="rounded-md bg-transparent border-2 border-[#33366A] border-solid text-gray-950 pl-1" onChange={(e)=>{handleSelect(e)}}>
          <option value="Value1" disabled selected>Genero...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino" >
            Femenino
          </option>
        </select>
      </form>
      <button
        className="border rounded-2xl bg-[#FF8087] px-6 py-2 mt-[50px]"
        onClick={handleClik} disabled={!isFormValid}
      >
        Iniciar
      </button>
      <Analytics />
    </main>
  );
}
