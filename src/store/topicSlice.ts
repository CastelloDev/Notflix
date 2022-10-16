import { Topic } from "models/topic";
import { getTopics } from "services/topicService";
import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

export interface TopicState {
  topics: Topic[];
  selectedTopic: Topic;
  selectTopic: (topic: Topic) => void;
  getTopics: () => void;
}

export const createTopicSlice: StateCreator<
  BoundSliceStates,
  [],
  [],
  TopicState
> = (set) => ({
  topics: [],
  selectedTopic: null,
  selectTopic: (topic) => set((state) => ({ ...state, selectedTopic: topic })),
  getTopics: async () => {
    // TODO: optimise to build cache on results
    const topics = await getTopics();
    set((state) => ({ topics }));
  },
});
