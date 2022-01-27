import { atom } from "recoil";

export interface ICoinAtom {
  id?: string | undefined;
  name?: string | undefined;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const selectedCoin = atom<ICoinAtom>({
  key: "selectCoin",
  default: {
    id: "",
    name: "",
  },
});
