import {Category} from '../model/category';
import * as  _ from 'lodash'; 



const addCategoryController = async (req : any, res : any, next : any) => {
  //  const category = new Category(req.body)
    try {
        // await category.save();
        // return res.status(200).json({
        //     message: 'Category Added Successfully',
        //     categoryId: category._id
        // })
    const categoryType = req.body.categoryType;

    if(categoryType == "0"){
        const   category = new Category(_.pick(req.body, ['categoryName', 'categoryDescription', 'categoryImage','categoryType','subCategoryFlag']));
      //  category.createdBy = req.user._id;
    
        await category.save()
        res.send({ status:200,message: "Category Saved Successfully",categoryData : category });
    }
    else if(categoryType == "1"){
        const  category = new Category(_.pick(req.body, ['categoryName', 'categoryDescription', 'categoryImage','categoryType',"categoryId","subCategoryFlag"]));
    //    category.createdBy = req.user._id;
    
        await category.save()
        res.send({ status:200,message: "Category Saved Successfully",categoryData : category  });
    }
    else if(categoryType == "2"){
        const  category = new Category(_.pick(req.body, ['categoryName', 'categoryDescription', 'categoryImage','categoryType',"categoryId","subCategoryFlag"]));
     //   category.createdBy = req.user._id;
    
        await category.save()
        res.send({ status:200,message: "Category Saved Successfully"  ,categoryData : category });
    }else{
        res.send({ status:400,message: "Category Not Found!!" });
    }

} catch (error) {
 
      res.send({ error });

}

}

const getCategoryController = async (req : any, res : any, next : any) => {
    try {
       let categoryList = await Category.find({softDelete:0});
       res.status(200).json({data: categoryList})

    } catch (error) {
       
          res.send({ error });

    }   

}
const getCategoryParentController = async (req : any, res : any, next : any) => {
    try {
    //    let user = req.user;
    //    console.log(user)
       let categoryList = await Category.find({softDelete:0,categoryType:"0"});
       res.status(200).json({data: categoryList})

    } catch (error) {
      
          res.send({ error });

    }   

}
const getCategoryByIdController = async (req : any, res : any, next : any) => {
    try {
       let categoryList = await Category.findById(req.params.id);
       res.status(200).json({data: categoryList})

    } catch (error) {
       
          res.send({ error });

    }   

}

const getSubCategoryControllerById = async (req : any, res : any, next : any) => {
    try {
       let subCategoryList = await Category.find({softDelete:0,categoryId : req.params.id});
       res.status(200).json({data: subCategoryList})
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}



const updateCategoryControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);

        let updateData ={
            "categoryDescription": req.body.categoryDescription,
            "categoryId": req.body.categoryId,
            "categoryImage": req.body.categoryImage,
            "categoryName": req.body.categoryName,
            "categoryType": req.body.categoryType,
            "subCategoryFlag":req.body.subCategoryFlag
        }
     let updateCategory =    await Category.findByIdAndUpdate(req.body._id,updateData,{new: true});
            console.log(updateCategory);
     
        res.send({ status:200,message: "Category Updated Successfully",updateCategoryList : updateCategory});
    } catch (error) {
        res.send({ error });
        


    }

}
const publicationCategoryControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isActive": req.body.isActive,
        }
     let updateCategory =  await Category.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateCategory.isActive == 1){
        res.send({ status:200,message: "Category Published Successfully",updateCategoryList : updateCategory});
     }
     else if(updateCategory.isActive == 0){
        res.send({ status:200,message: "Category Unpublished Successfully",updateCategoryList : updateCategory});
     }
    } catch (error) {
        res.send({ error });
        

    }

}
const deleteCategoryControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
     let updateCategory =  await Category.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Category Deleted Successfully",updateCategoryList : updateCategory});


    } catch (error) {
        res.send({ error });
         
     
    }

}


const searchCategoriesForAdmin = async (req: any, res: any, next: any) => {
    const searchQry = req.query.categoryName;
    console.log(searchQry)

    try {
        // const products = await Product.find({ productName: { $regex: searchQry, $options: "i" } })
        const categories = await Category.find({softDelete: 0 , $text: { $search: searchQry } })

        res.status(200).json({ status: 200, data: categories })
    } catch (error) {
        console.log(error);
        res.send(error) 
    }
}










export {addCategoryController , getCategoryController,getCategoryByIdController,getSubCategoryControllerById,
    deleteCategoryControllerById,updateCategoryControllerById,publicationCategoryControllerById,getCategoryParentController, searchCategoriesForAdmin}  ; 


