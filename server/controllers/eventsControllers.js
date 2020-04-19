const db = require('../models/eventsModels.js');
require('dotenv').config();

const eventsControllers = {};


eventsControllers.getEvents = async (req, res, next) => {
  try{
    const text = `SELECT * FROM events`;
    const result = await db.query(text);
    res.locals.events = result.rows;
    next();
  }
  
  catch(err){
    next({
      log: `eventsControllers.getEvents: error: ${err}`,
      message: { err: `Error in eventsControllers.getEvents: ${err}`}
    });
  }
};

eventsControllers.getDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const text = `SELECT * FROM events WHERE id = $1`;
    const params = [id];
    const result = await db.query(text, params);
    res.locals.details = result.rows;
    next();
  }
  catch(err){
    next({
      log: `eventsControllers.getDetails: error: ${err}`,
      message: { err: `Error in eventsControllers.getDetails: ${err}`}
    });
  }
};

eventsControllers.createPost = async (req, res, next) => {
  const { name, location, date, description, user_id } = req.body;
  console.log('req.body', req.body)
  // const name = 'Brian';
  // const location = 'Brians house';
  // const date = '2020-04-18';
  // const description = 'party';
  // const user_id = 1;
  
  try {
    const text = `INSERT INTO events (name, location, date, description, user_id) VALUES ($1, $2, $3, $4, $5)`;
    const body = [name, location, date, description, user_id];
    const result = await db.query(text, body);
    res.locals.createPost = result.rows;
    next();
  }
  
  catch(err){
    next({
      log: `eventsControllers.createPosterror: ${err}`,
      message: { err: `Error in eventsControllers.createPost${err}`}
    });
  }
};

eventsControllers.updatePost = async (req, res, next) => {
  const { name, location, date, description, user_id } = req.body; // req.body comes from client and when user submits, fetch arrives from client with data
  const { id } = req.params;
  // const name = 'Brian';
  // const location = 'Brians house';
  // const date = '2020-04-18';
  // const description = 'party';
  // const user_id = 1;

  try {
    const text = 'UPDATE events SET name = $1, location = $2, date = $3, description = $4, user_id = $5 WHERE id = $6';
    const body = [name, location, date, description, user_id, id];
    console.log('body: ', body);
    const result = await db.query(text, body);
    console.log('text: ', text);
    console.log('result:', result)
    res.locals.updatePost = result.rows;
    next();
  }
  
  catch(err){
    next({
      log: `eventsControllers.updatePost: error: ${err}`,
      message: { err: `Error in eventsControllers.updatePost: ${err}`}
    });
  }
};

eventsControllers.deletePost = async (req, res, next) => {
  const { id } = req.params
  try{
    const text = `DELETE FROM events WHERE id = $1`;
    const params = [id];
    const result = await db.query(text, params);
    res.locals.deletePost = result.rows;
    next();
  }
  
  catch(err){
    next({
      log: `eventsControllers.deletePost: error: ${err}`,
      message: { err: `Error in eventsControllers.deletePost: ${err}`}
    });
  }
};

module.exports = eventsControllers