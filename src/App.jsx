import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            HRMS Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage employees and attendance efficiently
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition">
            <p className="text-gray-500 text-sm">Total Employees</p>
            <p id="empCount" className="text-3xl font-bold text-blue-600">0</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition">
            <p className="text-gray-500 text-sm">Application</p>
            <p className="text-purple-600 font-semibold mt-1">HRMS Lite</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-2 gap-8 mt-6">

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100">
            <EmployeePage />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100">
            <AttendancePage />
          </div>

        </div>

      </div>
    </div>
  );
}