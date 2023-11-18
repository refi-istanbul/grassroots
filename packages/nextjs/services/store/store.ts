import { create } from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TGlobalState = {
  userWallet: string;
  setUserWallet: (newUserWallet: string) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  userWallet: "",
  setUserWallet: (newUserWallet: string): void => set(() => ({ userWallet: newUserWallet })),
}));
