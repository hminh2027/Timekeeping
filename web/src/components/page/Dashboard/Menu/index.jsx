import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
const SidebarMenu = () => {
  return (
    <div className="flex flex-col text-sm w-full border-r border-r-gray-100 ">
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
const MobileMenu = () => {
  return (
    <div className="flex justify-evenly w-full text-sm">
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