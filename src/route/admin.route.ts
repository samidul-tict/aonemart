import express from 'express';
import {loginController} from '../controller/admin.controller';
const router = express.Router();
//add category route
router.route("/admin/admin-login").post(loginController)
export default router;