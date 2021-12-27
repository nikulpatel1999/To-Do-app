import React, { useState, useEffect } from "react";
import "./Style.css";

const getlocalData = () => {
  const lists = localStorage.getItem("todo");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function Todo() {
  const [addData, setAddData] = useState("");
  const [addList, setAddList] = useState(getlocalData);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState();
  console.log(addList, "111");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(addList));
  }, [addList]);

  const addlistdata = () => {
    if (!addData) {
      alert("enter Data");
    } else if (addData && toggle) {
      setAddList(
        addList.map((currelem) => {
          if (currelem.id === edit) {
            return { ...currelem, name: addData };
          }
          return currelem;
        })
      );
      setAddData("");
      setEdit(null);
      setToggle(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: addData,
      };
      setAddList([...addList, newInputData]);
    }
    setAddData("");
  };

  const deleteData = (id) => {
    const updated = addList.filter((currelem) => {
      return currelem.id !== id;
    });
    setAddList(updated);
  };

  const deleteAll = () => {
    setAddList([]);
  };

  const editData = (id) => {
    const update = addList.find((currelem) => {
      return currelem.id === id;
    });
    setAddData(update.name);
    setEdit(id);
    setToggle(true);
  };
  console.log(edit);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={addData}
              onChange={(e) => setAddData(e.target.value)}
            />
            {toggle ? (
              <i className="far fa-edit add-btn" onClick={addlistdata}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addlistdata}></i>
            )}
          </div>

          <div className="showItems">
            {addList.map((currelem) => {
              return (
                <div className="eachItem" key={currelem.id}>
                  <h3>{currelem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editData(currelem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteData(currelem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={deleteAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
