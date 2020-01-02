const Test = require('../models/test');
// crud test


exports.create = (req, res) => {
    console.log(`uuuuuuuuuuuu`, req.body)
    // Validate request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "Test content can not be empty"
        });
    }

    // Create a Note
    const test = new Test({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        date: req.body.date
    });
    // Save Note in the database
    test.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Test.find()
        .then(tests => {
            res.send(tests);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};
// find one by id
exports.findOne = (req, res) => {
    Test.findById(req.params.testId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.testId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

exports.edit = (req, res) => {

    Test.findById(req.params.id, function (err, test) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!opp) {
            return res.status(404).json(err);
        }

        test.firstName = req.body.firstName || opp.firstName,
            test.lastName = req.body.lastName || opp.lastName,
            test.age = req.body.age || opp.age,

            test.save(function (err, result) {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result);
            });
    });

}

exports.delete = (req, res) => {
    Test.findByIdAndRemove(req.params.testId)
        .then(test => {
            if (!test) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.testId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.testId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.testId
            });
        });
};