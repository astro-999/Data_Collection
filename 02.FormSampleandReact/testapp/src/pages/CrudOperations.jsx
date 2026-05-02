import { useState } from "react";
import "../css/CrudOperations.css";
import Form from "../components/Form";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user";

function CrudOperations() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [formmode, setformmode] = useState(null); // null | "create" | "update"
  const [editingId, seteditingId] = useState(null);

  function openCreateForm() {
    setformmode("create");
    seteditingId(null);
    setname("");
    setage("");
  }

  function openUpdateForm(user) {
    setformmode("update");
    seteditingId(user.id);
    setname(user.name);
    setage(user.age);
  }

  function closeForm() {
    setformmode(null);
    seteditingId(null);
    setname("");
    setage("");
  }

  function handleCreate(e) {
    e.preventDefault();
    axios.post(`${API_URL}/create/`, { name, age })
      .then(() => {
        closeForm();
        handleRead();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  function handleUpdate(e) {
    e.preventDefault();
    axios.put(`${API_URL}/update/${editingId}/`, { name, age })
      .then(() => {
        closeForm();
        handleRead();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  function handleRead() {
    axios.get(`${API_URL}/details/`)
      .then((response) => {
        setuserdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  function handleDelete(e, user_id) {
    e.preventDefault();
    axios.delete(`${API_URL}/delete/${user_id}/`)
      .then(() => {
        handleRead();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  return (
    <div className="crud-container">
      <h1 className="crud-title">CRUD Operations</h1>

      {/* Show form for both Create and Update */}
      {formmode && (
        <Form
          title={formmode === "create" ? "Create User" : "Update User"}
          name={name}
          setname={setname}
          age={age}
          setage={setage}
          onSubmit={formmode === "create" ? handleCreate : handleUpdate}
          onCancel={closeForm}
          submitLabel={formmode === "create" ? "Create" : "Update"}
        />
      )}

      <div className="crud-actions">
        <button type="button" className="btn btn-create" onClick={openCreateForm}>
          + Create User
        </button>
        <button type="button" className="btn btn-read" onClick={handleRead}>
          Show Users
        </button>
      </div>

      <div className="user-list">
        {userdata.length > 0 && <h3 className="list-title">Users</h3>}
        <ul>
          {userdata.map((user) => (
            <li key={user.id} className="user-card">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-age">Age: {user.age}</span>
              </div>
              <div className="user-actions">
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => openUpdateForm(user)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={(e) => handleDelete(e, user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CrudOperations;
