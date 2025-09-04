const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

const SALT_ROUNDS = 12;

router.get("/me", async (req, res) => {
  console.log(req.session);
  if (!req.session || !req.session.id) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  const payload = await knex("users")
    .select("*")
    .where("id", "=", req.session.id)
    .first();

  res.status(200).json(payload);
});

router.post("/", (req, res) => {
  try {
    const body = req.body;
    if (!body.username) {
      return res.status(400).json({ error: "Missing username" });
    }
    if (!body.password) {
      return res.status(400).json({ error: "Missing password" });
    }
    if (!body.first_name) {
      return res.status(400).json({ error: "Missing first_name" });
    }
    if (!body.last_name) {
      return res.status(400).json({ error: "Missing last_name" });
    }

    // Validation looks good... proceed and make new user
    bcrypt
      .hash(body.password, SALT_ROUNDS)
      .then((hash) => {
        const newRecord = {
          username: body.username,
          password: hash,
          first_name: body.first_name,
          last_name: body.last_name,
        };

        // Save details
        knex("users")
          .insert(newRecord)
          .then(() => res.send(newRecord))
          .catch((err) =>
            res.status(400).json({ error: "Failed to save user to database" })
          );
      })
      .catch((_err) => {
        res
          .status(400)
          .json({ error: "Could not generate secure account details" });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
