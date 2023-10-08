import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Sidebar from "../../components/Header/Sidebar";
import {
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Students = () => {
  const [sName, setSName] = useState("");
  const [sid, setSid] = useState("");
  const [contact, setContact] = useState("");

  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data());
    });
    setStudents(array);
  };
  useEffect(()=>{
    fetchData();
  })

 
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'courses', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }
  const handleUpdate = () =>{

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), {
        sName: sName,
        sid: sid,
        contact: contact,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
    setSName("")
    setSid("")
    setContact("")

  };







  return (
    <div className="flex" >
      <Sidebar/>
      <div className="mx-auto">


      {students.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-light table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Id</th>
                          <th scope="col">Contact no</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((product, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{product.sName}</td>
                              <td>{product.sid}</td>
                              <td>{product.contact}</td>
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

        <h2 className="text-center"> Add New Student Here</h2>
      <form
          onSubmit={handleSubmit}
          className=" flex m-auto bg-gray-200 gap-5 flex-col h-96 border-gray-600 rounded-2xl border-2 p-10 w-96"
          name="addTask"
        >
          <input
            type="text"
            className="h-12 p-2"
            name="sName"
            onChange={(e) => setSName(e.target.value.toUpperCase())}
            value={sName}
            placeholder="Student Name"

          />
          <input
            type="number"
            className="h-12 p-2"
            name="sid"
            onChange={(e) => setSid(e.target.value.toUpperCase())}
            value={sid}
            placeholder="Student Id"
          />
          <textarea
            onChange={(e) => setContact(e.target.value)}
            className="h-12 p-2"
            placeholder="Contact no"
            value={contact}
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
  )
}

export default Students
