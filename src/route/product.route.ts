import express from 'express';
import {addProductController,getProductController,updateProductControllerById,deleteProductControllerById,getFavProductControllerByIdApp,
    getCategoryProductControllerById,getCartProductControllerByIdApp,featuredProductAddRemoveController,publicationProductControllerById,
    discountStatusProductControllerById,stockStatusProductControllerById,getProductLastTwoDaysController,featuredListControllerById,
    getProductControllerById, productsBasedOnDiscount, dailyEssentialProducts, getProductByParentCategory, getProductFilter, searchProducts, bestSellingProducts, getDiscountedProducts, noSubcategoryFilter} from '../controller/product.controller';
const router = express.Router();
//add category route
router.route("/product/add-product").post(addProductController)
router.route("/product/get-product-list").get(getProductController)
router.route("/product/update-product").put(updateProductControllerById)
router.route("/product/delete-product").put(deleteProductControllerById)
router.route("/product/feature-addRemove-product").put(featuredProductAddRemoveController)
router.route("/product/publish-product").put(publicationProductControllerById)
router.route("/product/discount-status-product").put(discountStatusProductControllerById)
router.route("/product/stock-status-product").put(stockStatusProductControllerById)
router.route("/product/get-lastTwoDaysProduct-list").get(getProductLastTwoDaysController)
router.route("/product/get-productByCategory-list/:id").get(getCategoryProductControllerById)

router.route("/product/get-productByCategory-lists").post(getCartProductControllerByIdApp)
//router.route("/product/get-productByCategory-list").post(getFavProductControllerByIdApp)
router.route("/product/no-subcategory-filter").post(noSubcategoryFilter)
router.route("/product/get-featuredProduct-lists").post(featuredListControllerById)
router.route("/product/get-productById/:id").get(getProductControllerById)
router.route("/product/get-featuredProduct-lists").post(featuredListControllerById)
router.route("/product/get-productById/:id").get(getProductControllerById)
router.route("/product/discounted-products").post(productsBasedOnDiscount)
router.route("/product/daily-essentials").get(dailyEssentialProducts)
router.route("/products/products-by-parentCategory").post(getProductByParentCategory)
router.route("/products/filtered-products").post(getProductFilter)
router.route("/products/search").get(searchProducts)
router.route("/products/best-selling-products").get(bestSellingProducts)
router.route("/products/all-discounted-products").get(getDiscountedProducts)



export default router;