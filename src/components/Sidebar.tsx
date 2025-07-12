export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-full p-4 flex flex-col gap-4">
      <div className="text-gray-700 font-semibold text-lg mb-4">Navigation</div>
      <ul className="space-y-2">
        <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Dashboard</li>
        <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Teachers</li>
        <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Students</li>
        <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Schedule</li>
        <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
}
