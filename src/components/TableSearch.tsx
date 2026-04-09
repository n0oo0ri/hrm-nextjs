"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all"
      style={{ 
        backgroundColor: '#f5f5f5',
        border: '1.5px solid #e0e0e0'
      }}
      onFocus={(e) => {
        const form = e.currentTarget;
        form.style.borderColor = '#0066cc';
        form.style.backgroundColor = '#fff';
      }}
      onBlur={(e) => {
        const form = e.currentTarget;
        form.style.borderColor = '#e0e0e0';
        form.style.backgroundColor = '#f5f5f5';
      }}
    >
      <Image src="/search.png" alt="" width={16} height={16} style={{ opacity: 0.6 }} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-0 bg-transparent outline-none text-sm"
      />
    </form>
  );
};

export default TableSearch;
