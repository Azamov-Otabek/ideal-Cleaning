import {create} from "zustand";

const serviceDataStore = create((set) => ({
    dataAllDelete: [],
    pushData: (data:any) => set((state:any) => ({ dataAllDelete: state.dataAllDelete})),
}))

export default serviceDataStore;