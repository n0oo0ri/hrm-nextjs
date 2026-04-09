import Link from "next/link";

const ExplorePage = async () => {
  const features = [
    {
      id: 1,
      name: "Employee Management",
      icon: "👥",
      description: "Manage employee records, profiles, and personnel information",
      color: "#0066cc",
      href: "/list/students"
    },
    {
      id: 2,
      name: "Attendance Tracking",
      icon: "📋",
      description: "Monitor employee attendance, clock-in/out, and leave requests",
      color: "#1e40af",
      href: "/list/exams"
    },
    {
      id: 3,
      name: "Performance Management",
      icon: "📊",
      description: "Track employee performance, set goals, and conduct reviews",
      color: "#0099ff",
      href: "/list/results"
    },
    {
      id: 4,
      name: "Payroll & Compensation",
      icon: "💰",
      description: "Manage salaries, benefits, and compensation packages",
      color: "#0066cc",
      href: "/list/classes"
    },
    {
      id: 5,
      name: "Leave Management",
      icon: "🏖️",
      description: "Handle leave requests, approvals, and vacation scheduling",
      color: "#1e40af",
      href: "/list/lessons"
    },
    {
      id: 6,
      name: "Training & Development",
      icon: "🎓",
      description: "Organize training programs and employee development plans",
      color: "#0099ff",
      href: "/list/announcements"
    },
    {
      id: 7,
      name: "Recruitment",
      icon: "🎯",
      description: "Manage job postings, applications, and hiring process",
      color: "#0066cc",
      href: "/list/teachers"
    },
    {
      id: 8,
      name: "Reports & Analytics",
      icon: "📈",
      description: "Generate reports and view HR analytics and insights",
      color: "#1e40af",
      href: "/list/parents"
    },
  ];

  return (
    <div className="p-8" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Explore HR Features</h1>
          <p className="text-gray-600 text-lg">Discover all the powerful tools available in Sesame HR Management System</p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href}>
              <div
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group h-full"
              >
                <div
                  className="h-24 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{feature.name}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{feature.description}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold" style={{ color: feature.color }}>
                    Learn more →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FEATURED SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Real-time Updates</h3>
              <p className="text-gray-600 text-sm">Get instant notifications on HR activities and employee updates</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Secure & Compliant</h3>
              <p className="text-gray-600 text-sm">Enterprise-grade security with full data privacy compliance</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Easy to Use</h3>
              <p className="text-gray-600 text-sm">Intuitive interface designed for HR professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
