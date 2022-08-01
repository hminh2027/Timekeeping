import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUserMutation } from "src/rest/user/user.query";
const DeleteNotification = (props) => {
  const { mutate: doDelete } = useDeleteUserMutation();
  const queryClient = useQueryClient();
  async function handleDelete(id) {
    await doDelete(id, {
      onSuccess: () => {
        console.log("success");
        props.hide(false);
        queryClient.invalidateQueries(["get-user"]);
      },
    });
  }
  return (
    <>
      <div className="card">
        <div className="card-body ">
          <div className=" mb-6 justify-center text-center text-xl font-bold">
            Do you really want to delete this user?
          </div>
          <div className="flex">
            <button
              onClick={() => props.hide(false)}
              className="m-auto mt-3 w-1/3 rounded-lg border border-solid border-teal-600 p-1 text-black hover:shadow-xl hover:bg-teal-600 hover:text-white"
            >
              No
            </button>
            <button
              onClick={() => handleDelete(props.id)}
              className="m-auto mt-3 w-1/3 rounded-lg border border-solid border-teal-600 bg-teal-600 p-1 text-black hover:shadow-xl hover:text-white"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNotification;
