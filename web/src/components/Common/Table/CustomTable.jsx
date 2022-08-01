import React, { useEffect, useState } from "react";

const CustomTable = ({ dataSource, columns }) => {
  const [data, setData] = useState([]);

  const dataConversion = (dataToConvert, columns) => {
    columns.map((col) => {
      if (col.render) {
        dataToConvert.map((dataProp) => {
          dataProp[col.key] = col.render(dataProp);
        });
      }
    });
    return dataToConvert;
  };

  const dataSelection = (datasource, columns) => {
    const keys = columns.map((col, key) => col.key);
    datasource.forEach((data) => {
      for (const key of Object.keys(data))
        if (!keys.includes(key)) delete data[key];
    });
    return datasource;
  };

  useEffect(() => {
    const selectedData = dataSelection(dataSource, columns);
    const convertedData = dataConversion(selectedData, columns);
    setData(convertedData);
  }, [columns, dataSource]);

  return (
    <table className="w-full text-left ">
      <thead className="bg-gray-50 ">
        <tr>
          {columns.map((col) => (
            <th key={col.key} scope="col" className="px-6 py-3 font-semibold">
              <div className="flex">{col.title}</div>
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
