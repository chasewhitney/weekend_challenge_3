var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};

var pool = new pg.Pool(config);

router.put('/:id', function(req, res) {
  var todo = req.params.id;
  console.log('post recieved data', todo);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'UPDATE "todos" SET "status" = \'completed\' WHERE id = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [todo], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }) // end pool
});

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "todos" ORDER BY "status" DESC;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }) // end pool
});

router.post('/', function(req, res) {
  var todo = req.body;
  console.log('post recieved data', todo);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO "todos" ("status", "todo") VALUES (\'incomplete\', $1);';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [todo.todo], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }) // end pool
});

router.delete('/:id', function(req, res) {
  var todo = req.params.id;
  console.log('post recieved data', todo);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'DELETE FROM "todos" WHERE id = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [todo], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }) // end pool
});

module.exports = router;
