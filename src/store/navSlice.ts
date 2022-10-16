import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

export interface NavState {
  currentPage: number;
  navBack: () => void;
  navNext: () => void;
}

export const createNavSlice: StateCreator<
  BoundSliceStates,
  [],
  [],
  NavState
> = (set) => ({
  currentPage: 1,
  navBack: () =>
    set((state) => ({
      ...state,
      currentPage: state.currentPage - 1,
    })),
  navNext: () =>
    set((state) => ({
      ...state,
      currentPage: state.currentPage + 1,
    })),
});
