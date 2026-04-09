import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  // Traveloka color scheme
  const colorMap = {
    admin: { bg: "#0066cc", text: "#004c99" },
    teacher: { bg: "#2d5aa0", text: "#1e3f6f" },
    student: { bg: "#3385d6", text: "#0066cc" },
    parent: { bg: "#0099ff", text: "#0066cc" },
  };

  const colors = colorMap[type];

  return (
    <div 
      className="rounded-xl p-6 flex-1 min-w-[130px] text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-3 py-1 rounded-full text-gray-700 font-semibold">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
      </div>
      <h1 className="text-3xl font-bold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-white opacity-90">{type}s</h2>
    </div>
  );
};

export default UserCard;
