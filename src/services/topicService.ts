import { unsplashClient } from "./axiosClient";
import { Topic } from "models/topic";
import topics from "data/topics.json";

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
