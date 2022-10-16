import GalleryItem from "components/GalleryItem/GalleryItem";
import { useEffect } from "react";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

const GalleryTray = () => {
  const images = useBoundStore((state) => state.images);
  const getImagesForTopic = useBoundStore((state) => state.getImagesForTopic);
  const selectedTopic = useBoundStore((state) => state.selectedTopic);

  useEffect(() => {
    if (selectedTopic) {
      getImagesForTopic(selectedTopic);
    }
  }, [selectedTopic, getImagesForTopic]);

  return (
    <div className="gallery-tray">
      {images.map((image) => (
        <GalleryItem key={image.id} item={image} />
      ))}
    </div>
  );
};

export default GalleryTray;
