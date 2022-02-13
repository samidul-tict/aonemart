import {Product} from '../model/product';
import {Cart} from '../model/cart';
import {Favorite} from '../model/fav';

import { Admin } from '../model/admin';
import mongoose from 'mongoose';
import { Request, Response } from 'express';


let ObjectId = mongoose.Types.ObjectId;

const addProductController = async (req : any, res : any, next : any) => {
    const product = new Product(req.body)
    console.log(product);
    try {
        await product.save();
        return res.status(200).json({
            message: 'Product Added Successfully',
            productId: product._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}

const getProductController = async (req : any, res : any, next : any) => {
    try {
       let page = req.query.page;
       let perPage = page-1;
       let productList = await Product.find({softDelete:0}).limit(10).skip(10 * perPage).sort({$natural:-1})
       let allValue = await Product.find({softDelete: 0}).countDocuments()
       res.status(200).json({data: productList, length : allValue})
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}



const getProductLastTwoDaysController = async (req : any, res : any, next : any) => {
    try {
        var d = new Date();
        d.setDate(d.getDate() - 2);
        let page = req.query.page;
        let perPage = page-1;
        let productList = await Product.find({softDelete:0 , "createdDate" :{ $gte : d}, isActive: 1 }).limit(10).skip(10 * perPage).sort({$natural:-1});  
        res.status(200).json(productList);
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}

const bestSellingProducts = async (req: any, res: any, next: any) => {
    try {
        const products = await Product.find({ softDelete: 0, isOrdered: { $gte: 10 } })

        res.status(200).json({ status: 200, data: products })
    } catch (error) {
        console.log(error);
        res.send(error) 
    }
}




const getCategoryProductControllerById = async (req : any, res : any, next : any) => {
    try {
       let productList = await Product.find({softDelete:0,categoryId : req.params.id, isActive: 1}).populate('categoryId')
       res.status(200).json(productList)
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}

const getCartProductControllerByIdApp= async (req : any, res : any, next : any) => {
    try {
        if(req.body.customerId == null){
            let productList = await Product.find({categoryId : req.body.categoryId});
            res.status(200).json({data: productList})
        }
        else{
            let productList = await Product.find({categoryId : req.body.categoryId});
            res.status(200).json({data: productList})
        }
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}

const getFavProductControllerByIdApp= async (req : any, res : any, next : any) => {
    try {
        if(req.body.customerId == null){
            let productList = await Product.find({categoryId : req.body.categoryId});
            res.status(200).json({data: productList})
        }
        else{   
        let finalArr : any;
        finalArr = [];
        let favList = await Favorite.find({customerId: req.body.customerId})
        let productList = await Product.find({categoryId : req.body.categoryId});
        favList.map((fav : any )=>{
            productList.map((product : any) =>{
               if(fav.productId.equals(product._id)){
                    product["isFav"] = 1;
                    console.log(product);
                    
                  finalArr.push(product)
                }
                else {
                   finalArr.push(product) 
                }
            })
        })
        res.status(200).json({data: finalArr})
        }
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}
const getProductControllerById = async (req : any, res : any, next : any) => {
    try {

       let productList = await Product.findById(req.params.id).populate('categoryId');
       res.status(200).json({data: productList})
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}

const updateProductControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "productName": req.body.productName,
            "productDescription": req.body.productDescription,
            "productNumber": req.body.productNumber,
            "sellerName": req.body.sellerName,
            "categoryId": req.body.categoryId,
            "productImage":req.body.productImage,
            "price": req.body.price,
            'sku':req.body.sku,
            'discount':req.body.discount,
            'discountedPrice':req.body.discountedPrice,
            "minQty": req.body.minQty,
            "qtyLeftInStock": req.body.qtyLeftInStock,
            "qtyTotalInStock": req.body.qtyTotalInStock,
            "isStock": req.body.qtyLeftInStock > 0 ? 1 : req.body.qtyLeftInStock === 0 ? 0 : 0
        }
     let updateProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
        res.send({ status:200,message: "Product Updated Successfully",updateProductList : updateProduct});
    } catch (error) {
          res.send({ error });


    }




}

const publicationProductControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isActive": req.body.isActive,
        }
     let updateProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateProduct.isActive == 1){
        res.send({ status:200,message: "Product Published Successfully",productCategoryList : updateProduct});
     }
     else if(updateProduct.isActive == 0){
        res.send({ status:200,message: "Product Unpublished Successfully",productCategoryList : updateProduct});
     }
    } catch (error) {
          res.send({ error });

    }

}
const discountStatusProductControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "discountFlag": req.body.discountFlag,
        }
     let updateProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateProduct.discountFlag == 1){
        res.send({ status:200,message: "Product Marked as  Discounted",productCategoryList : updateProduct});
     }
     else if(updateProduct.discountFlag == 0){
        res.send({ status:200,message: "Product Marked as  Non Discounted",productCategoryList : updateProduct});
     }
    } catch (error) {
          res.send({ error });


    }

}
const stockStatusProductControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isStock": req.body.isStock,
        }
     let updateProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateProduct.isStock == 1){
        res.send({ status:200,message: "In Stock",productCategoryList : updateProduct});
     }
     else if(updateProduct.isStock == 0){
        res.send({ status:200,message: "Out of Stock",productCategoryList : updateProduct});
     }
    } catch (error) {
          res.send({ error });


    }

}

const deleteProductControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
     let updateProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Product Deleted Successfully"});


    } catch (error) {
          res.send({ error });

    }

}

const featuredProductAddRemoveController = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isFeatured": req.body.isFeatured,
        }
     let featureProduct =  await Product.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Product Added as Featured"});
     if(featureProduct.isFeatured == 1){
        res.send({ status:200,message: "Featured Product Added"});
     }
     else if(featureProduct.isFeatured == 0){
        res.send({ status:200,message: "Featured Product Removed"});

     }

    } catch (error) {
          res.send({ error });

     
    }

}
const featuredListControllerById = async (req : any, res : any, next : any) => {
    try {
        if(req.body.customerId == null){
            let page = req.query.page;
            let perPage = page-1;
            let featuredProductList = await Product.find({softDelete:0,isFeatured : 1}).limit(10).skip(10 * perPage).sort({$natural:-1});  
            res.status(200).json(featuredProductList);
        }
        else{
            let page = req.query.page;
            let perPage = page-1;
            let featuredProductList = await Product.find({softDelete:0,isFeatured : 1}).limit(10).skip(10 * perPage).sort({$natural:-1});  
            res.status(200).json(featuredProductList);
        }
    } catch (error) {
          res.send({ error });

    }
  

}

const productsBasedOnDiscount = async (req: any, res: any, next: any) => {
    const { discount } = req.body;
    const { page } = req.query;
    try {        
        let perPage = page - 1;
        const products =  await Product.find({ softDelete: 0, discount: { $gte: discount } }).limit(10).skip(10 * perPage).sort({$natural:-1}); 
        res.status(200).json(products)
    } catch (error) {
        res.send({ error })
    }
}

const dailyEssentialProducts = async (req: any, res: any, next: any) => {
    const { page } = req.query;
    let perPage = page - 1
    try {
        const essentialProducts = await Product.find({
            softDelete: 0,
            $or: [ 
                    {categoryId: '616d71319ea162004c89fd68'},
                    {categoryId: '616d71319ea162004c89fd68'},
                    {categoryId: '616d72569ea162004c89fd74'},
                    {categoryId: '616d72979ea162004c89fd7a'},
                ]
        }).limit(10).skip(10 * perPage).sort({$natural:-1}); 
        res.status(200).json(essentialProducts)
    } catch (error) {
        res.send( { error })
    }
}

const getProductByParentCategory = async (req: any, res: any, next: any) => {
    const { ids } = req.body;
    const { page } = req.query;
    let perPage = page - 1;
    console.log(ids)
    
    try {
        const productList = await Product.find({ softDelete: 0, $or: ids }).limit(10).skip(10 * perPage).sort({$natural:-1});
        let allValue = await Product.find({softDelete: 0, $or: ids}).countDocuments()
        res.status(200).json({status: 200, data: productList, count: allValue})
    } catch (error) {
        res.send( { error } )
    }
}

const getProductFilter = async (req: any, res: any, next: any) => {
    const { categoryFilter, discountFilter, priceFilter } = req.body
    
    let aggregateArray = [];
    if (categoryFilter.length > 0) {
        
        let newArr = categoryFilter.map((element: any) => {
            let val = new ObjectId(element.categoryId)
            element.categoryId = val;  
            return element;          
        });
        let obj = { $match: { softDelete: 0, $or: newArr } }
        aggregateArray.push(obj)
    } 
    
    if (priceFilter.length > 0) {
        let qryArray = [];
        for (let fil of priceFilter) {
            qryArray.push(fil.qry);
        }
        let matchQry = {
            $match: { $or: qryArray }
        }
        aggregateArray.push(matchQry)
    }   
    
    if (discountFilter.length > 0) {
        let qryArray = [];
        for (let fil of discountFilter) {
            qryArray.push(fil.qry)
        }
        let matchQry = {
            $match: { $or: qryArray }
        }
        aggregateArray.push(matchQry)
    }
    console.log(aggregateArray)
    try {
        const filteredProducts = await Product.aggregate(aggregateArray)
        res.status(200).json(filteredProducts)
    } catch (error) {
        res.send({ error })
    }    
}


const noSubcategoryFilter = async (req: Request, res: Response) => {
    const { products, discountFilter, priceFilter } = req.body;
    const aggregateArray = [];
    console.log(req.body)
    products.forEach((el: any) => {
        el._id = new ObjectId(el._id);
    })
    let obj  = { $match: { $or: products } }
    aggregateArray.push(obj);

    if (priceFilter.length > 0) {
        let qryArray = [];
        for (let fil of priceFilter) {
            qryArray.push(fil.qry);
        }
        let matchQry = {
            $match: { $or: qryArray }
        }
        aggregateArray.push(matchQry)
    }   
    
    if (discountFilter.length > 0) {
        let qryArray = [];
        for (let fil of discountFilter) {
            qryArray.push(fil.qry)
        }
        let matchQry = {
            $match: { $or: qryArray }
        }
        aggregateArray.push(matchQry)
    }
    console.log(aggregateArray)

    try {
        const filteredProducts = await Product.aggregate(aggregateArray);
        res.status(200).json({ status: 200, data: filteredProducts })
    } catch (error) {
        res.send({ error })
    }

}


const searchProducts = async (req: any, res: any, next: any) => {
    const searchQry = req.query.productName;
    console.log(searchQry)
    try {
        // const products = await Product.find({ productName: { $regex: searchQry, $options: "i" } })
        const products = await Product.find({ softDelete: 0 , $text: { $search: searchQry } })

        res.status(200).json({ status: 200, data: products })
    } catch (error) {
        console.log(error);
        res.send(error) 
    }
}

const getDiscountedProducts = async (req: Request, res: Response) => {
    try {
        const discountedProducts = await Product.find({ softDelete: 0, discountFlag: 1 }).populate('categoryId')
        res.status(200).json({ status: 200, data: discountedProducts })
    } catch (error) {
        console.log(error);
        res.send(error) 
    }
}





export {addProductController , getProductController,updateProductControllerById,deleteProductControllerById,
    featuredProductAddRemoveController,publicationProductControllerById,discountStatusProductControllerById,stockStatusProductControllerById,
    getCategoryProductControllerById,getCartProductControllerByIdApp,getProductLastTwoDaysController,getProductControllerById,featuredListControllerById,
    getFavProductControllerByIdApp, getProductByParentCategory, getProductFilter, productsBasedOnDiscount, dailyEssentialProducts,getDiscountedProducts, noSubcategoryFilter, searchProducts, bestSellingProducts}  ; 

