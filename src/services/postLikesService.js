export const getLikes = () => {
  return fetch("http://localhost:8088/postLikes").then((res) => res.json());
};
