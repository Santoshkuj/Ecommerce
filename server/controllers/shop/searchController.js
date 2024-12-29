import Products from '../../models/productModel.js'

const searchProducts = async (req,res) => {
    try {
        const {keyword} = req.params

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success : false,
                message : 'Empty or invalid keyword'
            })
        }

        const regex = new RegExp(keyword,'i')
        const createSearchQuery ={
            $or : [
                {title : regex},
                {description : regex},
                {category : regex},
                {brand : regex}
            ]
        }
        const searchResults = await Products.find(createSearchQuery)

        res.status(200).json({
            success: true,
            data : searchResults
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

export {
    searchProducts
}