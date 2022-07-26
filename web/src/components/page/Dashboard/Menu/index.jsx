import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
const SidebarMenu = () => {
  return (
    <div className="flex flex-col content-between justify-between">
      <div className="flex-col space-y-4 py-4 px-5 bg-[#ffffff] hidden text-sm border-r-2 border-r-gray-100 lg:flex ">
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
    <div className="flex w-full text-sm justify-evenly lg:hidden">
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
