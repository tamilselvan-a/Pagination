import React, { useState, useMemo, useCallback, useEffect } from "react";
import PageinationData from "./PageinationData";
import { data } from "../data/data";

const DataListDet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [err,setErr] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
        searchTerm || (setErr(''))
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); 
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  console.log(searchTerm,"searchTerm")
  const filteredData = useMemo(() => {
    return data.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ? item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    : setErr("No data Found")
);

  }, [debouncedSearch]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const handlePageSizeinText = (e) =>{
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div>
      <h2>Paginated Data with Search</h2>

    
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

  
      <select value={itemsPerPage} onChange={handlePageSizeChange}>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
      </select>
    <input type="text" placeholder="Enter Data Size" onChange={handlePageSizeinText} value={itemsPerPage}/>
  
      {err && <p>{err}</p>}
      <ul>
        {currentData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <PageinationData
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DataListDet;
