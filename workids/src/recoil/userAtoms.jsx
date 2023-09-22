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
    userName: "",
    userNumber: "", // 학생, 선생 번호
    userType: "",
    nationNum: "", // 나라 번호
    nationName: "",
    nationStudentNum: "", // 나라학생 번호
    code: "", // 나라 코드
    moneyName: "", // 나라 화폐
  },
  effects_UNSTABLE: [persistAtom],
});
