import create from "zustand";
import { createImageSlice, ImageState } from "./imageSlice";
import { createNavSlice, NavState } from "./navSlice";
import { createTopicSlice, TopicState } from "./topicSlice";

export type BoundSliceStates = ImageState & TopicState & NavState;

export const useBoundStore = create<BoundSliceStates>()((...a) => ({
  ...createImageSlice(...a),
  ...createTopicSlice(...a),
  ...createNavSlice(...a),
}));
