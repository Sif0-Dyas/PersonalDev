
const EventController = require(`../controllers/event.controller`)
const { authenticate, optionalAuth } = require('../middleware/auth.middleware')

module.exports =(app) => {

    // CRUD - Event routes with authentication

    // Create a event POST method (requires authentication)
    app.post(`/api/events/new`, authenticate, EventController.addEvent)
    
    // Read all (public, but can be personalized if authenticated)
    app.get(`/api/events`, optionalAuth, EventController.allEvents)

    // Read one (public)
    app.get(`/api/event/:id`, optionalAuth, EventController.oneEvent)

    // Update one (requires authentication)
    app.put(`/api/event/:id`, authenticate, EventController.updateEvent)

    // Delete one (requires authentication)
    app.delete(`/api/event/:id`, authenticate, EventController.deleteEvent)
    
}