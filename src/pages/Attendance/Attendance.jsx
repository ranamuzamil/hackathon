import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { collection} from "firebase/firestore";
import Sidebar from "../../components/Header/Sidebar";
import { getDocs } from "firebase/firestore";

const Attendance = () => {

  const [attendance, setAttendance] = useState([]);

  const fetchData = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "attendance"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data());
    });
    setAttendance(array);
  };
  useEffect(() => {
    fetchData();
  });


  const [students, setStudents] = useState([]);

  const fetchStudentsData = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data());
    });
    setStudents(array);
  };
  useEffect(()=>{
    fetchStudentsData();
  })
  
  const handlePresent = async () => {
    
  };
  const handleAbsent = {
  

  }



  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col ml-80 w-2/3">
        {attendance.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Id</th>
                  <th scope="col">Contact no</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((product, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{product.sName}</td>
                      <td>{product.sid}</td>
                      <td>{product.contact}</td>
                      <td>

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

        <h2 className="">Students List </h2>
       


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
                                  className="button text-red-50 bg-green-600"
                                  onClick={()=>{handlePresent()}}
                                >
                                  Present
                                </button>
                                <button
                                  className="button text-red-50 bg-red-600"
                                  onClick={()=>{handleAbsent()}}
                                >
                                  Absent
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

export default Attendance;
