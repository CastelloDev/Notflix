import { Image } from "models/images";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

interface Props {
  item: Image;
  references: React.MutableRefObject<any>;
  referenceIndex: number;
}

const GalleryItem = ({ item, references, referenceIndex }: Props) => {
  const selectImage = useBoundStore((state) => state.selectImage);

  return (
    <div
      className="gallery-item"
      onClick={() => selectImage(item)}
      ref={(el) => (references.current[referenceIndex] = el)}
    >
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
