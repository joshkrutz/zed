const express = require("express");
const { isAuthorized } = require("./auth.js");
const router = express.Router();

const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

// Get all products
router.get("/", async (req, res) => {
  const payload = await knex("items").select("*");

  res.status(200).json(payload);
});

// Get all my products
router.get("/me", async (req, res) => {
  // If not logged in, get all products
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  const payload = await knex("items")
    .select("*")
    .where({ manager_id: req.session.id });

  res.status(200).json(payload);
});

// Get a product
router.get("/:id", async (req, res) => {
  const payload = await knex("items")
    .select("*")
    .where({ id: req.params.id })
    .first();

  res.status(200).json(payload);
});

// Create a product
router.post("/", (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  // TODO add validation
  console.log(req.body);

  const newRecord = {
    manager_id: req.session.id,
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  knex("items")
    .insert(newRecord)
    .then(() => res.send(newRecord))
    .catch((err) =>
      res.status(400).json({ error: "Failed to save product to database" })
    );
});

// Edit a product
router.patch("/:id", async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  // Get the product owner
  let { manager_id } = await knex("items")
    .select("manager_id")
    .where({ id: req.params.id })
    .first();

  if (req.session.id !== manager_id) {
    return res.status(403).json({ error: "Forbidden request" });
  }

  // TODO add validation

  let updates = req.body;

  knex("items")
    .where({ id: req.params.id })
    .update(updates)
    .then(() => res.send(updates))
    .catch((err) =>
      res.status(400).json({ error: "Failed to edit product in database" })
    );
});

// DELETE api/products/
router.delete("/:id", async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  // Get the product owner
  let { manager_id } =
    (await knex("items")
      .select("manager_id")
      .where("id", "=", req.params.id)
      .first()) || null;

  if (req.session.id !== manager_id) {
    return res.status(403).json({ error: "Forbidden request" });
  }

  knex("items")
    .where({ id: req.params.id })
    .del()
    .then(() => res.status(200).json({ id: req.params.id }))
    .catch((err) =>
      res.status(400).json({ error: "Failed to delete product in database" })
    );
});

module.exports = router;
