import { menuItems } from "./Menu.config";
import MenuLabel from "@/components/page/Dashboard/Menu/MenuLabel";
const SidebarMenu = () => {
  return (
    <div className="flex flex-col content-between justify-between border-r-2 border-r-gray-100 lg:flex ">
      <div className="flex-col space-y-4 py-4 px-5 bg-[#ffffff]  text-sm ">
        {menuItems.map((menuItem) => (
          <MenuLabel
            key={menuItem.value}
            href={menuItem.value}
            icon={menuItem.icon}
            label={menuItem.label}
            id={menuItem.id}
          />
        ))}
      </div>
      <button className="v-menu-item" onClick={async () => await logOut()}>
        Logout
      </button>
    </div>
  );
};
export default SidebarMenu;
