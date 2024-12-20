export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=postLikes`
  ).then((res) => res.json());
};

export const getOnePostById = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`).then((response) =>
    response.json()
  );
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

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = (post) => {
  return fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};
