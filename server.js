var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

var todos=[];
var todoNextId = 1;
app.get('/',function (req,res) {
	res.send('TODO API Root');
});


app.get('/todos',function(req,res) {
	res.json(todos);
});

app.get('/todos/:id',function(req,res) {
	var todoId = parseInt(req.params.id,10);
	var matchedTodo;

	todos.forEach(function (todo){
		if(todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if(matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});


//POST /todos

app.post('/todos',function(req,res) {
	var body = req.body;
	//add id field
	body.id = todoNextId++;
	//push body onto array
	todos.push(body);
	res.json(body);
});

app.listen(PORT,function() {
	console.log('Express is listing on port : ' + PORT + '!');
});