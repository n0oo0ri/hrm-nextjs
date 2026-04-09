const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4 bg-white border-collapse">
      <thead>
        <tr className="text-left text-white text-sm font-semibold" style={{ backgroundColor: '#2d5aa0' }}>
          {columns.map((col) => (
            <th key={col.accessor} className={`${col.className} px-4 py-3`}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#e0e0e0' }}>
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
