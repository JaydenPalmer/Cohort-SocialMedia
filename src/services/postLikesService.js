export const getLikes = () => {
  return fetch("http://localhost:8088/postLikes").then((res) => res.json());
};

export const sendLike = () => {
  return fetch("http://localhost:8088/postLikes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then((res) => res.json());
};
