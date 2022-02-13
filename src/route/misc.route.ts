
import express from 'express';
import {addMiscController , getMiscController,publicationMiscControllerById,deleteMiscControllerById,updateMiscControllerById} from '../controller/misc.controller';
const router = express.Router();

router.route("/misc/add-misc").post(addMiscController)
router.route("/misc/get-misc-list").get(getMiscController)
router.route("/misc/update-misc").put(updateMiscControllerById)
router.route("/misc/delete-misc").put(deleteMiscControllerById)
router.route("/misc/publish-misc").put(publicationMiscControllerById)

export default router;