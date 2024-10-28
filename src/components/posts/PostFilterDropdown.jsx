export const PostFilterDropdown = ({ topic, setSelectedTopicId }) => {
  const handleTopicFilter = (event) => {
    const selectedTopicId = parseInt(event.target.value);
    setSelectedTopicId(selectedTopicId);
  };
  return (
    <div className="dropdown">
      <select onChange={handleTopicFilter}>
        <option value={0}>All Topics</option>
        {topic.map((topicObj) => (
          <option
            className="dropdown-content"
            key={topicObj.id}
            value={topicObj.id}
          >
            {topicObj.name}
          </option>
        ))}
      </select>
    </div>
  );
};
