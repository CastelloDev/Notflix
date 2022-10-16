import GalleryItem from "components/GalleryItem/GalleryItem";
import { useEffect, useRef } from "react";
import { useBoundStore } from "store/useBoundStore";
import classNames from "classnames";
import "./index.css";

const GalleryTray = () => {
  const images = useBoundStore((state) => state.images);
  const getImagesForTopic = useBoundStore((state) => state.getImagesForTopic);
  const selectedTopic = useBoundStore((state) => state.selectedTopic);
  const navBack = useBoundStore((state) => state.navBack);
  const navNext = useBoundStore((state) => state.navNext);
  const currentPage = useBoundStore((state) => state.currentPage);

  const innerTray = useRef(null);

  useEffect(() => {
    if (selectedTopic) {
      const pageSize = currentPage === 1 ? 8 : 10;
      getImagesForTopic(selectedTopic, currentPage, pageSize);
      if (currentPage === 1) {
        innerTray.current.scrollLeft = 0;
      } else {
        innerTray.current.scrollLeft =
          (innerTray.current.scrollWidth - innerTray.current.offsetWidth) / 2;
      }
    }
  }, [selectedTopic, getImagesForTopic, currentPage]);

  const navLeftClassNames = classNames("nav left", {
    hidden: currentPage === 1,
  });

  return (
    <div className="gallery-tray">
      <div className={navLeftClassNames} onClick={navBack}>
        <div className="arrow-left"></div>
      </div>
      <div className="gallery-tray-inner" ref={innerTray}>
        {images.map((image, i) => (
          <GalleryItem key={image.id} item={image} />
        ))}
      </div>
      <div className="nav right" onClick={navNext}>
        <div className="arrow-right"></div>
      </div>
    </div>
  );
};

export default GalleryTray;
