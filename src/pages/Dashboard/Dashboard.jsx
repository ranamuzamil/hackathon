import React from "react";
import Sidebar from "../../components/Header/Sidebar";
import Card from "../../components/Cards/Card";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
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

  const [students, setStudents] = useState([]);

  const fetchDataOfStudents = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data());
    });
    setStudents(array);
  };
  useEffect(() => {
    fetchDataOfStudents();
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col mx-80 my-16 ">
        <h1>Dashboard</h1>
        <hr />
        <div className="flex my-2 md:gap-5">
          <Card
            text="Current Courses"
            contented={
              courses.length > 0 ? (
                courses.length
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-red-600"></div>
                </div>
              )
            }
            classByProps="font-bold bg-gray-800"
          />
          <Card
            text="Total Students"
            contented={
              students.length > 0 ? (
                students.length
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-red-600"></div>
                </div>
              )
            }
            classByProps="font-bold bg-gray-800"
          />
          <Card
            text="Today Attendance"
            contented={
              students.length > 0 ? (
                students.length
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-red-600"></div>
                </div>
              )
            }
            classByProps="font-bold bg-gray-800"
          />
        </div>

        <br />
        <h1>Analysis</h1>
        <hr />
        <div className="text-center">
          <div className="spinner-border text-red-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
