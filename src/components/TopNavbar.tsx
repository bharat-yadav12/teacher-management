// components/TopNavbar.tsx

export default function TopNavbar() {
  return (
    <header className="bg-red-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="text-lg font-semibold">MyTeacherAPP</div>
      <div className="flex gap-4 items-center">
        <span className="text-sm">Welcome, Admin</span>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}
