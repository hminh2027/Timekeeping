import { Image } from "antd";
const RecoveryLayout = (props) => {
  const content = (
    <div className="flex flex-wrap items-center justify-center w-full min-h-screen px-1">
      <Image
        src="https://img.freepik.com/free-vector/tiny-people-protecting-business-data-legal-information-isolated-flat-illustration_74855-11121.jpg"
        preview={false}
        alt="image"
        className="lg:border-solid lg:border-r-2 lg:border-r-gray-100"
      />
      {props.children}
    </div>
  );
  return content;
};

export default RecoveryLayout;
