var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
  "mongodb+srv://Abood:Abood1meniat23@todoapp.jfuha.mongodb.net/TodoApp?retryWrites=true&w=majority",["TodoApp"]
);


router.get("/todos", function (req, res, next) {
  db.TodoApp.find(function(err,todos){
    if(err){
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});

// get a specific todo
router.get("/todos/:id", function (req, res, next) {
  db.Todoapp.findOne({
    _id: mongojs.ObjectID(req.params.id)
  }, function (err, todo) {
    if (err) {
      res.send(err);
    } else {
      res.json(todo);
    }
  });
});

// Create a new todo
router.post("/todo", function(req, res, next){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted)){
    res.status(400).json({"error":"incorrect data"});
  } else {
    db.TodoApp.save(todo, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
})

// update a specific todo
router.put("/todo:id", function (req, res, next) {
  var todo = req.body;
  var updatedObject ={};
  if(todo.isCompleted){
    updatedObject.isCompleted = todo.isCompleted;
  }
  if (todo.text) {
    updatedObject.text = todo.text;
  }
  if(!updatedObject){
    res.status(400).json({"error":"Invalid Data"});
  }else {
    db.TodoApp.update({
      _id:mongojs.ObjectID(req.params.id)
    }, updatedObject,{}, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

// Delete a specific todo
router.delete("/todo:id", function (req, res, next) {
  var todo = req.body;
  
    db.TodoApp.remove({
      _id:mongojs.ObjectID(req.params.id)
    },'' ,function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  });




module.exports = router;
