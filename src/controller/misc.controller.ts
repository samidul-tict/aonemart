import {Misc} from '../model/misc';

const addMiscController = async (req : any, res : any, next : any) => {
    const misc = new Misc(req.body)
    console.log('a',misc);
    try {
        await misc.save();
        return res.status(200).json({
            message: 'Misc Added Successfully',
          miscId: misc._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}
const getMiscController = async (req : any, res : any, next : any) => {
    try {
     
       let miscList = await Misc.find({softDelete:0})   
       res.status(200).json(miscList)
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}
const updateMiscControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "slabName": req.body.slabName,
            "slabDescription": req.body.slabDescription,
            "slabPercentage": req.body.slabPercentage,
            "slabPoint": req.body.slabPoint
        }
     let updateLocation =  await Misc.findByIdAndUpdate(req.body._id,updateData,{new: true});
        res.send({ status:200,message: "Misc Updated Successfully",locationtList : updateLocation});
    } catch (error) {
        res.send({ error });

    }




}


const publicationMiscControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isActive": req.body.isActive,
        }
     let updateLocation =  await Misc.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateLocation.isActive == 1){
        res.send({ status:200,message: "Tax Published Successfully"});
     }
     else if(updateLocation.isActive == 0){
        res.send({ status:200,message: "Tax Unpublished Successfully"});
     }
    } catch (error) {
        res.send({ error });
          res.send({ error });

    }

}
// const publicationLocationControllerById = async (req : any, res : any, next : any) => {
//     try {
//         console.log(req.body);
//         let updateData = {
//             "isActive": req.body.isActive,
//         }
//      let updateLocation =  await Location.findByIdAndUpdate(req.body._id,updateData,{new: true});
//      if(updateLocation.isActive == 1){
//         res.send({ status:200,message: "Location Published Successfully",locationList : updateLocation});
//      }
//      else if(updateLocation.isActive == 0){
//         res.send({ status:200,message: "Location Unpublished Successfully",locationList : updateLocation});
//      }
//     } catch (error) {
//         res.send({ error });
//           res.send({ error });

//     }

// }

const deleteMiscControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
     await Misc.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Misc Deleted Successfully"});
    } catch (error) {
        res.send({ error });
    }

}
export {addMiscController , getMiscController,deleteMiscControllerById,updateMiscControllerById,publicationMiscControllerById}  ; 
