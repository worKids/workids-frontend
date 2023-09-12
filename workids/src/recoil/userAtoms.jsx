import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const userState = atom({
  key: "userState",
  default: {
    accessToken: "",
    id: "",
    password: "",
    userType: "",
  },
  effects_UNSTABLE: [persistAtom],
});
