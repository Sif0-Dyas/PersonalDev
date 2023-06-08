const EventController = require('../controllers/event.controller');

module.exports = (app) => {
    // Create
    app.post('/api/events/new', EventController.addEvent);

    // Read all
    app.get('/api/events', EventController.allEvents);

    // Read one
    app.get('/api/events/:id', EventController.oneEvent);

    // Update
    app.put('/api/events/:id', EventController.updateEvent);

    // Delete
    app.delete('/api/events/:id', EventController.deleteEvent);
};
