import Link from "next/link";

const CarsPage = async () => {
  const cars = [
    { id: 1, company: "Premium Rentals", model: "Toyota Camry", type: "Sedan", price: 45, priceUnit: "/day", capacity: 5 },
    { id: 2, company: "Elite Fleet", model: "Honda CR-V", type: "SUV", price: 65, priceUnit: "/day", capacity: 7 },
    { id: 3, company: "Budget Cars", model: "Hyundai Elantra", type: "Sedan", price: 35, priceUnit: "/day", capacity: 5 },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-semibold mb-6 inline-flex items-center" style={{ color: '#0066cc' }}>
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚗 Car Rental</h1>
        <p className="text-gray-600 mb-8">Rent a car for your journey</p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input type="text" placeholder="Pick-up location..." className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" placeholder="Pick-up date" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <input type="date" placeholder="Return date" className="px-4 py-2 border-2 rounded-lg" style={{ borderColor: '#e0e0e0' }} />
            <button className="py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Search</button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Vehicles</h2>
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">{car.company}</h3>
                <div className="text-gray-600">
                  <p className="font-semibold">{car.model}</p>
                  <p className="text-sm">{car.type} • {car.capacity} seats</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">${car.price}</p>
                <p className="text-xs text-gray-500">{car.priceUnit}</p>
                <button className="mt-2 px-6 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#0066cc' }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
