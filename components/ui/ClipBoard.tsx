"use client";
import { toast } from "react-hot-toast";

const ClipBoard = ({ title, url }: { title: string; url: string }) => {
  const ClipBoard = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("clipboard copied successfully");
  };

  return (
    <div className="w-full border border-gray-400 flex flex-col gap-3 rounded-md p-3">
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>

        <h3 className="text-md font-serif font-bold ">{title.toUpperCase()}</h3>
      </div>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-4">
          <span className="text-sm font-extrabold">copy: </span>
          <span className="bg-slate-400 p-1 text-xs rounded-md ">{url}</span>
        </p>
        <button
          type="button"
          className="p-2 border border-gray-500 rounded-lg"
          onClick={ClipBoard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClipBoard;
