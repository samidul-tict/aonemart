import express from 'express';
import {addOrderController , changeOrderStatusForAdmin, getAllOrdersForAdmin, getOrderController,getOrderDetailsControllerById, raiseDisputeOnOrderId} from '../controller/order.controller';
const router = express.Router();

router.route("/order/place-order").post(addOrderController)
 router.route("/order/get-order-list/:id").get(getOrderController)
 router.route("/order/get-orderDetails-list/:id").get(getOrderDetailsControllerById)

 router.route("/admin/order/all-order-list").get(getAllOrdersForAdmin)
 router.route('/order/raise-dispute').post(raiseDisputeOnOrderId)
 router.route("/admin/order/change-order-status/:id").put(changeOrderStatusForAdmin)
// router.route("/misc/update-misc").put(updateMiscControllerById)
// router.route("/misc/delete-misc").put(deleteMiscControllerById)

export default router;


