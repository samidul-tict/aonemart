import {Favorite} from '../model/fav';

const addFavController = async (req : any, res : any, next : any) => {
    try {
        const fav = new Favorite(req.body)
        await fav.save();
        return res.status(200).json({
            message: 'Product Added to Favorites',
            favId: fav._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}

const getFavControllerById = async (req : any, res : any, next : any) => {
    try {
       let favList = await Favorite.find({customerId : req.params.id}).populate({path :'productId'});  
            res.status(200).json(favList)
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}
const getFavController = async (req : any, res : any, next : any) => {
    try {
       let favList = await Favorite.find().populate({path :'productId'});  
            res.status(200).json(favList)
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}
const removeFavController = async (req : any, res : any, next : any) => {
    try {
       await Favorite.findByIdAndDelete(req.params.id);  
       return  res.send({ status:200,message: "Removed from Favorites"});  
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}

const updateFavListById = async (req: any, res: any, next: any) => {
    const { favId, wishlist }  = req.body;
    try {
        await Favorite.findByIdAndUpdate(favId, { products: wishlist })
        res.status(200).json({ status: 200, message: 'Wishlist Updated Successfully' })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }

}
export {addFavController , getFavController,removeFavController,getFavControllerById, updateFavListById}  ; 