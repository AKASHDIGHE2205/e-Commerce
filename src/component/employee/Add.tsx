import axios from "axios";
import { FormEvent, memo, useState } from "react";
import { toast } from "react-toastify";

const Add = ({ fetchData }: any) => {
  console.log("FROM ADD");

  const [input, setInput] = useState({
    name: "",
    address: "",
    mobile: 0,
    email: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      name: input.name,
      address: input.address,
      mobile: input.mobile,
      email: input.email
    };
    try {
      const response = await axios.post('http://localhost:3001/newEntry', body);
      if (response.status === 201) {
        toast.success(response.data.message);
        fetchData();
        // Clear the input fields and close the modal after successful submission
        handleCancel();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "There was an error submitting the form.");
    }
  };

  const handleCancel = () => {
    const dialog = document.getElementById('add') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
    setInput({
      name: "",
      address: "",
      mobile: 0,
      email: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <dialog id="add" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
                value={input.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="input input-bordered w-full"
                value={input.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium">Mobile:</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                className="input input-bordered w-full"
                value={input.mobile.toString()}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                value={input.email}
                onChange={handleChange}
                required
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
    </div>
  );
};

export default memo(Add);
