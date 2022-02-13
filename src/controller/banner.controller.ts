import {Banner} from '../model/banner';
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const addBannerController = async (req : any, res : any, next : any) => {
    const banner = new Banner(req.body)
    console.log(banner);
    try {
        await banner.save();
        return res.status(200).json({
            message: 'Banner Added Successfully',
            bannerId: banner._id
        })
    } catch (error) {
        console.log(error)
        res.send({ error });
    }
}
const deleteBannersControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
     let updateBanner =  await Banner.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Banner Deleted Successfully"});


    } catch (error) {
          res.send({ error });

     
    }

}
const updateBannerControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "bannerFlag": req.body.bannerFlag,
            "bannerTitle": req.body.bannerTitle,
            "bannerSubtitle": req.body.bannerSubtitle,
            "bannerCategories": req.body.bannerCategories,
            "bannerImage": req.body.bannerImage
        }
    let updateBanner = await Banner.findByIdAndUpdate(req.body._id, updateData, {new: true})
        res.send({ status:200,message: "Banner Updated Successfully",bannerList : updateBanner});
    } catch (error) {
          res.send({ error });


    }
}


const getBannerController = async (req : any, res : any, next : any) => {
    try {
       let bannerList = await Banner.find({softDelete:0}).populate('bannerCategories')  
       res.status(200).json(bannerList)
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}

const publicationBannerControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isActive": req.body.isActive,
        }
     let updateBanner =  await Banner.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateBanner.isActive == 1){
        res.send({ status:200,message: "Banner Published Successfully"});
     }
     else if(updateBanner.isActive == 0){
        res.send({ status:200,message: "Banner Unpublished Successfully"});
     }
    } catch (error) {
      
          res.send({ error });


    }

}


const getSingleBannerById = async (req: any, res: any, next: any) => {
    const { id } = req.params
    try {
        let bannerList = await Banner.findById(new ObjectId(id)).populate('bannerCategories')  
        res.status(200).json({status: 200, data: bannerList})
     } catch (error) {
         console.log(error)
           res.send({ error });
 
     }
    
}

const getBannesForWeb = async (req: any, res: any, next: any) => {
    try {
        const bannerlist = await Banner.find({ softDelete: 0, isActive: 1 }).populate('bannerCategories')
        res.status(200).json({ status: 200, data: bannerlist })
    } catch (error) {
        console.log(error)
        res.send({ error });
    }
}

export {addBannerController ,deleteBannersControllerById,getBannerController,publicationBannerControllerById,updateBannerControllerById,getSingleBannerById,getBannesForWeb}  ; 