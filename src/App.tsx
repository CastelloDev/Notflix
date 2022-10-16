import GalleryDisplay from "components/GalleryDisplay/GalleryDisplay";
import GalleryTray from "components/GalleryTray/GalleryTray";
import Header from "components/Header/Header";
import TopicTray from "components/TopicTray/TopicTray";
import { useEffect, useState } from "react";
import { getTopics } from "services/topicService";
import "./App.css";

const App = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics()
      .then((resp) => setTopics(resp))
      .catch((err) => console.error(err));
  }, []);

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
