import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Header/Sidebar";
import db from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Courses = ({onClose}) => {
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
  useEffect(()=>{
    fetchData();
  })








  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks')
    try{
      await updateDoc(taskDocRef, {
        cName: cName,
        cCode: cCode,
        description: description,
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }



  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'courses', id)
    try{
      await deleteDoc(taskDocRef.id)
    } catch (err) {
      alert(err)
    }
  }
  
  
   





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
    setCName("")
    setCCode("")
    setDescription("")

  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 md:w-4/6 mx-72">
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
                                  onClick={()=>{handleUpdate(product.id)}}
                                >
                                  Update
                                </button>
                                <button
                                  className="button text-red-50 bg-red-600"
                                  onClick={()=>{handleDelete(product.id)}}
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











        <hr />
        <h2 className="text-center"> Add New Course</h2>
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
    </div>
  );
};

export default Courses;
