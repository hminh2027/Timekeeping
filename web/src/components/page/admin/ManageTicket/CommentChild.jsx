const CommentChild = ({ id,userId, content }) => {
  if (id == userId) {
    return (
      <div className="flex justify-start">
        <div className="w-min mt-1 border border-solid border-teal-500 rounded-2xl truncate p-2 bg-slate-100">
          <p className="mr-auto">{content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end">
        <div className="w-min mt-1 border border-solid border-teal-500 rounded-2xl truncate p-2 bg-emerald-400 text-gray-700">
          <p className="ml-auto">{content}</p>
        </div>
      </div>
    );
  }
};

export default CommentChild;
