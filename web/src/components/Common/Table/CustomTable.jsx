import React, { useEffect, useState } from "react";

const CustomTable = ({ dataSource, columns }) => {
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    const selectedData = dataSelection(data, columns);
    const convertedData = dataConversion(selectedData, columns);
    setData(convertedData);
  }, []);

  const dataConversion = (data, columns) => {
    columns.map((col) => {
      if (col.render) {
        dataSource.map((data, key) => {
          data[col.key] = col.render(data);
        });
      }
    });
    return data;
  };

  const dataSelection = (data, columns) => {
    const keys = columns.map((col, key) => col.key);
    data.forEach((data) => {
      for (const key of Object.keys(data))
        if (!keys.includes(key)) delete data[key];
    });
    return data;
  };

  return (
    <table className="w-full text-left ">
      <thead className="bg-gray-50 ">
        <tr>
          {columns.map((col) => (
            <th key={col.key} scope="col" className="px-6 py-3 font-semibold">
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr key={key} className="border-b bg-white ">
            {Object.keys(item).map((key) => (
              <td key={key} scope="row" className="px-6 py-4 text-gray-500">
                {item[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
