export const PostFilterDropdown = ({ topic, setSelectedTopicId, value }) => {
  const handleTopicFilter = (event) => {
    const selectedTopicId = parseInt(event.target.value);
    setSelectedTopicId(selectedTopicId);
  };
  return (
    <div className="dropdown">
      <select value={value} onChange={handleTopicFilter}>
        <option value={0}>All Topics</option>
        {topic.map((topicObj) => (
          <option key={topicObj.id} value={topicObj.id}>
            {topicObj.name}
          </option>
        ))}
      </select>
    </div>
  );
};
