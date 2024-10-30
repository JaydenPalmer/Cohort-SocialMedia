export const getLikes = () => {
  return fetch("http://localhost:8088/postLikes").then((res) => res.json());
};

export const sendLike = (postId, currentUserId) => {
  console.log("post sent");
  const passTheLike = {
    userId: currentUserId,
    postId: postId,
  };

  return fetch("http://localhost:8088/postLikes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passTheLike),
  }).then((res) => res.json());
};
