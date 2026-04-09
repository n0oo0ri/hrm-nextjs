import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const Announcements = async () => {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Announcements</h1>
        <span className="text-xs font-medium cursor-pointer hover:opacity-70" style={{ color: '#0066cc' }}>View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data[0] && (
          <div className="rounded-md p-4 border-l-4" style={{ backgroundColor: 'rgba(0, 102, 204, 0.1)', borderColor: '#0066cc' }}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">{data[0].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1" style={{ borderColor: '#0066cc', border: '1px solid' }}>
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="rounded-md p-4 border-l-4" style={{ backgroundColor: 'rgba(45, 90, 160, 0.1)', borderColor: '#2d5aa0' }}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">{data[1].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1" style={{ borderColor: '#2d5aa0', border: '1px solid' }}>
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="rounded-md p-4 border-l-4" style={{ backgroundColor: 'rgba(0, 153, 255, 0.1)', borderColor: '#0099ff' }}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">{data[2].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1" style={{ borderColor: '#0099ff', border: '1px solid' }}>
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
