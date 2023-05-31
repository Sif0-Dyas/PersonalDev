// demo set up: replace Event and Events with whatever you are using for reference data i.e User Users
// Controller needs to ba able to access our model... so import your model.
const Event = require(`../models/event.model`)

// req is short for request
// res is short for response

// CRUD

// Create
module.exports.addEvent = (req, res) => {
    const newEvent = req.body
    Event.create(newEvent)
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err))
}

// Read all
module.exports.allEvents = (req, res) => {
    Event.find()
    .then(events => res.json(events))
    .catch(err => res.json(err));
};

// Read one
module.exports.oneEvent = (req, res) => {
    const idFromParams = req.params.id
    Event.findOne({_id: idFromParams})
    .then(oneevent => res.json(oneevent))
    .catch(err => res.json(err));
};

// Update
module.exports.updateEvent = (req, res) => {
    const idFromParams = req.params.id
    const updatedValue = req.body
    // Update: criteria, updatedValue, options
    Event.findOneAndUpdate({_id: idFromParams}, updatedValue, {new: true, runValidators: true})
    .then(updateEvent => res.json(updateEvent))
    .catch((err) => res.status(400).json(err))
};



// Delete
module.exports.deleteEvent = (req, res) => {
    const idFromParams = req.params.id
    Event.deleteOne({_id: idFromParams})
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json(err))
};