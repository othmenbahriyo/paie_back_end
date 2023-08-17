const db = require("../models");
const Abonnement = db.abonnements;

// Create and Save a new Abonnement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Abonnement
  const tutorial = new Abonnement({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Abonnement in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Abonnement."
      });
    });
};

// Retrieve all Abonnements from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Abonnement.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Abonnement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Abonnement.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Abonnement with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Abonnement with id=" + id });
    });
};

// Update a Abonnement by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Abonnement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Abonnement with id=${id}. Maybe Abonnement was not found!`
        });
      } else res.send({ message: "Abonnement was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Abonnement with id=" + id
      });
    });
};

// Delete a Abonnement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Abonnement.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Abonnement with id=${id}. Maybe Abonnement was not found!`
        });
      } else {
        res.send({
          message: "Abonnement was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Abonnement with id=" + id
      });
    });
};

// Delete all Abonnements from the database.
exports.deleteAll = (req, res) => {
  Abonnement.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} abonnements were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Abonnements
exports.findAllPublished = (req, res) => {
  Abonnement.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
