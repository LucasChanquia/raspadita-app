import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type Store = {
  name: string;
  genre: "Masculino" | "Femenino" | "";
  setName: (input: string) => void;
  setGenre: (input: string) => void;
};

type MyPersist = (
  config: (set: any, get: any, api: any) => Store,
  options: PersistOptions<Store>
) => (set: any, get: any, api: any) => Store;

export const useStoreGame = create<Store>(
  (persist as MyPersist)(
    (set) => ({
      name: "",
      genre: "",

      setName: (selection: string) =>
        set((state: any) => ({ ...state, name: selection })),
      setGenre: (selection: any) =>
        set((state: any) => ({ ...state, genre: selection })),
    }),
    {
      name: "game-store", // Nombre de la clave en localStorage
      getStorage: () => localStorage, // Especificar que use localStorage
    }
  )
);