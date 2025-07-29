import { Pagination, Stack } from "@mui/material";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


/* eslint-disable react/prop-types */
const Table = ({
  cols,
  data,
  totalPages,
  page,
  handlePageChange,
  isTableLoading,
}) => {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setSortConfig({ key: "default", direction: "desc" });
  }, []);

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sortedItems = [...data];
      sortedItems.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "number" && typeof valueB === "number") {
          // Sort numbers
          return sortConfig.direction === "asc"
            ? valueA - valueB
            : valueB - valueA;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          // Sort strings
          const stringA = valueA.toLowerCase();
          const stringB = valueB.toLowerCase();
          if (stringA < stringB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (stringA > stringB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        if (valueA instanceof Date && valueB instanceof Date) {
          // Sort dates
          if (valueA < valueB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        // Convert strings to dates and compare
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        if (!isNaN(dateA) && !isNaN(dateB)) {
          if (dateA < dateB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (dateA > dateB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        // Default comparison (considering unknown types as strings)
        const unknownStringA = String(valueA).toLowerCase();
        const unknownStringB = String(valueB).toLowerCase();
        if (unknownStringA < unknownStringB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (unknownStringA > unknownStringB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      return sortedItems;
    }

    return data;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="p-2 bg-primaryDarkCards rounded-lg border border-primaryGray-700 overflow-x-auto table-content" >
      <table className="min-w-full divide-y divide-gray-200 suppportable" >
        {/* style={{width:"100%", whiteSpace:"nowrap", tableLayout:"fixed"}} */}

        <thead>
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                style={{
                  cursor: col.sortable ? "pointer" : "default",
                }}
                className="px-6 py-3 text-left text-ellipsis text-xs font-semibold text-gray-500 uppercase tracking-wider"
                onClick={() => (col.sortable ? requestSort(col.key) : null)}

              >
                <div className="flex justify-center">
                  {col.title}
                  {col.sortable && (
                    <span>
                      {sortConfig.key === col.key && (
                        <span>
                          {sortConfig.direction === "asc" ? (
                            <ArrowUpDownIcon className="filterarrow" />
                          ) : (
                            <ArrowUpDownIcon className="filterarrow" />
                          )}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* <tbody className=" divide-y divide-gray-600">
          {data.map((item, rowIndex) => (
            <tr key={item.key}>
              {cols.map((col, colIndex) => (
                <td
                  key={col.key}
                  className={`px-6 py-4 whitespace-nowrap ${
                    col.colored ? "text-gradient font-semibold" : ""
                  }`}
                >
                  {col.render
                    ? col.render(item, rowIndex)
                    : item[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}

        <tbody className="divide-y divide-gray-200">
          {isTableLoading ? (
            <tr>
              <td colSpan={cols.length} className="text-center py-10">
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data?.length > 0 ? (
            sortedData().map((item, rowIndex) => (
              <tr key={rowIndex} className="bg-white hover:bg-gray-50 transition-colors">
                {cols.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 text-xs font-medium text-gray-700 tracking-wider ${col.colored ? "text-gradient font-semibold truncate" : ""}`}
                    style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {col.render ? col.render(item, rowIndex) : item[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={cols?.length} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center">
                  <img src="/datanotfound.svg" alt="No data" className="m-auto w-40" />
                </div>
              </td>
            </tr>
          )}
        </tbody>




      </table>

      <Stack spacing={2} direction="row" className="mt-3 flex justify-between">
        {/* <select
          className=" p-2 bg-primaryDarkCards rounded-lg border border-primaryGray-700 overflow-x-auto text-sm"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          style={{ borderRadius: "4px" }}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select> */}
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default Table;
