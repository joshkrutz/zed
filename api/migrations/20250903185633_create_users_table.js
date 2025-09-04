/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    // Generated Columns
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.timestamps(true, true);

    // Required Columns
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
