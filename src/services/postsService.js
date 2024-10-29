export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=postLikes`
  ).then((res) => res.json());
};
