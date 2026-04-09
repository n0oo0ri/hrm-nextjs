import Link from "next/link";

const TrainsPage = async () => {
  const trains = [
    { id: 1, company: "Rail Express", from: "NYC", to: "DC", time: "08:30", duration: "2h 45m", price: 79, seats: 15 },
    { id: 2, company: "Speed Rail", from: "NYC", to: "DC", time: "12:00", duration: "2h 30m", price: 99, seats: 8 },
    { id: 3, company: "Comfort Rails", from: "NYC", to: "DC", time: "16:45", duration: "3h", price: 69, seats: 22 },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚄 Trains</h1>
        <p className="text-gray-600 mb-8">Fast and comfortable train journeys</p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input type="text" placeholder="From..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="text" placeholder="To..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <button className="py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Search</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Trains</h2>
          {trains.map((train) => (
            <div key={train.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{train.company}</h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <div><p className="font-bold">{train.from}</p><p className="text-xs">{train.time}</p></div>
                  <div className="flex-1"><p className="text-sm">→ {train.duration}</p></div>
                  <div><p className="font-bold">{train.to}</p></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{train.seats} seats available</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${train.price}</p>
                <button className="mt-2 px-6 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainsPage;
