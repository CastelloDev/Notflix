import GalleryTray from "components/GalleryTray/GalleryTray";
import Header from "components/Header/Header";
import TopicTray from "components/TopicTray/TopicTray";
import { useEffect } from "react";
import { useBoundStore } from "store/useBoundStore";
import "./App.css";

const App = () => {
  const getTopics = useBoundStore((state) => state.getTopics);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const currentRef = useBoundStore((state) => state.currentRef);
  const currentPage = useBoundStore((state) => state.currentPage);
  const setCurrentRef = useBoundStore((state) => state.setCurrentRef);
  const refs = useBoundStore((state) => state.refs);
  const handleLeft = useBoundStore((state) => state.handleLeft);
  const handleRight = useBoundStore((state) => state.handleRight);
  const handleUp = useBoundStore((state) => state.handleUp);
  const handleDown = useBoundStore((state) => state.handleDown);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowDown":
          handleDown();
          break;
        case "ArrowLeft":
          handleLeft();
          break;
        case "ArrowRight":
          handleRight();
          break;
        case "ArrowUp":
          handleUp();
          break;
        case "Enter":
          currentRef.click();
          if (currentRef === refs.leftNavRef.current && currentPage === 2) {
            setCurrentRef(refs.topicRefs.current[0]);
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleDown,
    handleLeft,
    handleRight,
    handleUp,
    setCurrentRef,
    currentRef,
    refs,
    currentPage,
  ]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <TopicTray />
        <GalleryTray />
      </div>
    </div>
  );
};

export default App;
