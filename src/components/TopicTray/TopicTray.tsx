import TopicItem from "components/TopicItem/TopicItem";
import { useBoundStore } from "store/useBoundStore";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import "./index.css";

function TopicTray() {
  const topics = useBoundStore((state) => state.topics);
  const currentPage = useBoundStore((state) => state.currentPage);
  const topicTrayClassNames = classNames("topic-tray", {
    hidden: currentPage !== 1,
  });

  const setTopicRefs = useBoundStore((state) => state.setTopicRefs);
  const setCurrentRef = useBoundStore((state) => state.setCurrentRef);
  const topicRefs = useRef([]);
  useEffect(() => {
    topicRefs.current = topicRefs.current.slice(0, topics.length);
    setTopicRefs(topicRefs);
    setCurrentRef(topicRefs.current[0]);
  }, [topics]);

  return (
    <div className={topicTrayClassNames}>
      {topics.map((topic, i) => (
        <TopicItem
          key={topic.id}
          item={topic}
          references={topicRefs}
          referenceIndex={i}
        />
      ))}
    </div>
  );
}

export default TopicTray;
