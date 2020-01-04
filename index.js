const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var todoItems = [{ id:0, task: "Shopping", complete: false}];
var keyIndex = 1;

// READ API
app.get('/api/todos', (req, res) => {
  res.send(todoItems);
});

// CREATE API
app.post("/api/todos", function(req, res) {
  if (req.body.task) {
    var todoObj = {
      id: keyIndex++,
      task: req.body.task,
      complete: false
    };
    todoItems.push(todoObj);
    res.status(200).send(todoObj);
  }
  else {
    res.status(500).send("Task cannot be blank");
  }
});

// DELETE API
app.delete("/api/todos/:id", function(req, res) {
  var id = parseInt(req.params.id);

  var deletedTodo;
  for(var i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
        deletedTodo = todoItems[i];
        todoItems.splice(i, 1);
    }
  }
  res.send(deletedTodo);
});

// UPDATE API
app.put("/api/todos/:id", function(req, res) {
  
  if (req.body.task) {
    var id = parseInt(req.params.id);
    var updatedObj = req.body;

    var updatedTask;
    for(var i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == id) {
        todoItems[i].task = updatedObj.task
        updatedTask = todoItems[i];
      }
    }

    res.send(updatedTask);
  }
  else {
    res.status(500).send("Task cannot be blank!");
  }
});



/*
  INSTRUCTIONS: Add a new GET api endpoint /api/todos/completed/:id that will mark
  the task as completed in the object array and strikethrough the item on the client.

  1) Modify the todoItems object array to include a completed field that is either true or false

  2) Create the GET endpoint to /api/todos/completed/:id where id is the ID of the item to mark as completed
     a) search the array for the item with the id passed in. When found, modify the completed property to true
     b) return a status of 200 if found, 500 if not found

  3) Modify the client (/public/index.html) by adding a new item in the dropdown list named "Completed".
     a) Create a click handler for the Completed item and when clicked, make an ajax call to the endpoint you
        created in step 2 to mark the task as completed
     b) modify the code that lists the todo items to check and see if the completed property is true or false
        If true, surround the task name in a <span> element and set the span's class to "taskCompleted". this CSS class
        has already been created for you. This class will show the task with a strikethrough.
*/
// getTask
function getTask(taskId){
  console.log("getTask");
  return todoItems.find(({ id }) => id === taskId);
}

// COMPLETED
app.get("/api/todos/completed/:id", function(req, res) {
  
    var mytask = getTask(parseInt(req.params.id));
    console.log(mytask.task);
    mytask.complete = true;
    
  
});






app.listen(3020, () => console.log('server started'));
