let express = require("express");
let router = express.Router();
const TodoController = require("../Controllers/TodoController");
const CredentialController = require("../Controllers/Credentials");

router.post("/api/signup",CredentialController.Signup);

router.post("/api/login",CredentialController.Login );

router.post("/api/todo",TodoController.AddTodo );

router.get("/api/todo",TodoController.getTodo );

router.delete("/api/todo:id",TodoController.DeleteTodo);

router.put("/api/todo",TodoController.EditTodo );
module.exports = router;
