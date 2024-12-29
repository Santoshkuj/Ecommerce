import Feature from "../../models/featureModel.js";

const addFeatureImage = async (req,res) => {
    try {
        const {image} = req.body
        // console.log(image);
        const featureImage =  new Feature({
            image
        })

        await featureImage.save()
        res.status(201).json({
            success:true,
            data : featureImage
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
}

const getFeatureImage = async (req,res) => {
    try {
        const images = await Feature.find({})
        res.status(200).json({
            success:true,
            data : images
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
}

export{
    addFeatureImage,
    getFeatureImage
}