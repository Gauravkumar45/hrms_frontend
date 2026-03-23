import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
      document.getElementById("empCount").innerText = res.data.length;
    } catch {
      setError("Failed to load employees. Try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      await API.post("/employees/", form);

      setForm({
        employee_id: "",
        name: "",
        email: "",
        department: "",
      });

      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.detail || "Error");
    }
    setLoading(false);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        Employee Management
      </h2>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <input
          placeholder="Employee ID"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />

        <input
          placeholder="Name"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Department"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition"
      >
        Add Employee
      </button>

      {loading && <p className="text-blue-500 mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* TABLE */}
      <table className="w-full text-sm mt-4 border rounded overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-400">
                No employees yet. Add your first employee!
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.employee_id} className="border-t hover:bg-gray-50">
                <td className="p-2">{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => deleteEmployee(emp.employee_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}