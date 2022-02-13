import express from 'express';
import {addPaymentController , getPaymentController,updatePaymentControllerById,deletePaymentControllerById} from '../controller/payment.controller';
const router = express.Router();
//add category route
router.route("/payment/add-payment").post(addPaymentController)
router.route("/payment/get-payment-list").get(getPaymentController)
router.route("/payment/update-payment").put(updatePaymentControllerById)
router.route("/payment/delete-payment").delete(deletePaymentControllerById)

export default router;