// Mock data for car leasing management system

export const deliveries = [
  {
    id: "D001",
    customerName: "John Smith",
    carModel: "Toyota Camry 2024",
    address: "123 Main St, New York, NY",
    status: "pending",
    assignedDriver: "Mike Johnson",
    salesperson: "Sarah Wilson",
    deliveryDate: "2024-01-15",
    leaseAmount: 350,
  },
  {
    id: "D002",
    customerName: "Emily Davis",
    carModel: "Honda Accord 2024",
    address: "456 Oak Ave, Los Angeles, CA",
    status: "completed",
    assignedDriver: "Tom Brown",
    salesperson: "Sarah Wilson",
    deliveryDate: "2024-01-14",
    leaseAmount: 380,
  },
  {
    id: "D003",
    customerName: "Robert Chen",
    carModel: "BMW 330i 2024",
    address: "789 Pine Rd, Chicago, IL",
    status: "in-progress",
    assignedDriver: "Mike Johnson",
    salesperson: "David Clark",
    deliveryDate: "2024-01-16",
    leaseAmount: 550,
  },
];

export const cars = [
  {
    id: "C001",
    make: "Toyota",
    model: "Camry",
    year: 2024,
    color: "Silver",
    vin: "JT2BF28K5X0123456",
    status: "available",
    leasePrice: 350,
    features: ["Automatic", "Bluetooth", "Backup Camera"],
  },
  {
    id: "C002",
    make: "Honda",
    model: "Accord",
    year: 2024,
    color: "White",
    vin: "HT2BF28K5X0123457",
    status: "leased",
    leasePrice: 380,
    features: ["CVT", "Apple CarPlay", "Lane Assist"],
  },
  {
    id: "C003",
    make: "BMW",
    model: "330i",
    year: 2024,
    color: "Black",
    vin: "BT2BF28K5X0123458",
    status: "maintenance",
    leasePrice: 550,
    features: ["Manual", "Premium Sound", "Sunroof"],
  },
];

export const drivers = [
  {
    id: "DR001",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "555-0123",
    status: "active",
    clockedIn: true,
    hoursThisWeek: 38.5,
    deliveriesCompleted: 12,
    bonusPhotos: 8,
  },
  {
    id: "DR002",
    name: "Tom Brown",
    email: "tom.brown@company.com",
    phone: "555-0124",
    status: "active",
    clockedIn: false,
    hoursThisWeek: 40,
    deliveriesCompleted: 15,
    bonusPhotos: 12,
  },
  {
    id: "DR003",
    name: "Lisa Martinez",
    email: "lisa.martinez@company.com",
    phone: "555-0125",
    status: "active",
    clockedIn: true,
    hoursThisWeek: 35,
    deliveriesCompleted: 10,
    bonusPhotos: 6,
  },
];

export const salespeople = [
  {
    id: "S001",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    deliveriesThisMonth: 25,
    totalLeaseValue: 8750,
    carsLeased: 22,
    avgLeaseValue: 398,
  },
  {
    id: "S002",
    name: "David Clark",
    email: "david.clark@company.com",
    deliveriesThisMonth: 18,
    totalLeaseValue: 7200,
    carsLeased: 16,
    avgLeaseValue: 450,
  },
];

export const clockRecords = [
  {
    id: "CL001",
    driverId: "DR001",
    driverName: "Mike Johnson",
    clockIn: "2024-01-15T08:00:00",
    clockOut: "2024-01-15T17:30:00",
    totalHours: 8.5,
    status: "approved",
    location: "Main Office",
  },
  {
    id: "CL002",
    driverId: "DR002",
    driverName: "Tom Brown",
    clockIn: "2024-01-15T07:45:00",
    clockOut: "2024-01-15T16:15:00",
    totalHours: 8.5,
    status: "pending",
    location: "Downtown Branch",
  },
];

export const analytics = {
  monthly: {
    totalDeliveries: 145,
    completedDeliveries: 132,
    pendingDeliveries: 13,
    totalRevenue: 57800,
    avgLeaseValue: 399,
    topPerformingSalesperson: "Sarah Wilson",
    totalDriverHours: 1248,
  },
  weekly: {
    deliveries: [15, 22, 18, 25, 21, 19, 16],
    revenue: [5200, 7800, 6400, 8900, 7500, 6800, 5700],
    driverHours: [156, 168, 162, 175, 159, 164, 152],
  },
  carActivity: {
    byMake: {
      Toyota: 45,
      Honda: 38,
      BMW: 22,
      Mercedes: 18,
      Audi: 15,
      Lexus: 12,
    },
    byMonth: {
      Jan: 52,
      Feb: 48,
      Mar: 55,
      Apr: 61,
      May: 58,
      Jun: 63,
    },
  },
};

export const bonusPhotos = [
  {
    id: "BP001",
    driverId: "DR001",
    driverName: "Mike Johnson",
    type: "customer-review",
    description: "Google review screenshot",
    uploadDate: "2024-01-15",
    status: "approved",
  },
  {
    id: "BP002",
    driverId: "DR002",
    driverName: "Tom Brown",
    type: "customer-photo",
    description: "Happy customer with delivered car",
    uploadDate: "2024-01-14",
    status: "pending",
  },
];
