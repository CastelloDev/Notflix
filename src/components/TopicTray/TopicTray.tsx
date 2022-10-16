import TopicItem from "components/TopicItem/TopicItem";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

function TopicTray() {
  const topics = useBoundStore((state) => state.topics);

  return (
    <div className="topic-tray">
      {topics.map((topic) => (
        <TopicItem key={topic.id} item={topic} />
      ))}
    </div>
  );
}

export default TopicTray;
