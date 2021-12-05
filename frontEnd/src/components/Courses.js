import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Courses.css";

export default function Courses(props) {
  const [courseList, setCourseList] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [inputChapters, setInputChapters] = useState("");

  useEffect(() => {
    const getData = async () => {
      // console.log(JSON.parse(localStorage.getItem("token")));
      try {
        // console.log(props.token.token);
        const response = await axios.get("http://localhost:5000/courses", {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        // console.log(Number(response.data.chapter));
        // console.log(response.data);
        setCourseList(response.data);
        // console.log(props.token);
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(courseList);
    getData();
  }, []);

  const saveInputName = (e) => {
    setInputName(e.target.value);
  };

  const saveInputSubject = (e) => {
    setInputSubject(e.target.value);
  };

  const saveInputChapters = (e) => {
    setInputChapters(e.target.value);
  };

  const saveAllData = async () => {
    try {
      // console.log(inputName,inputChapters, inputSubject);
      const request = await axios.post(
        "http://localhost:5000/course",
        {
          name: inputName,
          chapters: inputChapters,
          subject: inputSubject,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      // console.log(request.data);
      setCourseList(request.data);
      setInputChapters("");
      setInputName("");
      setInputSubject("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    const response = await axios.delete(`http://localhost:5000/course/${id}`);
    setCourseList(response.data);
  };

  const updateItem = async (id) => {
    const response = await axios.put(`http://localhost:5000/course/${id}`, {
      name: inputName,
      chapters: inputChapters,
      subject: inputSubject,
    });
    setCourseList(response.data);
    setInputChapters("");
    setInputName("");
    setInputSubject("");
  };

  return (
    <div>
      <div id="add-data">
        <h2>Add data to website:</h2>
        <input
          value={inputName}
          placeholder="Enter name"
          type="text"
          onChange={saveInputName}
        />
        <input
          value={inputSubject}
          placeholder="Enter subject"
          type="text"
          onChange={saveInputSubject}
        />
        <input
          value={inputChapters}
          placeholder="Enter count chapters"
          type="number"
          onChange={saveInputChapters}
        />
        <button
          onClick={() => {
            saveAllData();
          }}
        >
          ADD
        </button>
      </div>
      <hr />
      {courseList &&
        courseList.map((elem, index) => {
          // console.log(elem);
          return (
            <div key={index}>
              <h3>{elem.subject}</h3>
              <p>{`${elem.name} she's teacher to ${elem.subject} subject, it's have ${elem.chapters} chapters!`}</p>
              <h3>Aother: {elem.userId.name}</h3>
              {elem.userId.name == props.currentName ? (
                <div>
                  <button
                    onClick={() => {
                      deleteItem(elem._id);
                    }}
                  >
                    Delete
                  </button>{" "}
                  <button
                    onClick={() => {
                      updateItem(elem._id);
                    }}
                  >
                    Update
                  </button>
                </div>
              ) : (
                ""
              )}

              <hr />
            </div>
          );
        })}
    </div>
  );
}
