import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
const SidebarMenu = () => {
  return (
    <div className="flex-col space-y-4 p-4 bg-[#fafafa] hidden w-full text-sm border-r border-r-gray-100 lg:flex lg:max-w-[300px]">
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
