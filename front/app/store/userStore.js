import { create } from "zustand"

const userStore = create((set) => ({
 role: "",
 set: (role) => set(() => ({ role: role })),
 reset: () => set({ count: 0 })
}))

export default userStore