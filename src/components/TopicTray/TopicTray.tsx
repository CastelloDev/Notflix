import TopicItem from "components/TopicItem/TopicItem";
import { Topic } from "models/topic";
import "./index.css";

interface Props {
  topics: Topic[];
}

function TopicTray({ topics }: Props) {
  return (
    <div className="topic-tray">
      {topics.map((topic) => (
        <TopicItem key={topic.id} item={topic} />
      ))}
    </div>
  );
}

export default TopicTray;
