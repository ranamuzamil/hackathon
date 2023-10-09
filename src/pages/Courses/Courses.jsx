import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Header/Sidebar";
import db from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { Link } from "react-router-dom";
import { Modal, Ripple, initTE } from "tw-elements";
initTE({ Modal, Ripple });

const Courses = () => {

  const [cName, setCName] = useState("");
  const [cCode, setCCode] = useState("");
  const [description, setDescription] = useState("");

  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data());
    });
    setCourses(array);
  };
  useEffect(() => {
    fetchData();
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tasks");
    try {
      await updateDoc(taskDocRef, {
        cName: cName,
        cCode: cCode,
        description: description,
      });
    } catch (err) {
      alert(err);
    }
  };


  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "courses", id);
    try {
      await deleteDoc(taskDocRef.id);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        cName: cName,
        cCode: cCode,
        description: description,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
    setCName("");
    setCCode("");
    setDescription("");
  };



  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col ml-80 w-2/3">
      <hr/>

        <div className="flex justify-between text-end p-2">
          <h2>Add Course</h2>
          <button
            type="button"
            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Add New
          </button>

          <div
            data-te-modal-init
            class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              data-te-modal-dialog-ref
              class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
            >
              <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <h5
                    class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalLabel"
                  >
                    Add New Course Here
                  </h5>

                  <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="relative flex-auto p-4" data-te-modal-body-ref>
                  <form
                    onSubmit={handleSubmit}
                    className=" flex m-auto bg-gray-200 gap-5 flex-col h-96 border-gray-600 rounded-2xl border-2 p-10 w-96"
                    name="addTask"
                  >
                    <input
                      type="text"
                      className="h-12 p-2"
                      name="cName"
                      onChange={(e) => setCName(e.target.value.toUpperCase())}
                      value={cName}
                      placeholder="Course Name"
                    />
                    <input
                      type="text"
                      className="h-12 p-2"
                      name="cCode"
                      onChange={(e) => setCCode(e.target.value.toUpperCase())}
                      value={cCode}
                      placeholder="Course Code"
                    />
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className="h-12 p-2"
                      placeholder="Description About Course"
                      value={description}
                    ></textarea>
                    <button
                      className="h-12 p-2 text-yellow-50 bg-green-700"
                      type="submit"
                    >
                      Add Course
                    </button>
                  </form>
                </div>

                <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <h2>Current Courses</h2>
        <hr />

        {courses.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((product, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{product.cName}</td>
                      <td>{product.cCode}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => {
                            handleUpdate(product);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="button text-red-50 bg-red-600"
                          onClick={() => {
                            handleDelete(product);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-red-600"></div>
          </div>
        )}




      </div>
    </div>
  );
};


export default Courses;
