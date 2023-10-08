import { Router } from "express";
import * as UserCtrl from "../../controller/user/user.js";

const routes = new Router();
const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
};

routes.route(PATH.REGISTER).post(UserCtrl.registerUser);
routes.route(PATH.LOGIN).post(UserCtrl.userLogin);

export default routes;
