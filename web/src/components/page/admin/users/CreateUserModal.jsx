import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostUserMutation } from "src/rest/user/user.query";

const CreateUser = (props) => {
  const [UserData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const { mutate: doPost } = usePostUserMutation();
  const queryClient = useQueryClient();
  async function handleSubmit(data) {
    await doPost(data, {
      onSuccess: () => {
        console.log("success");
        props.hide(false);
        queryClient.invalidateQueries(["get-user"]);
      },
    });
  }
  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    console.log(UserData)
  };
  return (
    <div className="card w-[500px] lg:w-[600px] xl:w-[700px]  ">
      <div className="card-body flex flex-col">
        <div
          className="bg-yellow-400 w-1/3"
        >
        </div>
        <div>
          <div className="flex-1 justify-center text-center text-xl font-bold  text-emerald-500">
            Create User
          </div>
          <div className="mb-6 mt-[-1px] border-[1px] border-double border-emerald-400"></div>
          <div className={styles[`input-wrapper`]}>
            <div className={styles[`input-list`]}>
              <Input
                type="text"
                name={"Email"}
                nameInput={"email"}
                hanlde={(e) => handleChange(e)}
                value= {UserData.email}
              />
              <Input
                type="text"
                name={"FirstName"}
                nameInput={"firstName"}
                hanlde={(e)=> handleChange(e)}
                value={UserData.firstName}
              />
              <Input
                type="text"
                name={"LastName"}
                nameInput={"lastName"}
                hanlde={(e)=> handleChange(e)}
                value={UserData.lastName}
              />
              <Input
                type="password"
                name={"Password"}
                nameInput={"password"}
                hanlde={(e)=> handleChange(e)}
                value={UserData.password}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleSubmit(UserData)}
              className="self-end mt-3 w-1/3 rounded-lg border border-solid border-teal-600 p-1 text-black hover:shadow-xl hover:bg-teal-600 hover:text-white"
            >
              Submit
            </button>
            <button
              onClick={() => handleSubmit(UserData)}
              className="self-end ml-3 mt-3 w-1/3 rounded-lg border border-solid border-gray-500 p-1 text-black hover:shadow-xl hover:bg-gray-500 hover:text-white"
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
  return (
    <div className="flex items-center gap-4">
      <div style={{ minWidth: "5em" }}>{props.name}:</div>
      <input
        type={props.type}
        name={props.nameInput}
        placeholder={props.name}
        value={props.value}
        className="v-input flex-1"
        onChange={props.hanlde}
      />
    </div>
  )
}

export default CreateUser;
