export interface Refs {
  topicRefs: React.MutableRefObject<any>;
  imageRefs: React.MutableRefObject<any>;
  leftNavRef: React.MutableRefObject<any>;
  rightNavRef: React.MutableRefObject<any>;
}

export interface NavRef {
  ref: any;
  up: (refs: Refs, currentPage?: number) => NavRef;
  down: (refs: Refs, currentPage?: number) => NavRef;
  left: (refs: Refs, currentPage?: number) => NavRef;
  right: (refs: Refs, currentPage?: number) => NavRef;
  click: (refs?: Refs, currentPage?: number) => void;
  setRefStyle: (previousRef: NavRef, nextRef: NavRef) => void;
}

export class BaseNavRef implements NavRef {
  ref: any;
  constructor(ref) {
    this.ref = ref;
  }

  setRefStyle = (previousRef: NavRef, nextRef: NavRef) => {
    previousRef.ref.classList.remove("nav-selected");
    nextRef.ref.classList.add("nav-selected");
  };

  up = (refs: Refs, currentPage: number): NavRef => this;
  down = (refs: Refs, currentPage: number): NavRef => this;
  left = (refs: Refs, currentPage: number): NavRef => this;
  right = (refs: Refs, currentPage: number): NavRef => this;
  click = (refs: Refs, currentPage: number) => {
    this.ref.click();
  };
}

export class ImageRef extends BaseNavRef {
  up = (refs: Refs) => {
    const imageRefs = refs.imageRefs.current;
    const index = imageRefs.findIndex((ir) => ir === this.ref);
    if (index !== -1 && index % 2 === 1) {
      const nextRef = new ImageRef(imageRefs[index - 1]);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }
    return this;
  };
  down = (refs: Refs) => {
    const imageRefs = refs.imageRefs.current;
    const index = imageRefs.findIndex((ir) => ir === this.ref);
    if (index !== -1 && index % 2 === 0) {
      const nextRef = new ImageRef(imageRefs[index + 1]);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }
    return this;
  };
  left = (refs: Refs, currentPage: number) => {
    const imageRefs = refs.imageRefs.current;
    const index = imageRefs.findIndex((ir) => ir === this.ref);
    const lowerBound = currentPage === 1 ? 2 : 4;
    if (index < lowerBound) {
      const nextRef =
        currentPage === 1
          ? new TopicRef(refs.topicRefs.current[0])
          : new LeftNavRef(refs.leftNavRef.current);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }

    const nextRef = new ImageRef(refs.imageRefs.current[index - 2]);
    this.setRefStyle(this, nextRef);
    return nextRef;
  };
  right = (refs: Refs) => {
    const imageRefs = refs.imageRefs.current;
    const index = imageRefs.findIndex((ir) => ir === this.ref);
    const upperBound = imageRefs.length - 4;
    if (index >= upperBound) {
      const nextRef = new RightNavRef(refs.rightNavRef.current);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }

    const nextRef = new ImageRef(refs.imageRefs.current[index + 2]);
    this.setRefStyle(this, nextRef);
    return nextRef;
  };
}

export class LeftNavRef extends BaseNavRef {
  right = (refs: Refs, currentPage: number) => {
    const imageIndex = 2;
    const nextRef = new ImageRef(refs.imageRefs.current[imageIndex]);
    this.setRefStyle(this, nextRef);
    return nextRef;
  };
}

export class RightNavRef extends BaseNavRef {
  left = (refs: Refs, currentPage: number) => {
    const imageRefs = refs.imageRefs.current;
    const imageIndex = imageRefs.length - 4;
    const nextRef = new ImageRef(refs.imageRefs.current[imageIndex]);
    this.setRefStyle(this, nextRef);
    return nextRef;
  };
}

export class TopicRef extends BaseNavRef {
  up = (refs: Refs) => {
    const topicRefs = refs.topicRefs.current;
    const index = topicRefs.findIndex((tr) => tr === this.ref);
    if (index !== -1 && index !== 0) {
      const nextRef = new TopicRef(topicRefs[index - 1]);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }
    return this;
  };
  down = (refs: Refs) => {
    const topicRefs = refs.topicRefs.current;
    const index = topicRefs.findIndex((tr) => tr === this.ref);
    if (index !== -1 && index + 1 !== topicRefs.length) {
      const nextRef = new TopicRef(topicRefs[index + 1]);
      this.setRefStyle(this, nextRef);
      return nextRef;
    }
    return this;
  };
  right = (refs: Refs) => {
    const nextRef = new ImageRef(refs.imageRefs.current[0]);
    this.setRefStyle(this, nextRef);
    return nextRef;
  };
}
