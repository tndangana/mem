module.exports = (app) => {

    const test = require('../resources/testResource');
    
    // Create a new Note
    app.post('/test', test.create);
    // Retrieve all Notes
    app.get('/test', test.findAll);
    // Retrieve a single Note with noteId
    app.get('/test/:testId', test.findOne);
    // update by id 
    app.put('/test/:testId',test.edit);
    // Delete a Note with noteId
    app.delete('/test/:testId', test.delete);
}