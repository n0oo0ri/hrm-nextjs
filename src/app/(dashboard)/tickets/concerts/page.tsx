import Link from "next/link";

const ConcertsPage = async () => {
  const events = [
    { id: 1, name: "Summer Music Festival 2026", artist: "Multiple Artists", date: "Jul 15, 2026", venue: "Central Park", price: 89, category: "Music" },
    { id: 2, name: "Jazz Night NYC", artist: "John Legend", date: "Jul 22, 2026", venue: "Madison Square Garden", price: 150, category: "Concert" },
    { id: 3, name: "Comedy Show Extravaganza", artist: "Stand-up Comedy", date: "Aug 5, 2026", venue: "Apollo Theater", price: 65, category: "Comedy" },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎭 Concerts & Events</h1>
        <p className="text-gray-600 mb-8">Book tickets for concerts and live events</p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input type="text" placeholder="Search events..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <select className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }}>
              <option>All Categories</option>
              <option>Music</option>
              <option>Comedy</option>
              <option>Theater</option>
              <option>Sports</option>
            </select>
            <button className="py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Search</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{event.name}</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p><span className="font-semibold">Artist:</span> {event.artist}</p>
                  <p><span className="font-semibold">Date:</span> {event.date}</p>
                  <p><span className="font-semibold">Venue:</span> {event.venue}</p>
                </div>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-white rounded-full" style={{ backgroundColor: '#0066cc' }}>
                  {event.category}
                </span>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${event.price}</p>
                <p className="text-xs text-gray-500">per ticket</p>
                <button className="mt-2 px-6 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcertsPage;
