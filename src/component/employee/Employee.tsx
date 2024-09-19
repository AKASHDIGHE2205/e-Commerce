import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Employee = () => {
  const [data, setData] = useState<any[]>([]);
  const [delid, setDelId] = useState<number>(0);
  const [edid, setEdId] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [newid, setNewid] = useState<number>(0);
  const [check, setCheck] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 8;


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/viewEntry');
      if (response.status === 201) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, data]);

  const handleDelete = useCallback((id: number) => {
    setDelId(id);
    const dialog = document.getElementById('delModal') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }, [delid]);

  const handleAdd = useCallback(() => {
    setNewid(newid + 1);
    const dialog = document.getElementById('add') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }, [newid]);

  const handleEdit = useCallback((item: any) => {
    setEdId(item);
    const dialog = document.getElementById('edit') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  }, [edid]);

  const handleCheck = (id: number) => {
    setCheck([...check, id])
  }

  const handleDeleteAll = async () => {
    const body = {
      ids: check
    }
    try {
      const response = await axios.post('http://localhost:3001/delete-all', body);
      if (response.status == 200) {
        fetchData();
        toast.success(response.data.message)
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }


  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemperPage;
  const indexOfFirstItem = indexOfLastItem - itemperPage;

  const currentItems: any = data.filter((item: any) =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="flex justify-between mr-5 ml-5">
        <div>
          <button className="btn btn-success btn-outline" onClick={handleAdd}>Add Emp</button>
        </div>
        <div>
          Search:
          <input
            type="text"
            className="input input-bordered"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <span>
          <select className="select select-bordered w-full max-w-xs">
            <option selected></option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </span>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td><input type="checkbox" onChange={() => handleCheck(item.id)} /></td>
                  <td>{index + 1}</td>
                  <th className="hidden">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <tr className="flex gap-2 justify-start">
                      <div>
                        <button className="btn btn-success btn-sm btn-outline" onClick={() => handleEdit(item)}>
                          <MdModeEdit size={20} />
                        </button>
                      </div>
                      <div>
                        <button className="btn btn-error btn-sm btn-outline" onClick={() => handleDelete(item.id)}>
                          <FaRegTrashAlt size={18} />
                        </button>
                      </div>
                    </tr>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {check.length > 1 && (<button className="btn btn-outline btn-error" onClick={handleDeleteAll}>Delete all</button>)}
          <div className="flex justify-center">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemperPage}
              totalItemsCount={data.length}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              itemClass="px-4 py-2 border btn btn-sm rounded-md mr-1"
              linkClass="  hover:text-white hover:bg-blue-600"
              activeClass="bg-blue-600 text-white"
              activeLinkClass="bg-blue-600 text-white"
              prevPageText="<"
              nextPageText=">"
              innerClass="flex"
            />
          </div>
        </div>
      </div>
      <Delete id={delid} fetchData={fetchData} />
      <Add fetchData={fetchData} />
      <Edit item={edid} fetchData={fetchData} />
    </>
  );
};
export default Employee;