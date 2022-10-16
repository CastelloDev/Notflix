import TopicItem from "components/TopicItem/TopicItem";
import { useBoundStore } from "store/useBoundStore";
import classNames from "classnames";
import "./index.css";

function TopicTray() {
  const topics = useBoundStore((state) => state.topics);
  const currentPage = useBoundStore((state) => state.currentPage);
  const topicTrayClassNames = classNames("topic-tray", {
    hidden: currentPage !== 1,
  });
  return (
    <div className={topicTrayClassNames}>
      {topics.map((topic) => (
        <TopicItem key={topic.id} item={topic} />
      ))}
    </div>
  );
}

export default TopicTray;
