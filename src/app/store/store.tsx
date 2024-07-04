import { create } from 'zustand'

type store = {
    name: string
    genre: 'Masculino' | 'Femenino' | ''
    setName: (input: string) => void
    setGenre: (input: string) => void

}

export const useStoreGame  = create<store>((set)=> ({
    name: '',
    genre: '',

    setName: (selection: any) => set(state => ({ ...state, name: selection })),
    setGenre: (selection: any) => set(state => ({ ...state, genre: selection })),
    
}))