import { useState } from "react";
import API from "../api/api";

export default function AttendancePage() {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    try {
      setMessage("");
      await API.post("/attendance/", form);
      setMessage("Attendance marked successfully. View records using the 'View' button.");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error");
    }
  };

  const fetchAttendance = async () => {
    const res = await API.get(`/attendance/${form.employee_id}`);
    setRecords(res.data);
  };

  const fetchSummary = async () => {
    const res = await API.get(`/attendance/summary/${form.employee_id}`);
    setSummary(res.data);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        Attendance Tracking
      </h2>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          placeholder="Employee ID"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />

        <input
          type="date"
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={markAttendance}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Mark
        </button>

        <button
          onClick={fetchAttendance}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
        >
          View
        </button>

        <button
          onClick={fetchSummary}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Summary
        </button>
      </div>

      {message && <p className="text-sm mb-2">{message}</p>}

      {summary && (
        <div className="bg-green-100 p-3 rounded mb-3">
          Total Present Days: <b>{summary.total_present_days}</b>
        </div>
      )}

      {records.map((r, i) => (
        <div
          key={i}
          className="border p-2 mb-2 rounded hover:bg-gray-50"
        >
          {r.date} —{" "}
          <span
            className={
              r.status === "Present"
                ? "text-green-600 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}