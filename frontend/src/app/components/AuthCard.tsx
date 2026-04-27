export default function AuthCard({
  title,
  children,
}: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c]">
      <div className="w-[380px] p-8 border border-gray-800 bg-[#111]">
        <h2 className="text-2xl mb-6 font-light">{title}</h2>
        {children}
      </div>
    </div>
  );
}