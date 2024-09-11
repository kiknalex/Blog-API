import db from ".";

const postTitle = "Lorem Ipsum Title";
const postContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic";

const commentContent = "Wow such an inspiring post!";

const userId = 1000;
const username = "testuser";
const password = "$2a$10$SEcUwUMcFOZaWSODFDFhJeGVsXbdFlb1IL1Ai4qsmmoOZwr5Z9xnS"; // 12345678

const main = async () => {
  console.log("Populating DB...");
  try {
    await db.user.create({
      data: {
        username: username,
        password: password,
        id: userId,
      },
    });
    for (let i = 0; i < 3; i++) {
      await db.post.create({
        data: {
          id: i + 1,
          title: postTitle,
          content: postContent,
          authorId: userId,
        },
      });
      for (let j = 0; j < 3; j++) {
        await db.comment.create({
          data: {
            content: commentContent,
            authorId: userId,
            postId: i + 1,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
  console.log("DB populated.");
};

main();
