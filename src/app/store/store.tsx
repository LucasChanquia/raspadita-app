import { create } from 'zustand'

type store = {
    name: string
    setName: (input: string) => void

}

export const useStoreGame  = create<store>((set)=> ({
    name: '',

    setName: (selection: any) => set(state => ({ ...state, name: selection })),
}))