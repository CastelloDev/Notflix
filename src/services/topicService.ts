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
      switch (topicSlug) {
        case `food-drink`:
          resolve(foodDrink);
          break;
        case "current-events":
          resolve(currentEvents);
          break;
        case "wallpapers":
          resolve(wallpapers);
          break;
        case "3d-renders":
          resolve(threeDRenders);
          break;
        case "textures-patterns":
          resolve(texturesPatterns);
          break;
        case "experimental":
          resolve(experimental);
          break;
        case "architecture":
          resolve(architecture);
          break;
        case "nature":
          resolve(nature);
          break;
        case "business-work":
          resolve(businessWork);
          break;
        case "fashion":
          resolve(fashion);
          break;
        default:
          resolve([]);
          break;
      }
    });
  }
  const resp = await unsplashClient.get(
    `/topics/${topicSlug}/photos?per_page=${pageSize}&page=${pageNumber}`
  );
  return resp.data;
};
