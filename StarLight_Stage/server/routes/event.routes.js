const EventController = require('../controllers/event.controller');

module.exports = (app) => {
    // Create
    app.post('/api/events/new', EventController.addEvent);

    // Read all
    app.get('/api/events', EventController.allEvents);

    // Read one
    app.get('/api/event/:id', EventController.oneEvent);

    // Update
    app.put('/api/event/:id', EventController.updateEvent);

    // Delete
    app.delete('/api/event/:id', EventController.deleteEvent);
};
