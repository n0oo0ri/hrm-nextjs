import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type StudentList = Student & { class: Class };

const StudentListPage = async ({
  searchParams,
}: {
  searchParams?:
    | { [key: string]: string | undefined }
    | Promise<{ [key: string]: string | undefined }>;
}) => {
  // ✅ Unwrap the searchParams promise
  const params = await searchParams;

  const { page, ...queryParams } = params || {};
  const p = page ? parseInt(page, 10) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b text-sm hover:bg-gray-50 transition-colors"
      style={{ borderColor: '#e0e0e0' }}
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-gray-700">{item.username}</td>
      <td className="hidden md:table-cell text-gray-700">{item.class.name[0]}</td>
      <td className="hidden md:table-cell text-gray-700">{item.phone}</td>
      <td className="hidden md:table-cell text-gray-700">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:opacity-70" style={{ backgroundColor: '#e8f0ff' }}>
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* TOP */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <TableSearch />
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:opacity-70" style={{ backgroundColor: '#0099ff' }}>
                <Image src="/filter.png" alt="" width={16} height={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:opacity-70" style={{ backgroundColor: '#0099ff' }}>
                <Image src="/sort.png" alt="" width={16} height={16} />
              </button>
              {role === "admin" && (
                <FormContainer table="student" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* PAGINATION */}
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default StudentListPage;
