import React from "react";

const MessageRow = ({ id, userId, content }) => {
  if (id !== userId) {
    return (
      <div className="flex justify-start">
        <div className="mt-1 w-max max-w-32 break-all rounded-2xl border border-solid border-teal-500 bg-slate-100 p-2">
          <div className="mr-auto max-w-32 break-all">{content}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end">
        <div className="mt-1 w-max max-w-32 break-all rounded-2xl border border-solid border-teal-500 bg-emerald-400 p-2 text-gray-700">
          <div className="ml-auto max-w-32 break-all">{content}</div>
        </div>
      </div>
    );
  }
};

export default MessageRow;
