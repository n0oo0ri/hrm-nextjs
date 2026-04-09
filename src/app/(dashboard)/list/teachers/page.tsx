import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type TeacherList = Teacher & { subjects: Subject[]; classes: Class[] };

const TeacherListPage = async ({
  searchParams: rawSearchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  // ✅ unwrap searchParams if it's a Promise
  const searchParams =
    rawSearchParams instanceof Promise
      ? await rawSearchParams
      : rawSearchParams || {};

  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  const columns = [
    { header: "Info", accessor: "info" },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt={`${item.name} avatar`}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email || "-"}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username || "-"}</td>
      <td className="hidden md:table-cell">
        {item.subjects.length
          ? item.subjects.map((s) => s.name).join(", ")
          : "-"}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.length ? item.classes.map((c) => c.name).join(", ") : "-"}
      </td>
      <td className="hidden lg:table-cell">{item.phone || "-"}</td>
      <td className="hidden lg:table-cell">{item.address || "-"}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  // ✅ safely parse page number
  const page =
    searchParams.page && !isNaN(parseInt(searchParams.page))
      ? parseInt(searchParams.page)
      : 1;

  // Build Prisma query
  const query: Prisma.TeacherWhereInput = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (!value || typeof value !== "string") continue;

    switch (key) {
      case "classId":
        query.lessons = {
          some: { classId: parseInt(value) },
        };
        break;
      case "search":
        query.name = { contains: value, mode: "insensitive" };
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: { subjects: true, classes: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default TeacherListPage;
