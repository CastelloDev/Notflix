import create from "zustand";
import { createImageSlice, ImageState } from "./imageSlice";
import { createTopicSlice, TopicState } from "./topicSlice";

export type BoundSliceStates = ImageState & TopicState;

export const useBoundStore = create<BoundSliceStates>()((...a) => ({
  ...createImageSlice(...a),
  ...createTopicSlice(...a),
}));
