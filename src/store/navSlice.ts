import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

const isTopicRef = (ref) => ref.classList.contains("topic-item");
const isImageRef = (ref) => ref.classList.contains("gallery-item");
const isLeftNavRef = (ref) =>
  ref.classList.contains("nav") && ref.classList.contains("left");
const isRightNavRef = (ref) =>
  ref.classList.contains("nav") && ref.classList.contains("right");

const setRefStyle = (previousRef, nextRef) => {
  previousRef.classList.remove("nav-selected");
  nextRef.classList.add("nav-selected");
};

interface Refs {
  topicRefs: React.MutableRefObject<any>;
  imageRefs: React.MutableRefObject<any>;
  leftNavRef: React.MutableRefObject<any>;
  rightNavRef: React.MutableRefObject<any>;
}
export interface NavState {
  currentPage: number;
  currentRef: any;
  navBack: () => void;
  navNext: () => void;

  refs: Refs;
  setCurrentRef: (ref: any) => void;
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
> = (set) => ({
  currentPage: 1,
  currentRef: null,
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

  refs: null,
  setCurrentRef: (ref) =>
    set((state) => ({
      ...state,
      currentRef: ref,
    })),
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
    set((state) => {
      switch (true) {
        case isImageRef(state.currentRef): {
          const imageRefs = state.refs.imageRefs.current;
          const index = imageRefs.findIndex((ir) => ir === state.currentRef);
          const lowerBound = state.currentPage === 1 ? 2 : 4;
          if (index < lowerBound) {
            const nextRef =
              state.currentPage === 1
                ? state.refs.topicRefs.current[0]
                : state.refs.leftNavRef.current;
            setRefStyle(state.currentRef, nextRef);
            return { ...state, currentRef: nextRef };
          }

          const nextRef = state.refs.imageRefs.current[index - 2];
          setRefStyle(state.currentRef, nextRef);
          return { ...state, currentRef: nextRef };
        }
        case isRightNavRef(state.currentRef): {
          const imageIndex = state.currentPage === 1 ? 4 : 6;
          const nextRef = state.refs.imageRefs.current[imageIndex];
          setRefStyle(state.currentRef, nextRef);
          return { ...state, currentRef: nextRef };
        }

        default:
          break;
      }
      return { ...state };
    });
  },
  handleRight: () => {
    set((state) => {
      switch (true) {
        case isTopicRef(state.currentRef): {
          const nextRef = state.refs.imageRefs.current[0];
          setRefStyle(state.currentRef, nextRef);
          return { ...state, currentRef: nextRef };
        }
        case isImageRef(state.currentRef): {
          const imageRefs = state.refs.imageRefs.current;
          const index = imageRefs.findIndex((ir) => ir === state.currentRef);
          const upperBound = state.currentPage === 1 ? 4 : 6;
          if (index >= upperBound) {
            const nextRef = state.refs.rightNavRef.current;
            setRefStyle(state.currentRef, nextRef);
            return { ...state, currentRef: nextRef };
          }

          const nextRef = state.refs.imageRefs.current[index + 2];
          setRefStyle(state.currentRef, nextRef);
          return { ...state, currentRef: nextRef };
        }

        default:
          break;
      }
      return { ...state };
    });
  },
  handleUp: () => {
    set((state) => {
      switch (true) {
        case isTopicRef(state.currentRef): {
          const topicRefs = state.refs.topicRefs.current;
          const index = topicRefs.findIndex((tr) => tr === state.currentRef);
          if (index !== -1 && index !== 0) {
            const nextRef = topicRefs[index - 1];
            setRefStyle(state.currentRef, nextRef);
            return {
              ...state,
              currentRef: nextRef,
            };
          }
          break;
        }
        case isImageRef(state.currentRef): {
          const imageRefs = state.refs.imageRefs.current;
          const index = imageRefs.findIndex((ir) => ir === state.currentRef);
          if (index !== -1 && index % 2 === 1) {
            const nextRef = imageRefs[index - 1];
            setRefStyle(state.currentRef, nextRef);
            return {
              ...state,
              currentRef: nextRef,
            };
          }
          break;
        }

        default:
          break;
      }
      return state;
    });
  },
  handleDown: () => {
    set((state) => {
      switch (true) {
        case isTopicRef(state.currentRef): {
          const topicRefs = state.refs.topicRefs.current;
          const index = topicRefs.findIndex((tr) => tr === state.currentRef);
          if (index !== -1 && index + 1 !== topicRefs.length) {
            const nextRef = topicRefs[index + 1];
            setRefStyle(state.currentRef, nextRef);
            return {
              ...state,
              currentRef: nextRef,
            };
          }
          break;
        }
        case isImageRef(state.currentRef): {
          const imageRefs = state.refs.imageRefs.current;
          const index = imageRefs.findIndex((ir) => ir === state.currentRef);
          if (index !== -1 && index % 2 === 0) {
            const nextRef = imageRefs[index + 1];
            setRefStyle(state.currentRef, nextRef);
            return {
              ...state,
              currentRef: nextRef,
            };
          }
          break;
        }

        default:
          break;
      }
      return state;
    });
  },
});
