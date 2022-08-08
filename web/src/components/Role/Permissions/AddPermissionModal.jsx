import { Input } from "@/components/Common/Input";
import React from "react";

const AddPermissionModal = ({ onDiscard, onSubmit, ...props }) => {
  return (
    <div className="card  bg-white">
      <div className="card-body">
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl text-violet-900">Add Permission</div>
          <div className=" text-violet-900">
            Permissions you may use and assign to your users.
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Input label="Permission name" placeholder="Permission name" />
          <div>
            <input
              className="accent-violet-600"
              type="checkbox"
              id="core"
              value="core"
            />
            <label for="core"> Set as core</label>
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="v-btn-primary w-32"
              onClick={onSubmit}
            >
              Submit
            </button>
            <button type="submit" className="v-btn" onClick={onDiscard}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPermissionModal;
