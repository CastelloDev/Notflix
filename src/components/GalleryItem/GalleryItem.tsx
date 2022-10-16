import { Image } from "models/images";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

interface Props {
  item: Image;
}

const GalleryItem = ({ item }: Props) => {
  const selectImage = useBoundStore((state) => state.selectImage);

  return (
    <div className="gallery-item" onClick={() => selectImage(item)}>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        width={"auto"}
        height={"100%"}
        draggable={false}
      ></img>
    </div>
  );
};

export default GalleryItem;
