import GalleryDisplay from "./components/GalleryDisplay/GalleryDisplay";
import GalleryTray from "./components/GalleryTray/GalleryTray";
import Header from "./components/Header/Header";
import TopicTray from "./components/TopicTray/TopicTray";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <TopicTray />
      <GalleryTray />
      <GalleryDisplay />
    </div>
  );
};

export default App;
