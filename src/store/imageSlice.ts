import { Image } from "models/images";
import { Topic } from "models/topic";
import { getImagesForTopic } from "services/topicService";
import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

export interface ImageState {
  images: Image[];
  selectedImage: Image;
  selectImage: (image: Image) => void;
  getImagesForTopic: (
    topic: Topic,
    pageNumber?: number,
    pageSize?: number
  ) => void;
}

export const createImageSlice: StateCreator<
  BoundSliceStates,
  [],
  [],
  ImageState
> = (set) => ({
  images: [],
  selectedImage: null,
  selectImage: (selectedImage) => set((state) => ({ ...state, selectedImage })),
  getImagesForTopic: async (topic, pageNumber, pageSize) => {
    // TODO: optimise to cache results
    const images = await getImagesForTopic(topic.slug, pageNumber, pageSize);
    set((state) => ({ images, selectedImage: images[0] }));
  },
});
