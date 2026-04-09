import Link from "next/link";

const HotelsPage = async () => {
  const hotels = [
    { id: 1, name: "Luxury Inn NYC", location: "Manhattan", rating: 4.8, price: 299, reviews: 2150 },
    { id: 2, name: "Grand Hotel", location: "Midtown", rating: 4.5, price: 189, reviews: 1850 },
    { id: 3, name: "City View Resort", location: "Downtown", rating: 4.6, price: 249, reviews: 2020 },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">🏨 Hotels</h1>
        <p className="text-gray-600 mb-8">Find and book your perfect accommodation</p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input type="text" placeholder="City..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" placeholder="Check-in" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" placeholder="Check-out" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <button className="py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Search</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Hotels</h2>
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{hotel.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-gray-800">{hotel.rating}</span>
                  <span className="text-gray-500 text-sm">({hotel.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${hotel.price}</p>
                <p className="text-xs text-gray-500">per night</p>
                <button className="mt-2 px-6 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
