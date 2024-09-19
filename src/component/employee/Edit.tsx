import axios from "axios";
import { FormEvent, memo, useState } from "react";
import { toast } from "react-toastify";

const Edit = ({ item, fetchData }: any) => {
  console.log("FROm EDIT");

  const [inputs, setInputs] = useState({
    name: item.name,
    address: "",
    mobile: 0,
    email: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      name: inputs.name,
      address: inputs.address,
      mobile: inputs.mobile,
      email: inputs.email,
      id: item.id
    };

    try {
      const response = await axios.put("http://localhost:3001/editEntry", body);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchData();
        const dialog = document.getElementById('edit') as HTMLDialogElement;
        if (dialog) {
          dialog.close();
        }
      }
    } catch (error: any) {
      toast.warn("Nothing to Update...!");
      const dialog = document.getElementById('edit') as HTMLDialogElement;
      if (dialog) {
        dialog.close();
      }
    }
  };

  const handleCancel = () => {
    const dialog = document.getElementById('edit') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <>
      <dialog id="edit" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCancel}>✕</button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <h1 className="text-xl font-serif">Employee Form</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full"
                defaultValue={item.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="input input-bordered w-full"
                defaultValue={item.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium">Mobile:</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                className="input input-bordered w-full"
                defaultValue={item.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                defaultValue={item.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button type="submit" className="btn btn-outline btn-success">
                Submit
              </button>
              <button type="button" className="btn btn-outline btn-error" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default memo(Edit);
