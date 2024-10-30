export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=postLikes`
  ).then((res) => res.json());
};

export const sendPost = (selectedTopicId, currentUserId, body, title, date) => {
  const passThePost = {
    title: title,
    body: body,
    created: date.toLocaleDateString(),
    userId: currentUserId,
    topicId: selectedTopicId,
  };

  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passThePost),
  }).then((res) => res.json());
};
