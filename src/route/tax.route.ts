import express from 'express' 
import { addTax, editTax, getAllTaxPercentage, getSingleTaxPercentageById, getTaxForWeb } from '../controller/tax.controller'

const router = express.Router()

router.route("/admin/tax/add-tax").post(addTax)

router.route("/admin/tax/get-taxes").get(getAllTaxPercentage);

router.route("/admin/tax/tax-by-id/:id").get(getSingleTaxPercentageById)

router.route("/admin/tax/edit-tax/:id").put(editTax)

router.route("/tax/taxes").get(getTaxForWeb)

export default router