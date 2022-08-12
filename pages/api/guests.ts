import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    address: {
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      timezone: faker.address.timeZone(),
    },
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    visitCount: faker.random.numeric(),
    lifetimeSpend: faker.finance.amount(0, 1000, 2),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  res
    .status(200)
    .json({ guests: Array.from({ length: 10 }).map(createRandomUser) });
}
