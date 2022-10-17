import { unsplashClient } from "./axiosClient";
import { Topic } from "models/topic";
import { Image } from "models/images";
import {
  architecture,
  businessWork,
  currentEvents,
  experimental,
  fashion,
  foodDrink,
  nature,
  texturesPatterns,
  threeDRenders,
  topics,
  wallpapers,
} from "data";

const IS_DEV = process.env.REACT_APP_IS_DEV ?? "false";
const isDevMode = IS_DEV === "true";

export const getTopics = async (): Promise<Topic[]> => {
  if (isDevMode) {
    // TODO: implement dynamic imports here to optimize code splitting
    return new Promise((resolve) => resolve(topics));
  }
  const resp = await unsplashClient.get(`/topics`);
  return resp.data;
};

export const getImagesForTopic = async (
  topicSlug: string = "",
  pageNumber = 1,
  pageSize = 8
): Promise<Image[]> => {
  if (isDevMode) {
    // TODO: implement dynamic imports here to optimize code splitting
    return new Promise((resolve, reject) => {
      let result = [];
      switch (topicSlug) {
        case `food-drink`:
          result = foodDrink;
          break;
        case "current-events":
          result = currentEvents;
          break;
        case "wallpapers":
          result = wallpapers;
          break;
        case "3d-renders":
          result = threeDRenders;
          break;
        case "textures-patterns":
          result = texturesPatterns;
          break;
        case "experimental":
          result = experimental;
          break;
        case "architecture":
          result = architecture;
          break;
        case "nature":
          result = nature;
          break;
        case "business-work":
          result = businessWork;
          break;
        case "fashion":
          result = fashion;
          break;
        default:
          result = [];
          break;
      }
      const paginatedResult = result.slice(
        (pageNumber - 1) * pageSize,
        pageSize + 1
      );
      resolve(paginatedResult);
    });
  }
  const resp = await unsplashClient.get(
    `/topics/${topicSlug}/photos?per_page=${pageSize}&page=${pageNumber}`
  );
  return resp.data;
};
