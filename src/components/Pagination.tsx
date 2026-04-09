"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-700">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
        style={{ 
          backgroundColor: hasPrev ? '#0066cc' : '#e0e0e0',
          color: '#fff'
        }}
        onClick={() => {
          changePage(page - 1);
        }}
      >
        ← Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  page === pageIndex ? "text-white" : "text-gray-600 hover:text-gray-800"
                }`}
                style={{
                  backgroundColor: page === pageIndex ? '#0066cc' : '#f0f0f0'
                }}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        style={{ 
          backgroundColor: hasNext ? '#0066cc' : '#e0e0e0',
          color: '#fff'
        }}
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
