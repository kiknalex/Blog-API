import db from ".";
import {faker} from "@faker-js/faker";

const userId = 1000;
const username = "testuser";
const password = "$2a$10$SEcUwUMcFOZaWSODFDFhJeGVsXbdFlb1IL1Ai4qsmmoOZwr5Z9xnS"; // 12345678

const userIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010];
const createRandomUser = (id: number) => {
  const username = faker.internet.displayName();
  return {
    username,
    password,
    id,
  };
};
const createRandomPost = (id: number, authorId: number) => {
  const title = faker.lorem.lines({min: 1, max: 3});
  const content = faker.lorem.paragraphs({min: 5, max: 10});

  return {
    id,
    title,
    content,
    authorId,
  };
};

const createRandomComment = (postId: number, authorId: number) => {
  const content = faker.lorem.paragraph({min: 1, max: 10});

  return {
    content,
    postId,
    authorId,
  };
};
const main = async () => {
  console.log("Populating DB...");
  try {
    for (let i = 1001; i < 1010; i++) {
      const createdUser = await db.user.create({
        data: createRandomUser(i),
      });
      console.log(createdUser);
    }
    for (let z = 1001; z < 1010; z++) {
      for (let i = 1; i < 6; i++) {
        await db.post.create({
          data: createRandomPost(i * z, z),
        });
        for (let j = 1; j < 21; j++) {
          await db.comment.create({
            data: createRandomComment(i * z, z),
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
  console.log("DB populated.");
};

main();
