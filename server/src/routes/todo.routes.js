import express from "express";
import todoCtrl from "../controllers/todo.controller.js";
import userCtrl from "../controllers/user.controller.js";
import passport from "passport";

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.route("/api/todos/user/:userId")
  .get(todoCtrl.listByUser)
  .post(todoCtrl.create);

router.route("/api/todos/:todoId")
  .put(todoCtrl.update)
  .delete(todoCtrl.remove);

router.param("userId", userCtrl.userByID);
router.param("todoId", todoCtrl.todoByID);

export default router;
