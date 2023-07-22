/* eslint-disable react/prop-types */
export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-sky-950/60 flex items-center">
      <div className="fixed bg-white w-96 sm:w-2/3 inset-x-0 m-auto flex items-center flex-col p-4 rounded-xl border-sky-500 border-2">
        {children}
      </div>
    </div>
  );
}
