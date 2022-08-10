import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json({ guests: Array.from({ length: 10 }).map(createRandomUser) });
}
