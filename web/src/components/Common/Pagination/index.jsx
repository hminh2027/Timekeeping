import { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
const Pagination = ({ total, currentPage, onChange }) => {
  const [curPage, setCurPage] = useState(currentPage || 1);

  useEffect(() => {
    onChange(curPage);
  }, [curPage]);
  console.log(total);
  total = total || 10;
  const size = total < 5 ? 0 : 5;
  const margin = size ? Math.floor(size / 2) : Math.floor(total / 2);
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
          className={number === curPage ? "text-violet-400" : ""}
        />
      );
    }
    return res;
  };

  const rightBorder = () => {
    const res = [];
    for (let number = total - size + 1; number <= total; number++) {
      res.push(
        <Btn
          key={number}
          onClick={() => setCurPage(number)}
          num={number}
          className={number === curPage ? "text-violet-400" : ""}
        />
      );
    }
    return res;
  };
  const Btn = (props) => {
    return (
      <div
        className={`min-h-8 flex min-w-8 cursor-pointer select-none items-center justify-center rounded-md  ${
          curPage === props.num ? "bg-primary text-white" : "text-gray-500"
        }  hover:bg-primary hover:text-white ${props.className}`}
        onClick={() => props.onClick()}
      >
        {props.num}
      </div>
    );
  };
  return (
    <div className="flex justify-end gap-2 text-center">
      <div
        disabled={curPage === 1 ? true : false}
        className={`min-h-8 flex min-w-8 select-none items-center justify-center rounded-md ${
          curPage === 1
            ? "cursor-not-allowed bg-smoke"
            : "cursor-pointer hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === 1) return;
          setCurPage(curPage - 1);
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
        content[content.length - 1] < total &&
        content.map((number) => {
          return (
            <Btn key={number} onClick={() => setCurPage(number)} num={number} />
          );
        })}
      {size === 0 &&
        content.map((number) => (
          <Btn
            key={number}
            onClick={() => setCurPage(++number)}
            num={++number}
          />
        ))}
      {content[size - 1] >= total && rightBorder()}
      {content[size - 1] < total && (
        <>
          <div className="select-none">...</div>
          <Btn key={total} onClick={() => setCurPage(total)} num={total} />
        </>
      )}

      <div
        disabled={curPage === total ? true : false}
        className={`min-h-8 flex min-w-8  select-none  items-center justify-center rounded-md  ${
          curPage === total
            ? "cursor-not-allowed bg-smoke"
            : "cursor-pointer hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === total) return;
          setCurPage(curPage + 1);
          props.onClick && props.onClick();
        }}
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default Pagination;
