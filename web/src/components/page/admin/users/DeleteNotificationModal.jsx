import { useQueryClient } from "@tanstack/react-query";
import {useDeleteUserMutation} from "src/rest/user/user.query"
const DeleteNotification = (props) => {
  const {mutate:  doDelete} = useDeleteUserMutation();
  const queryClient = useQueryClient()
  async function handleDelete(id){
    await doDelete(id,{
      onSuccess: ()=>{
        console.log("success");
        props.hide(false);
        queryClient.invalidateQueries(['get-user']);
      }
    })
  }
  return (
    <>
      <div className="card">
        <div className="card-body ">
        <div className=" text-xl font-bold text-center justify-center mb-6">
          Do you really want to delete this user?
        </div>
        <div className="flex">
          <button onClick={() => props.hide(false)} className="mt-3 m-auto w-1/3 border border-solid border-teal-600 shadow-xl hover:bg-teal-600 hover:text-white p-1 rounded-lg text-black">No</button>
          <button onClick={() => handleDelete(props.id)} className="mt-3 m-auto w-1/3 border border-solid border-teal-600 shadow-xl bg-teal-600 hover:text-white p-1 rounded-lg text-black">Yes</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default DeleteNotification;