import { Image } from "models/images";
import { Topic } from "models/topic";
import { getImagesForTopic } from "services/topicService";
import { StateCreator } from "zustand";
import { BoundSliceStates } from "./useBoundStore";

export interface ImageState {
  images: Image[];
  selectedImage: Image;
  selectImage: (image: Image) => void;
  getImagesForTopic: (topic: Topic, pageNumber?: number) => void;
}

export const createImageSlice: StateCreator<
  BoundSliceStates,
  [],
  [],
  ImageState
> = (set, get) => ({
  images: [],
  selectedImage: null,
  selectImage: (selectedImage) => set((state) => ({ ...state, selectedImage })),
  getImagesForTopic: async (topic, pageNumber) => {
    // TODO: optimise to cache results
    const currentPage = get().currentPage;
    const prevPage = get().prevPage;
    let images = [];
    const pageSize = 6;
    const pageNext = 2;
    if (currentPage === 1) {
      images = await getImagesForTopic(topic.slug, pageNumber, pageSize);
      set((state) => ({ ...state, images, selectedImage: images[0] }));
    } else {
      if (currentPage > prevPage) {
        // Click right
        images = await getImagesForTopic(
          topic.slug,
          pageSize / pageNext + pageNumber,
          pageNext
        );
        set((state) => {
          const prevImagesWithoutFirstPage =
            currentPage === 2 ? state.images : state.images.slice(pageNext);
          const updatedImages = [...prevImagesWithoutFirstPage, ...images];
          return {
            ...state,
            images: updatedImages,
            selectedImage: updatedImages[2],
          };
        });
      } else {
        // Click left
        images = await getImagesForTopic(topic.slug, pageNumber - 1, pageNext);

        set((state) => {
          const prevImagesWithoutLastPage = state.images.slice(
            0,
            state.images.length - pageNext
          );
          const updatedImages = [...images, ...prevImagesWithoutLastPage];
          return {
            ...state,
            images: updatedImages,
            selectedImage: updatedImages[2],
          };
        });
      }
    }
  },
});
