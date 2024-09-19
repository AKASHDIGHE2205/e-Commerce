import axios from "axios";
import { FormEvent, memo } from "react";
import { toast } from "react-toastify";

const Delete = ({ id, fetchData }: any) => {
  console.log("FRomDELETE");

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3001/delEntry/${id}`);
      if (response.status === 200) {
        fetchData();
        toast.success(response.data.message);
        closeModal();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const closeModal = () => {
    const dialog = document.getElementById('delModal') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
      <dialog id="delModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="font-serif text-lg flex justify-center mb-4 text-red-400">Are you sure you want to delete user ?</div>
          <form>
            <div className="flex justify-center gap-4">
              <div>
                <button type="button" onClick={handleClose} className="btn btn-outline">
                  No
                </button>
              </div>
              <div>
                <button type="button" onClick={handleDelete} className="btn btn-outline btn-error">
                  Yes
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default memo(Delete);
