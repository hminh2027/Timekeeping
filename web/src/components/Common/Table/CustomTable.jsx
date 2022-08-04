const CustomTable = ({ dataSource, columns }) => {
  const [data, setData] = useState([]);
  const dataConversion = (dataToConvert, columns) => {
    let deepClone = JSON.parse(JSON.stringify(dataToConvert));

    columns.map((col) => {
      if (typeof col.render === "function") {
        for (let i = 0; i < deepClone.length; i++) {
          deepClone[i][col.key] = col.render(dataToConvert[i]);
        }
      }
    });
    return deepClone;
  };

  const dataSelection = (dataToSelect, columns) => {
    let clone = JSON.parse(JSON.stringify(dataToSelect));
    const keys = columns.map((col, key) => col.key);
    clone.forEach((data) => {
      for (const key of Object.keys(data))
        if (!keys.includes(key)) delete data[key];
    });
    return clone;
  };

  useEffect(() => {
    const selectedData = dataSelection(dataSource, columns);
    const convertedData = dataConversion(selectedData, columns);
    setData(convertedData);
  }, [columns, dataSource]);

  return (
    <>
      <table className="w-full  text-left">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-3 font-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="

        "
        >
          {data.map((item, key) => (
            <tr key={key} className="border-b bg-white">
              {Object.keys(item).map((key) => (
                <td key={key} scope="row" className="px-6 py-4 text-gray-500">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isPaginate && <div className="mt-5"></div>} */}
    </>
  );
};
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";

export default CustomTable;
