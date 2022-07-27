import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
const SidebarMenu = () => {
  return (
    <div className="hidden w-full flex-col space-y-4 border-r border-r-gray-100 bg-[#fafafa] p-4 text-sm lg:flex lg:max-w-[300px]">
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
export default SidebarMenu;
