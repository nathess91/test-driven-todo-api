// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var q = req.query.q;
   var newObj = [];
   for (var i = 0; i < todos.length; i++) {
     if (todos[i].task.match(q)) {
       newObj.push(todos[i]);
     }
   }
   res.send({todos: newObj});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   var todosObj = {todos: todos};
   res.json(todosObj);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  var newTask = req.body.task;
  var newDesc = req.body.description;
  var newToDo = {
    _id: todos.length + 1,
    task: newTask,
    description: newDesc
  }
  todos.push(newToDo); // adds new todo to todos
  res.json(newToDo); // response with new todo
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = +req.params.id;
   var data;
   for (var i = 0; i < todos.length; i++) {
     if (id === todos[i]["_id"]) {
      data = todos[i];
     }
   }
   res.json(data);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = +req.params.id;
   var update;
   for (var i = 0; i < todos.length; i++) {
     if (id === todos[i]["_id"]) {
      todos[i].task = req.body.task;
      todos[i].description = req.body.description;
      res.json(todos[i]);
     }
   }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = +req.params.id;
   for (var i = 0; i < todos.length; i++) {
     if (id === todos[i]["_id"]) {
       todos.splice(i, 1);
       res.json("success");
     }
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
