import { Topic } from "models/topic";
import classNames from "classnames";
import { useBoundStore } from "store/useBoundStore";
import "./index.css";

interface Props {
  item: Topic;
}

const TopicItem = ({ item }: Props) => {
  const selectedTopic = useBoundStore((state) => state.selectedTopic);
  const selectTopic = useBoundStore((state) => state.selectTopic);

  const selected = selectedTopic?.id === item.id;
  const rootClassNames = classNames("topic-item", { selected: selected });

  return (
    <div className={rootClassNames} onClick={() => selectTopic(item)}>
      {item.title}
    </div>
  );
};

export default TopicItem;
