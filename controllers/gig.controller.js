import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";


export const createGig = async(req, res, next) => {
    if(!req.isSeller) 
        return next(createError(403, "Only sellers can create a gig !"));

        const newGig = new Gig({
            userId: req.userId,
            ...req.body
        });

        try {
            const saveGig = await newGig.save();
            res.status(201).json(saveGig);

    }catch(err) {next(err);}
    };


export const deleteGig = async(req, res, next) => {
    try{
        const gig  = await Gig.findById(req.params.id);

        if(gig.userId !== req.userId)
        return next(createError(403, "You can delete only your gig !"));

        //if ther is no problem, delete
        await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted successfully !");

    }catch(err) {next(err);}    
};


export const getGig = async(req, res, next) => {
    try{

        const gig  = await Gig.findById(req.params.id);
        if(!gig) next(createError(404,"Gig not found"));
        res.status(200).send(gig);

    }
    catch(err) {next(err);}

};


export const getGigs = async(req, res, next) => {

    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),

        ...(q.category && { category: q.category }),
        
        ...((q.min || q.max)  && {
            price: {
                ...(q.min && { $gte: q.min }),
                ...(q.max && { $lte: q.max }),
            }
        }),

        ...(q.search && {title: {$regex: q.search, $options: "i"}}),
         //option pour faire correspondre un title (search) saisi en majuscule ou miniscule
    };

    try{
        const gigs  = await Gig.find(filters).sort({ [q.sort]: -1 });
        //if(!gig) next(createError(404,"Gig not found"));
        res.status(200).send(gigs);

    }
    catch(err) {next(err);}
};
