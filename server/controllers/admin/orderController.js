import Order from "../../models/order.js";

const getAllOrdersOfusers = async (req,res) => {
    try {
      const orders = await Order.find({})
      if (!orders) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
  
      res.status(200).json({
        success : true,
        date: orders
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  const getOrdersDetailsForAdmin = async (req,res) => {
    try {
      const {id} = req.params;
  
      const order = await Order.findById(id)
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      res.status(200).json({
        success : true,
        date: order
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  const updateOrderStatus = async (req,res) => {
    try {
      const {id} = req.params
      const {orderStatus} = req.body
  
      const order = await Order.findById(id)
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      await order.findByIdAndUpdate(id,{orderStatus})

      res.status(200).json({
        success: true,
        message: 'order status updated'
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  export {
    getAllOrdersOfusers,
    getOrdersDetailsForAdmin,
    updateOrderStatus
  }