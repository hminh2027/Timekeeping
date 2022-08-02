import { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
const Pagination = (props) => {
  const [curPage, setCurPage] = useState(props.curPage || 10);
  const totalPages = props.totalPages || 10;
  const size = props.size || 5;
  const margin = Math.floor(size / 2);
  const content = [];

  for (let number = curPage - margin; number <= curPage + margin; number++) {
    content.push(number);
  }

  const leftBorder = () => {
    const res = [];
    for (let number = 1; number <= size; number++) {
      res.push(
        <Btn
          key={number}
          onClick={() => setCurPage(number)}
          num={number}
          className={
            number === curPage ? "border-violet-400 text-violet-400" : ""
          }
        />
      );
    }
    return res;
  };

  const rightBorder = () => {
    const res = [];
    for (let number = totalPages - size + 1; number <= totalPages; number++) {
      res.push(
        <Btn
          key={number}
          onClick={() => setCurPage(number)}
          num={number}
          className={
            number === curPage ? "border-violet-400 text-violet-400" : ""
          }
        />
      );
    }
    return res;
  };
  const Btn = (props) => {
    return (
      <div
        className={`min-h-8 flex min-w-8 cursor-pointer select-none items-center  justify-center rounded-lg border ${
          curPage === props.num
            ? "border-[#cdf0ea] text-[#cdf0ea]"
            : "border-gray-500 text-gray-500"
        } hover:border-[#cdf0ea] hover:text-[#cdf0ea] ${props.className}`}
        onClick={() => props.onClick()}
      >
        {props.num}
      </div>
    );
  };
  return (
    <div className="flex gap-2">
      <div
        disabled={curPage === 1 ? true : false}
        className={`min-h-8 flex min-w-8  select-none items-center justify-center rounded-lg border  ${
          curPage === 1
            ? "cursor-not-allowed border-gray-400 text-gray-400"
            : "cursor-pointer border-gray-500  hover:border-[#cdf0ea] hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === 1) return;
          setCurPage(--curPage);
          props.onClick && props.onClick();
        }}
      >
        <FaAngleLeft />
      </div>
      {content[size - 1] <= size && leftBorder()}
      {content[size - 1] > size && (
        <>
          <Btn key={1} onClick={() => setCurPage(1)} num={1} />
          <div className="select-none">...</div>
        </>
      )}

      {content[size - 1] > size &&
        content[content.length - 1] < totalPages &&
        content.map((number) => {
          return (
            <Btn key={number} onClick={() => setCurPage(number)} num={number} />
          );
        })}

      {content[size - 1] >= totalPages && rightBorder()}
      {content[size - 1] < totalPages && (
        <>
          <div className="select-none">...</div>
          <Btn
            key={totalPages}
            onClick={() => setCurPage(totalPages)}
            num={totalPages}
          />
        </>
      )}

      <div
        disabled={curPage === totalPages ? true : false}
        className={`min-h-8 flex min-w-8  select-none  items-center justify-center rounded-lg border  ${
          curPage === totalPages
            ? "cursor-not-allowed border-gray-400 text-gray-400"
            : "cursor-pointer  border-gray-400 text-gray-400 hover:border-[#cdf0ea] hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === totalPages) return;
          setCurPage(++curPage);
          props.onClick && props.onClick();
        }}
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default Pagination;
