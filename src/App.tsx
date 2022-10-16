import GalleryDisplay from "components/GalleryDisplay/GalleryDisplay";
import GalleryTray from "components/GalleryTray/GalleryTray";
import Header from "components/Header/Header";
import TopicTray from "components/TopicTray/TopicTray";
import { useEffect } from "react";
import { useBoundStore } from "store/useBoundStore";
import "./App.css";

const App = () => {
  const getTopics = useBoundStore((state) => state.getTopics);
  const topics = useBoundStore((state) => state.topics);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  return (
    <div className="App">
      <Header />
      <TopicTray topics={topics} />
      <GalleryTray />
      <GalleryDisplay />
    </div>
  );
};

export default App;
