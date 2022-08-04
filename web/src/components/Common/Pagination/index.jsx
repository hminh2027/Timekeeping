import React, { useState, useTransition } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Pagination = React.memo(({ total, currentPage, onChange }) => {
  const [isPending, startTransition] = useTransition();
  const [curPage, setCurPage] = useState(currentPage || 1);

  const size = total < 5 ? 0 : 5;
  const margin = size ? Math.floor(size / 2) : 0;
  const content = [];

  const pageClickedHandler = (page) => {
    startTransition(() => {
      setCurPage(page);
      onChange(page);
    });
  };
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
  const calContent = () => {
    if (size !== 0) {
      for (
        let number = curPage - margin;
        number <= curPage + margin;
        number++
      ) {
        content.push(number);
      }
    } else {
      for (let number = 1; number <= total; number++) {
        content.push(number);
      }
    }
  };

  calContent();
  const Btn = (props) => {
    return (
      <div
        className={`min-h-8 flex min-w-8 cursor-pointer select-none items-center justify-center rounded-md  ${
          curPage === props.num ? "bg-primary text-white" : "text-gray-500"
        }  hover:bg-primary hover:text-white ${props.className}`}
        onClick={() => pageClickedHandler(props.num)}
      >
        {props.num}
      </div>
    );
  };
  const lowTotal = content.map((number) => (
    <Btn
      key={number}
      onClick={() => {
        pageClickedHandler(number);
      }}
      num={number}
    />
  ));
  const normal = (
    <>
      {content[size - 1] <= size && leftBorder()}
      {content[size - 1] > size && (
        <>
          <Btn key={1} onClick={() => pageClickedHandler(1)} num={1} />
          <div className="select-none">...</div>
        </>
      )}

      {content[size - 1] > size &&
        content[content.length - 1] < total &&
        content.map((number) => {
          return (
            <Btn
              key={number}
              onClick={() => pageClickedHandler(number)}
              num={number}
            />
          );
        })}
      {content[size - 1] >= total && rightBorder()}
      {content[size - 1] < total && (
        <>
          <div className="select-none">...</div>
          <Btn
            key={total}
            onClick={() => pageClickedHandler(total)}
            num={total}
          />
        </>
      )}
    </>
  );
  return (
    <div className="flex  min-w-mobile justify-end gap-2 text-center">
      <div
        disabled={curPage === 1 ? true : false}
        className={`min-h-8 flex min-w-8 select-none items-center justify-center rounded-md ${
          curPage === 1
            ? "cursor-not-allowed bg-smoke"
            : "cursor-pointer hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === 1) return;
          pageClickedHandler(curPage - 1);
        }}
      >
        <FaAngleLeft />
      </div>
      {size === 0 ? lowTotal : normal}
      <div
        disabled={curPage === total ? true : false}
        className={`min-h-8 flex min-w-8  select-none  items-center justify-center rounded-md  ${
          curPage === total
            ? "cursor-not-allowed bg-smoke"
            : "cursor-pointer hover:text-[#cdf0ea]"
        }`}
        onClick={() => {
          if (curPage === total) return;
          pageClickedHandler(curPage + 1);
        }}
      >
        <FaAngleRight />
      </div>
    </div>
  );
});

export default Pagination;
