"use client";
import {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
  getSpesisficUser,
} from "@/services/users.services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [isOpenAddUser, setisOpenAddUser] = useState(false);
  const [isOpenPopUpEdit, setisOpenPopUpEdit] = useState(false);
  const [selectedEditData, setselectedEditData] = useState<any>([]);
  const [allDataUser, setallDataUser] = useState([]);

  const handleAddUser = async (e: any) => {
    e.preventDefault();
    if (e.target[0].value !== "" && e.target[1].value !== "") {
      try {
        const newData = {
          name: e.target[0].value,
          gender: e.target[1].value,
        };

        await addUser(newData);

        Swal.fire({
          icon: "success",
          title: "Your data have been saved!",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          setisOpenAddUser(false);
          const response = await getAllUsers();
          setallDataUser(response.data);
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Something when wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);

          Swal.fire({
            icon: "success",
            title: "Your data have been saved!",
            showConfirmButton: false,
            timer: 1500,
          }).then(async () => {
            setisOpenAddUser(false);
            const response = await getAllUsers();
            setallDataUser(response.data);
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleOpenEditData = async (id: string) => {
    try {
      const response = await getSpesisficUser(id);
      setselectedEditData(response.data);
      setisOpenPopUpEdit(true);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEditData = async (e: any) => {
    e.preventDefault();
    if (e.target[0].value !== "" && e.target[1].value !== "") {
      try {
        const newData = {
          name: e.target[0].value,
          gender: e.target[1].value,
        };

        await editUser(selectedEditData[0].id, newData);

        Swal.fire({
          icon: "success",
          title: "Your data have been saved!",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          setisOpenPopUpEdit(false);
          const response = await getAllUsers();
          setallDataUser(response.data);
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Something when wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const getAllDataUserFromApi = async () => {
      const response = await getAllUsers();
      setallDataUser(response.data);
    };

    getAllDataUserFromApi();
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-start relative">
      <div className="w-full mx-10 mt-10">
        {/* button add users */}
        <div className="w-full mb-3 flex justify-end">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-300 ease-in-out duration-300"
            onClick={() => setisOpenAddUser(!isOpenAddUser)}
          >
            Add User
          </button>
        </div>

        {/* table of users */}
        <div className="w-full">
          <table className="w-full">
            <thead className="bg-green-950 text-white">
              <tr>
              <td className="p-2 border border-green-950">No.</td>
                <td className="p-2 border border-green-950">ID</td>
                <td className="p-2 border border-green-950">Name</td>
                <td className="p-2 border border-green-950">Gender</td>
                <td className="p-2 border border-green-950">Action</td>
              </tr>
            </thead>
            <tbody>
              {allDataUser.map((res: any, index: number) => (
                <tr key={"user" + index + 1}>
                  <td className="p-2 border border-green-950">{index+1}.</td>
                  <td className="p-2 border border-green-950">{res.id}</td>
                  <td className="p-2 border border-green-950">{res.name}</td>
                  <td className="p-2 border border-green-950">{res.gender}</td>
                  <td className="p-2 border border-green-950">
                    {/* edit button */}
                    <button
                      className="bg-yellow-400 p-1 rounded-lg"
                      onClick={() => handleOpenEditData(res.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    {/* remove button */}
                    <button
                      className="bg-red-400 p-1 rounded-lg ml-2"
                      onClick={() => handleDeleteUser(res.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* pop up add user */}
      {isOpenAddUser && (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-[#9292927a]">
          <div className="bg-white max-w-[300px] w-full p-2 ">
            {/* button exit */}
            <div className="w-full flex justify-end">
              <button
                className="w-4 h-4 text-green-950 hover:text-red-500 ease-in-out duration-300"
                onClick={() => setisOpenAddUser(!isOpenAddUser)}
              >
                X
              </button>
            </div>

            {/* title */}
            <div className="text-center font-semibold my-3">ADD USER</div>

            {/* body */}
            <form onSubmit={(e: any) => handleAddUser(e)}>
              <input
                type="text"
                placeholder="Name"
                className="w-full border  border-green-950 p-2 mb-2"
              />

              <select className="w-full border  border-green-950 p-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* button */}
              <div className="w-full mt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-300 ease-in-out duration-300"
                  // onClick={() => setisOpenAddUser(!isOpenAddUser)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* pop up edit user */}
      {isOpenPopUpEdit && (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-[#9292927a]">
          <div className="bg-white max-w-[300px] w-full p-2 ">
            {/* button exit */}
            <div className="w-full flex justify-end">
              <button
                className="w-4 h-4 text-green-950 hover:text-red-500 ease-in-out duration-300"
                onClick={() => {
                  setisOpenPopUpEdit(!isOpenPopUpEdit);
                  setselectedEditData([]);
                }}
              >
                X
              </button>
            </div>

            {/* title */}
            <div className="text-center font-semibold my-3">EDIT USER</div>

            {/* body */}
            <form onSubmit={(e: any) => handleEditData(e)}>
              <input
                type="text"
                placeholder="Name"
                className="w-full border  border-green-950 p-2 mb-2"
                defaultValue={selectedEditData[0]?.name}
              />

              <select
                className="w-full border  border-green-950 p-2"
                defaultValue={selectedEditData[0]?.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* button */}
              <div className="w-full mt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-300 ease-in-out duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
