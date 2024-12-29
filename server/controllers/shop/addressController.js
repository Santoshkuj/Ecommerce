import Address from "../../models/addressModel.js"


const addAddress = async (req,res) => {
    try {
        const{userId,address,city,pincode,phone,notes} = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.json({
                success: false,
                message: 'Provide all details'
            })
        }
        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })
        await newAddress.save()
        res.status(201).json({
            success : true,
            data: newAddress
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Something wnt wrong'
        })
    }
}
const fetchAllAddress = async (req,res) => {
    try {
        const {userId} = req.params
        if (!userId) {
            return res.json({
                success: false,
                message: 'Provide userId'
            })
        }

        const addressList = await Address.find({userId})

        res.status(200).json({
            success:true,
            data: addressList
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Something wnt wrong'
        })
    }
}
const editAddress = async (req,res) => {
    try {
        const {userId,addressId} = req.params
        const formData = req.body
        if (!userId || !addressId) {
            return res.json({
                success: false,
                message: 'userId and addressId in required'
            })
        }
        const address = await Address.findOneAndUpdate({
            _id:addressId, userId
        },formData, {new:true})

        if (!address) {
            return res.json({
                success: false,
                message: 'User address not found'
            })
        }
        res.status(200).json({
            success:true,
            data:address
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Something wnt wrong'
        })
    }
}
const deleteAddress = async (req,res) => {
    try {
        const {userId,addressId} = req.params
        if (!userId || !addressId) {
            return res.json({
                success: false,
                message: 'userId and addressId is required'
            })
        }
        const address = await Address.findOneAndDelete({
            _id:addressId,userId
        })
        if (!address) {
            return res.json({
                success: false,
                message: 'User address not found'
            })
        }
        res.status(200).json({
            success:true,
            message: 'address deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Something wnt wrong'
        })
    }
}

export{
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}