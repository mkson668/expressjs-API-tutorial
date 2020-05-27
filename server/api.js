const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

module.exports = apiRouter;


apiRouter.param('minionId', (req, res, next, mid) => {
    let minionId = db.getFromDatabaseById('minions', mid);
    if(minionId) {
        req.minionId = mid;
        next();
    } else {
        res.status(404).send(`minonId: ${minionId} Not Found`);
    }
});

apiRouter.param('ideaId', (req, res, next, iid) => {
    let ideaId = db.getFromDatabaseById('ideas', iid);
    if (ideaId) {
        req.ideaId = iid;
        next();
    } else {
        res.status(404).send(`ideaId: ${ideaId} Not Found`);
    }
});

apiRouter.get('/minions', (req, res, next) => {
    let data = db.getAllFromDatabase('minions');
    res.status(200).send(data);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    let data = db.getFromDatabaseById('minions', req.minionId);
    res.status(200).send(data);
});

apiRouter.post('/minions', (req, res, next) => {
    let minionObj = req.body;
    let addReturn = db.addToDatabase('minions', minionObj);
    if (addReturn) {
        res.status(201).send(addReturn);
    } else {
        res.status(400).send('Minion could not be created');
    }
})

apiRouter.put('/minions/:minionId', (req, res, next) => {
    let updatedMinionData = req.body;
    let updateReturn = db.updateInstanceInDatabase('minions', updatedMinionData);
    if (updateReturn) {
        res.status(201).send(updateReturn);
    } else {
        res.status(400).send('Update has failed');
    }
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    let deleteReturn = db.deleteFromDatabasebyId('minions', req.minionId);
    if (deleteReturn) {
        res.status(204).send('No Content');
    } else {
        res.status(404).send('delete has failed');
    }
});

apiRouter.get('/ideas', (req, res, next) => {
    let ideaObject = db.getAllFromDatabase('ideas');
    if (ideaObject) {
        res.status(200).send(ideaObject);
    } else {
        res.status(400).send('failed to retrieve ideas');
    }
});

// check if idea is valid
apiRouter.post('/ideas', checkMillionDollarIdea);
apiRouter.post('/ideas', (req, res, next) => {
    let ideaObject = req.body;
    let ideaCreateReturn = db.addToDatabase('ideas', ideaObject);
    if (ideaCreateReturn) {
        res.status(201).send(ideaCreateReturn);
    } else {
        res.status(400).send('failed to create post');
    }
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    let ideaObject = db.getFromDatabaseById('ideas', req.ideaId);
    res.status(200).send(ideaObject);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    let updateObject = req.body;
    let updateReturn = db.updateInstanceInDatabase('ideas', updateObject);
    if (updateReturn) {
        res.status(201).send(updateReturn);
    } else {
        res.status(400).send('failed to update');
    }
});


apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    let deleteReturn = db.deleteFromDatabasebyId('ideas', req.ideaId);
    if (deleteReturn) {
        res.status(204).send('No Content');
    } else {
        res.status(404).send('delete has failed');
    }
});

apiRouter.get('/meetings', (req, res, next) => {
    let data = db.getAllFromDatabase('meetings');
    res.status(200).send(data);
});

apiRouter.post('/meetings', (req, res, next) => {
    let meetingObject = db.createMeeting();
    let meetingReturn = db.addToDatabase('meetings', meetingObject);
    if (meetingReturn) {
        res.status(201).send(meetingReturn);
    } else {
        res.status(400).send('Failed to create new meeting');
    }
});

apiRouter.delete('/meetings', (req, res, next) => {
    let deleteReturn = db.deleteAllFromDatabase('meetings');
    if (deleteReturn) {
        res.status(204).send(deleteReturn);
    } else {
        res.status(400).send('cannot delete');
    }
});

apiRouter.use((err, req, res, next) => {
    const status = err.status || 400;
    res.status(status).send(err.message);
});