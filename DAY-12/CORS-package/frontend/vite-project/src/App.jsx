import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8000/api/users";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  job_title: "",
};

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // READ — load all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE
        const res = await axios.put(`${API_URL}/${editingId}`, form);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? res.data : u)),
        );
      } else {
        // CREATE
        const res = await axios.post(API_URL, form);
        setUsers((prev) => [...prev, res.data]);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError("Failed to save user");
    }
  }

  function handleEdit(user) {
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender,
      job_title: user.job_title,
    });
    setEditingId(user.id);
  }

  function handleCancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
  }

  // DELETE
  async function handleDelete(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  }

  return (
    <div className="container">
      <h1>User Manager</h1>

      <form className="user-form" onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="job_title"
          placeholder="Job title"
          value={form.job_title}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update User" : "Add User"}
          </button>
          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Job Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.job_title}</td>
                <td class="actions">
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
