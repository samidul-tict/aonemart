import express from 'express';
import {addBannerController,deleteBannersControllerById,getBannerController,publicationBannerControllerById,updateBannerControllerById,getSingleBannerById,getBannesForWeb} from '../controller/banner.controller';
const router = express.Router();
//add category route
router.route("/banner/add-banner").post(addBannerController)
router.route("/banner/delete-banner").put(deleteBannersControllerById)
router.route("/banner/get-banner-list").get(getBannerController)
router.route("/banner/publish-banner").put(publicationBannerControllerById)
router.route("/banner/update-banner").put(updateBannerControllerById)
router.route("/admin/banner/get-single-banner/:id").get(getSingleBannerById)
router.route("/banner/get-active-banners").get(getBannesForWeb)
export default router;