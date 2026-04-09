import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const FlightsPage = async () => {
  const session = await getServerSession(authOptions);

  const flights = [
    { id: 1, airline: "Sky Airways", from: "NYC", to: "LAX", time: "14:30", duration: "5h 30m", price: 289 },
    { id: 2, airline: "Blue Wings", from: "NYC", to: "LAX", time: "09:00", duration: "6h 15m", price: 199 },
    { id: 3, airline: "Air Star", from: "NYC", to: "LAX", time: "18:45", duration: "5h 45m", price: 319 },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        {/* BACK LINK */}
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">✈️ Flights</h1>
        <p className="text-gray-600 mb-8">Find and book flights to your destination</p>

        {/* SEARCH SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <input
                type="text"
                placeholder="Departure city"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                style={{ borderColor: '#e0e0e0' }}
                onFocus={(e) => e.target.style.borderColor = '#0066cc'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <input
                type="text"
                placeholder="Arrival city"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                style={{ borderColor: '#e0e0e0' }}
                onFocus={(e) => e.target.style.borderColor = '#0066cc'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Departure</label>
              <input
                type="date"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                style={{ borderColor: '#e0e0e0' }}
                onFocus={(e) => e.target.style.borderColor = '#0066cc'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Passengers</label>
              <select
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                style={{ borderColor: '#e0e0e0' }}
              >
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4+ Passengers</option>
              </select>
            </div>
          </div>
          <button
            className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#0066cc' }}
          >
            Search Flights
          </button>
        </div>

        {/* FLIGHTS LIST */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Flights</h2>
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{flight.airline}</h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="text-center">
                    <p className="font-bold text-lg">{flight.from}</p>
                    <p className="text-xs">{flight.time}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-sm">→ {flight.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{flight.to}</p>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${flight.price}</p>
                <button
                  className="mt-2 px-6 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0066cc' }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
