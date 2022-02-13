import express from 'express';
import { addDiscount, deleteDiscount, editDiscount, getAllDiscountList, getDiscountById } from '../controller/discount.controller';

const router = express.Router();

router.route("/admin/discount/add-discount").post(addDiscount)

router.route("/admin/discount/get-all-discounts").get(getAllDiscountList)

router.route("/admin/discount/discount-by-id/:id").get(getDiscountById)

router.route("/admin/discount/edit-discount/:id").put(editDiscount)

router.route("/admin/discount/delete-discount/:id").put(deleteDiscount)

export default router