import Link from "next/link";

const BusesPage = async () => {
  const buses = [
    { id: 1, company: "Express Buses", from: "NYC", to: "Boston", time: "10:00", duration: "3h 30m", price: 45 },
    { id: 2, company: "Comfort Travel", from: "NYC", to: "Boston", time: "14:00", duration: "4h", price: 35 },
    { id: 3, company: "Premium Coach", from: "NYC", to: "Boston", time: "18:30", duration: "3h 45m", price: 55 },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚌 Buses</h1>
        <p className="text-gray-600 mb-8">Book your bus tickets</p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input type="text" placeholder="From..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="text" placeholder="To..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <button className="py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Search</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Buses</h2>
          {buses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{bus.company}</h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <div><p className="font-bold">{bus.from}</p><p className="text-xs">{bus.time}</p></div>
                  <div className="flex-1"><p className="text-sm">→ {bus.duration}</p></div>
                  <div><p className="font-bold">{bus.to}</p></div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${bus.price}</p>
                <button className="mt-2 px-6 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusesPage;
