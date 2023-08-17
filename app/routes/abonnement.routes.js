module.exports = app => {
  const abonnements = require("../controllers/abonnement.controller.js");

  var router = require("express").Router();

  // Create a new abonnements
  router.post("/", abonnements.create);

  // Retrieve all abonnements
  router.get("/", abonnements.findAll);

  // Retrieve all published abonnements
  router.get("/published", abonnements.findAllPublished);

  // Retrieve a single abonnements with id
  router.get("/:id", abonnements.findOne);

  // Update a abonnements with id
  router.put("/:id", abonnements.update);

  // Delete a abonnements with id
  router.delete("/:id", abonnements.delete);

  // Create a new abonnements
  router.delete("/", abonnements.deleteAll);

  app.use("/api/tutorials", router);
};
