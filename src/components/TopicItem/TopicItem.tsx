import { Topic } from "models/topic";
import classNames from "classnames";
import "./index.css";

interface Props {
  item: Topic;
  selected: Boolean;
  setSelectedTopic: (topicId: string) => void;
}

const TopicItem = ({ item, selected, setSelectedTopic }: Props) => {
  const rootClassNames = classNames("topic-item", { selected: selected });
  return (
    <div className={rootClassNames} onClick={() => setSelectedTopic(item.id)}>
      {item.title}
    </div>
  );
};

export default TopicItem;
