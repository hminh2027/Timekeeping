import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostUserMutation } from "src/rest/user/user.query";


const CreateUser = (props) => {
    const [UserData, setUserData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    const {mutate:  doPost} = usePostUserMutation();
    const queryClient = useQueryClient()
    async function handleSubmit(data){
        await doPost(data,{
        onSuccess: ()=>{
            console.log("success")
            props.hide(false)
            queryClient.invalidateQueries(['get-user'])

        }
        })
    }
    const handleChange = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
    };
    return (
    <>
      <div className="card">
        <div className="card-body ">
          <div className=" text-xl font-bold text-center justify-center mb-6">
            Create User
          </div>
          <div className={styles[`input-wrapper`]}>
            <div className={styles[`input-list`]}>
              <div className="flex ">
                <div className="w-4/12 p-2 text-sm text-center justify-center font-medium dark:text-gray-300">
                  Email:
                </div>
                <input
                  className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={UserData.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex ">
                <div className="w-4/12 p-2 text-sm text-center justify-center font-medium dark:text-gray-300">
                  FirstName:
                </div>
                <input
                  className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                  value={UserData.firstName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex ">
                <div className="w-4/12 p-2 text-sm text-center justify-center font-medium dark:text-gray-300">
                  LastName:
                </div>
                <input
                  className="flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  type="text"
                  name="lastName"
                  placeholder="LastName"
                  value={UserData.lastName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex">
                <div className="w-4/12 p-2 text-sm text-center justify-center font-medium dark:text-gray-300">
                  Password:
                </div>
                <input
                  type="password"
                  className=" flex-1 border border-solid border-gray-300 p-2 text-gray-500"
                  name="password"
                  value={UserData.password}
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
          </div>
          <button onClick={() => handleSubmit(UserData)} className="mt-3 m-auto w-1/3 border border-solid border-teal-600 shadow-xl hover:bg-teal-600 hover:text-white p-1 rounded-lg text-black">Submit</button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;