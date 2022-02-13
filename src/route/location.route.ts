import express from 'express';
import {addLocationController,getLocationController,publicationLocationControllerById,deleteLocationControllerById,updateLocationControllerById} from '../controller/location.controller';
const router = express.Router();
//add category route
router.route("/location/add-location").post(addLocationController)
router.route("/location/publish-location").put(publicationLocationControllerById)
router.route("/location/get-location-list/:id").get(getLocationController)
router.route("/location/update-location").put(updateLocationControllerById)
router.route("/location/delete-location").put(deleteLocationControllerById)

export default router;
