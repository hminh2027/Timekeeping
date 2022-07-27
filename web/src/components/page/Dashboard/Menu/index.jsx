import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
import { logOut } from "@/api/service/auth.service";
const SidebarMenu = () => {
  return (
    <div className="hidden flex-col content-between justify-between  lg:flex ">
      <div className="flex-col space-y-4 border-r-2 border-r-gray-100 bg-[#ffffff]  py-4 px-5 text-sm">
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
const MobileMenu = () => {
  return (
    <div className="flex w-full justify-evenly text-sm lg:hidden">
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
  );
};
export { SidebarMenu, MobileMenu };
