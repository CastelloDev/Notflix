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
      getImagesForTopic(selectedTopic, currentPage);

      if (currentPage === 1) {
        innerTray.current.scrollLeft = 0;
      } else {
        innerTray.current.scrollLeft =
          (innerTray.current.scrollWidth - innerTray.current.offsetWidth) / 2;
      }
    }
  }, [selectedTopic, getImagesForTopic, currentPage]);

  const setImageRefs = useBoundStore((state) => state.setImageRefs);
  const imageRefs = useRef([]);
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length);
    setImageRefs(imageRefs);
  }, [images]);

  const setLeftNavRef = useBoundStore((state) => state.setLeftNavRef);
  const setRightNavRef = useBoundStore((state) => state.setRightNavRef);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  useEffect(() => {
    setLeftNavRef(leftNavRef);
    setRightNavRef(rightNavRef);
  }, []);

  const navLeftClassNames = classNames("nav left", {
    hidden: currentPage === 1,
  });

  return (
    <div className="gallery-tray">
      <div className={navLeftClassNames} onClick={navBack} ref={leftNavRef}>
        <div className="arrow-left"></div>
      </div>
      <div className="gallery-tray-inner" ref={innerTray}>
        {images.map((image, i) => (
          <GalleryItem
            key={image.id}
            item={image}
            references={imageRefs}
            referenceIndex={i}
          />
        ))}
      </div>
      <div className="nav right" onClick={navNext} ref={rightNavRef}>
        <div className="arrow-right"></div>
      </div>
    </div>
  );
};

export default GalleryTray;
