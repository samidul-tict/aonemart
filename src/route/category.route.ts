import express from 'express';
import {auth}   from '../middleware/authguard';
import {addCategoryController,getCategoryController,deleteCategoryControllerById,getCategoryByIdController,getSubCategoryControllerById,updateCategoryControllerById,publicationCategoryControllerById,getCategoryParentController, searchCategoriesForAdmin} from '../controller/category.controller';
const router = express.Router();
//add category route
router.route("/category/add-category").post(addCategoryController)
router.route("/category/get-subCategory-list/:id").get(getSubCategoryControllerById)
router.route("/category/get-category-list").get(getCategoryController)
router.route("/category/get-category/:id").get(getCategoryByIdController)
router.route("/category/get-category-parent").get(getCategoryParentController) //auth(),
router.route("/category/delete-category").put(deleteCategoryControllerById)
router.route("/category/update-category").put(updateCategoryControllerById)
router.route("/category/publish-category").put(publicationCategoryControllerById)
//router.route("/category/get-subCategory-list").get(getSubCategoryController)
router.route("/admin/category/category-search").get(searchCategoriesForAdmin)




export default router;

// function auth(){
//     return function (req:any,res:any,next:any) {
//         console.log('rishi',req.headers);
        
//     const authHeader = req.headers["authorization"]
//     if( authHeader !== undefined){
//         const Bearer = authHeader.split(" ")
//         const BearerToken = Bearer[1]
//         req.token = BearerToken;
//         next();

//     }else{
//        res.json({'status':'400','error': 'JsonWebTokenError','message':'invalid signature'});
    
//     }
// }
// }