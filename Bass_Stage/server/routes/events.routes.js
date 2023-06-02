
const EventController = require(`../controllers/event.controller`)

module.exports =(app) => {

    // CRRUD

    // Create a event POST method
    app.post(`/api/events/new`, EventController.addEvent)
    
    // Read all
    app.get(`/api/events`, EventController.allEvents)

    // Read one
    app.get(`/api/event/:id`, EventController.oneEvent)

    // Update one
    app.put(`/api/event/:id`, EventController.updateEvent)

    // Delete one
    app.delete(`/api/event/:id`, EventController.deleteEvent)
    
}