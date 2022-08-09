import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetUserIdQuery,
  usePostUserMutation,
  useUpdateUserMutation,
} from "src/rest/user/user.query";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { InputPassword } from "@/components/Common/Input";
const CreateUser = ({ userData, Name, hide, id, click, ...props }) => {
  const [isShow, setIsShow] = useState(true);
  const [UserData, setUserData] = useState(userData);
  const handleClick = () => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };
  const { mutate: doPost } = usePostUserMutation();
  const queryClient = useQueryClient();
  async function handlePost(data) {
    await doPost(data, {
      onSuccess: () => {
        console.log("success");
        hide(false);
        queryClient.invalidateQueries(["get-user"]);
      },
    });
  }

  const { mutate: doUpdate } = useUpdateUserMutation();
  async function handleUpdate(data) {
    await doUpdate(
      { ...data, id: id },
      {
        onSuccess: () => {
          console.log("success");
          hide(false);
          queryClient.invalidateQueries(["get-user"]);
        },
      }
    );
  }
  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    console.log(UserData);
  };
  return (
    <div className="card w-[500px] lg:w-[600px] xl:w-[700px]  ">
      <div className="card-body flex flex-col">
        <div className="w-1/3 bg-yellow-400"></div>
        <div>
          <div className="flex-1 justify-center text-center text-xl font-bold  text-emerald-500">
            {Name}
          </div>
          <div className="mb-6 mt-[-1px] border-[1px] border-double border-emerald-400"></div>
          <div className={styles[`input-wrapper`]}>
            <div className={styles[`input-list`]}>
              <Input
                type="text"
                name={"Email"}
                nameInput={"email"}
                hanlde={(e) => handleChange(e)}
                value={UserData?.email}
              />
              <Input
                type="text"
                name={"FirstName"}
                nameInput={"firstName"}
                hanlde={(e) => handleChange(e)}
                value={UserData?.firstName}
              />
              <Input
                type="text"
                name={"LastName"}
                nameInput={"lastName"}
                hanlde={(e) => handleChange(e)}
                value={UserData?.lastName}
              />
              <Input
                type="radio"
                name="Role"
                value={UserData?.role}
                handle={(e) => handleChange(e)}
              />
              <div className="flex items-center gap-4">
                <div style={{ minWidth: "5em" }}>Password:</div>
                <InputPassword
                  className="w-full"
                  name="password"
                  value={UserData?.password}
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {click == "CREATE" ? (
              <Button handle={() => handlePost(UserData)} name="Create" />
            ) : (
              <Button handle={() => handleUpdate(UserData)} name="Edit" />
            )}
            <button
              onClick={() => hide()}
              className="ml-3 mt-3 w-1/3 self-end rounded-lg border border-solid border-gray-500 p-1 text-black hover:bg-gray-500 hover:text-white hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = (props) => {
  const Roles = [
    {
      roles: "user",
      icon: <AiOutlineUser size={"25px"} />,
    },
    {
      roles: "admin",
      icon: <RiAdminLine size={"25px"} />,
    },
  ];

  const [role, setRole] = useState(props.value ? props.value : Roles[0].roles);
  const handleRole = (e) => {
    setRole(e.target.value);
    props.handle(e);
  };
  return (
    <div className="flex items-center gap-4">
      <div style={{ minWidth: "5em" }}>{props.name}:</div>
      {props.type == "text" ? (
        <input
          type={props.type}
          name={props.nameInput}
          placeholder={props.name}
          value={props.value}
          className="v-input flex-1"
          onChange={props.hanlde}
        />
      ) : (
        <div
          className="flex"
          onClick={(e) => {
            handleRole(e);
          }}
        >
          {Roles.map((data) => {
            console.log({ data, role });
            return (
              <div class="mb-4 flex items-center">
                <input
                  defaultChecked={data.roles == role}
                  name="role"
                  value={data.roles}
                  type="radio"
                  class="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                  onChange={() => setRole(Roles.roles)}
                />
                <label
                  for={data.roles}
                  class="ml-3 mr-7 text-sm font-medium text-gray-900"
                >
                  {data.icon}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Tooltip = () => {
  return (
    <div
      id="tooltip-default"
      role="tooltip"
      class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 py-2 px-3 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
    >
      Tooltip content
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

const Button = (props) => {
  return (
    <button
      onClick={props.handle}
      className="mt-3 w-1/3 self-end rounded-lg border border-solid border-teal-600 p-1 text-black hover:bg-teal-600 hover:text-white hover:shadow-xl"
    >
      {props.name}
    </button>
  );
};

export default CreateUser;
