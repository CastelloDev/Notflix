import Spinner from "components/Spinner/Spinner";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

const GalleryDisplay = () => {
  const selectedImage = useBoundStore((state) => state.selectedImage);

  if (!selectedImage) {
    return <Spinner />;
  }
  return (
    <div className="gallery-display">
      <img
        src={selectedImage.urls.raw}
        alt={selectedImage.alt_description}
        draggable={false}
      ></img>
    </div>
  );
};

export default GalleryDisplay;
