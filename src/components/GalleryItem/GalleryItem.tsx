import { Image } from "models/images";
import "./index.css";

interface Props {
  item: Image;
}

const GalleryItem = ({ item }: Props) => {
  return (
    <div className="gallery-item">
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
