import express from 'express';
import {addFavController,getFavController,removeFavController,getFavControllerById, updateFavListById} from '../controller/fav.controller';
const router = express.Router();
//add category route
router.route("/fav/add-fav").post(addFavController)
router.route("/fav/get-fav-list/:id").get(getFavControllerById)
router.route("/fav/get-fav-list").get(getFavController)

router.route("/fav/remove-fav/:id").delete(removeFavController)

router.route("/fav/update-fav").put(updateFavListById)

export default router;