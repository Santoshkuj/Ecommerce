import {Airplay,Layers3,LayoutDashboard,ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  const adminMenu = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <Layers3 />,
    },
  ];
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminMenu.map((item) => (
        <div
          key={item.id}
          onClick={() => {navigate(item.path)
            setOpen ? setOpen(false) : null
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-600 cursor-pointer text-xl hover:bg-muted hover:text-foreground">
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className={"border-b"}>
              <SheetTitle className='flex gap-2 mt-5 mb-5'>
              <Airplay size={30} />
              <p className="text-2xl font-extrabold">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <MenuItems  setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Airplay size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  );
};
export default AdminSidebar;
