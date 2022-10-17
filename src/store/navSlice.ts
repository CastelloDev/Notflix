import { NavRef, Refs } from "models/navRef";
import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

export interface NavState {
  prevPage: number;
  currentPage: number;
  currentRef: NavRef;
  navBack: () => void;
  navNext: () => void;

  refs: Refs;
  setCurrentRef: (ref: NavRef) => void;
  setTopicRefs: (topicRefs: React.MutableRefObject<any>) => void;
  setImageRefs: (imageRefs: React.MutableRefObject<any>) => void;
  setLeftNavRef: (leftNavRef: React.MutableRefObject<any>) => void;
  setRightNavRef: (rightNavRef: React.MutableRefObject<any>) => void;

  handleLeft: () => void;
  handleRight: () => void;
  handleUp: () => void;
  handleDown: () => void;
}

export const createNavSlice: StateCreator<
  BoundSliceStates,
  [],
  [],
  NavState
> = (set, get) => ({
  prevPage: 1,
  currentPage: 1,
  currentRef: null,
  navBack: () =>
    set((state) => ({
      ...state,
      currentPage: state.currentPage - 1,
      prevPage: state.currentPage,
    })),
  navNext: () =>
    set((state) => ({
      ...state,
      currentPage: state.currentPage + 1,
      prevPage: state.currentPage,
    })),

  refs: null,
  setCurrentRef: (ref) => {
    set((state) => ({
      ...state,
      currentRef: ref,
    }));
  },
  setTopicRefs: (topicRefs) => {
    set((state) => ({
      ...state,
      refs: { ...state.refs, topicRefs },
    }));
  },
  setImageRefs: (imageRefs) =>
    set((state) => ({
      ...state,
      refs: { ...state.refs, imageRefs },
    })),
  setLeftNavRef: (leftNavRef) =>
    set((state) => ({
      ...state,
      refs: { ...state.refs, leftNavRef },
    })),
  setRightNavRef: (rightNavRef) =>
    set((state) => ({
      ...state,
      refs: { ...state.refs, rightNavRef },
    })),

  handleLeft: () => {
    const refs = get().refs;
    const currentPage = get().currentPage;
    const currentRef = get().currentRef;
    const newRef = currentRef.left(refs, currentPage);
    if (newRef !== currentRef) {
      set((state) => ({ ...state, currentRef: newRef }));
    }
  },
  handleRight: () => {
    const refs = get().refs;
    const currentPage = get().currentPage;
    const currentRef = get().currentRef;
    const newRef = currentRef.right(refs, currentPage);
    if (newRef !== currentRef) {
      set((state) => ({ ...state, currentRef: newRef }));
    }
  },
  handleUp: () => {
    const refs = get().refs;
    const currentPage = get().currentPage;
    const currentRef = get().currentRef;
    const newRef = currentRef.up(refs, currentPage);
    if (newRef !== currentRef) {
      set((state) => ({ ...state, currentRef: newRef }));
    }
  },
  handleDown: () => {
    const refs = get().refs;
    const currentPage = get().currentPage;
    const currentRef = get().currentRef;
    const newRef = currentRef.down(refs, currentPage);
    if (newRef !== currentRef) {
      set((state) => ({ ...state, currentRef: newRef }));
    }
  },
});
