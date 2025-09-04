const { faker } = require("@faker-js/faker");

function generateNFakeItem(n = 1) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int((options = { max: 2000 })),
      manager_id: "cd88a258-e985-4bde-8f99-fa0c0cfe5ea7",
    });
  }

  return arr;
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: "cd88a258-e985-4bde-8f99-fa0c0cfe5ea7",
      username: "username",
      password: "password",
      first_name: "first_name",
      last_name: "last_name",
    },
  ]);

  await knex("items").del();
  await knex("items").insert(generateNFakeItem(10));
};
