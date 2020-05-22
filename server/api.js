const express = require('express');
const apiRouter = express.Router();
const db = require('./db');

module.exports = apiRouter;

apiRouter.param('minionId', (req, res, next, mid) => {
    let minionId = db.getFromDatabaseById('minions', mid);
    if(minionId) {
        req.minionId = mid;
        next();
    } else {
        res.status(404).send(`minonId: ${minionId} Not Found`);
    }
})

apiRouter.get('/minions', (req, res, next) => {
    let data = db.getAllFromDatabase('minions');
    res.status(200).send(data);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    let data = db.getFromDatabaseById('minions', req.minionId);
    res.status(200).send(data);
})

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

apiRouter.use((err, req, res, next) => {
    const status = err.status || 400;
    res.status(status).send(err.message);
});