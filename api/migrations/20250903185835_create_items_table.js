/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    // Generated Columns
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.timestamps(true, true);

    // Required Columns
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.integer("quantity").unsigned().notNullable().defaultTo(0);

    // Foreign Keys
    table
      .uuid("manager_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // TODO verify that deleting manager deletes all their items
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
