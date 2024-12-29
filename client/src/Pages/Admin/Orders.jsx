import AdminOrderDetails from "@/components/Admin/OrderDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllOrdersForAdmin,
  getOrdersDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state?.adminOrder);
  const dispatch = useDispatch();

  function handleorderDetails(id) {
    setOpenDetailsDialog(true)
    dispatch(getOrdersDetailsForAdmin(id));
  }
  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList?.length > 0
              ? orderList.map((order) => (
                  <TableRow>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{order?.orderStatus}</TableCell>
                    <TableCell>{order?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button onClick={() => handleorderDetails(order?.id)}>
                          View Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default AdminOrders;
