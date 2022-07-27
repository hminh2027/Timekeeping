const CommentChild = ({ id, userId, content }) => {
  if (id == userId) {
    return (
      <div className="flex justify-start">
        <div className="mt-1 w-min truncate rounded-2xl border border-solid border-teal-500 bg-slate-100 p-2">
          <p className="mr-auto">{content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end">
        <div className="mt-1 w-min truncate rounded-2xl border border-solid border-teal-500 bg-emerald-400 p-2 text-gray-700">
          <p className="ml-auto">{content}</p>
        </div>
      </div>
    );
  }
};

export default CommentChild;
