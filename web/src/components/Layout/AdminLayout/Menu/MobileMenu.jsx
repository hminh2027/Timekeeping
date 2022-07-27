import { menuItems } from "./Menu.config";
import MenuLabel from "./MenuLabel";
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
export default MobileMenu;
