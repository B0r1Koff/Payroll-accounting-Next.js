import { create } from "zustand"

const userStore = create((set) => ({
 user: null,
 setUser: () => set(() => ({ user: JSON.parse(localStorage.getItem('loggedUser')) })),
 resetUser: () => set({ user: null })
}))

export default userStore