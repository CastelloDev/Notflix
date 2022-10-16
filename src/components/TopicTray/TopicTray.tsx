import TopicItem from "components/TopicItem/TopicItem";
import { Topic } from "models/topic";
import { useState } from "react";
import "./index.css";

interface Props {
  topics: Topic[];
}

function TopicTray({ topics }: Props) {
  const [selectedTopic, setSelectedTopic] = useState(
    topics?.length > 0 ? topics[0].id : null
  );
  return (
    <div className="topic-tray">
      {topics.map((topic) => (
        <TopicItem
          key={topic.id}
          item={topic}
          selected={selectedTopic === topic.id}
          setSelectedTopic={(topicId) => setSelectedTopic(topicId)}
        />
      ))}
    </div>
  );
}

export default TopicTray;
