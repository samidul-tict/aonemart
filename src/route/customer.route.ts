import express from 'express';
import {addCustomerController,customerEditForAdmin,getAddressByCustomerId,getAllCustomersForAdmin,getCustomerById,verifyOTPControllerById} from '../controller/customer.controller';
const router = express.Router();
//add category route
router.route("/customer/login").post(addCustomerController)
router.route("/customer/verify-otp").post(verifyOTPControllerById)
router.route("/admin/customer/all-customers").get(getAllCustomersForAdmin)
router.route("/admin/customer/edit-customer/:id").put(customerEditForAdmin)
router.route("/admin/getSingleCustomer/:id").get(getCustomerById)
router.route("/admin/customer/get-address/:id").get(getAddressByCustomerId)

export default router;

