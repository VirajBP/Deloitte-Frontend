export const mockEmails = [
  {
    id: 1,
    from: "customer@example.com",
    timestamp: "2024-03-20 10:30 AM",
    subject: "Order #12345",
    orderNumber: "12345",
    amount: 299.99,
    priority: "urgent",
    customerName: "John Doe",
    status: "new"
  },
  {
    id: 2,
    from: "sarah.smith@email.com",
    timestamp: "2024-03-20 10:45 AM",
    subject: "Order #12346",
    orderNumber: "12346",
    amount: 599.99,
    priority: "urgent",
    customerName: "Sarah Smith",
    status: "new"
  },
  {
    id: 3,
    from: "mike.brown@email.com",
    timestamp: "2024-03-20 11:00 AM",
    subject: "Order #12347",
    orderNumber: "12347",
    amount: 199.50,
    priority: "normal",
    customerName: "Mike Brown",
    status: "new"
  },
  {
    id: 4,
    from: "emily.jones@email.com",
    timestamp: "2024-03-20 11:15 AM",
    subject: "Order #12348",
    orderNumber: "12348",
    amount: 899.99,
    priority: "urgent",
    customerName: "Emily Jones",
    status: "new"
  },
  {
    id: 5,
    from: "david.wilson@email.com",
    timestamp: "2024-03-20 11:30 AM",
    subject: "Order #12349",
    orderNumber: "12349",
    amount: 449.99,
    priority: "normal",
    customerName: "David Wilson",
    status: "new"
  }
];

export const mockOrders = [
  {
    id: 1,
    orderNumber: "12345",
    customerName: "John Doe",
    amount: 299.99,
    status: "processing",
    processingTime: "10:30 AM",
    progress: 65,
    priority: "urgent"
  },
  {
    id: 2,
    orderNumber: "12340",
    customerName: "Alice Johnson",
    amount: 499.99,
    status: "pending",
    processingTime: "10:15 AM",
    progress: 25,
    priority: "normal"
  },
  {
    id: 3,
    orderNumber: "12341",
    customerName: "Robert Davis",
    amount: 799.99,
    status: "processing",
    processingTime: "09:45 AM",
    progress: 80,
    priority: "urgent"
  },
  {
    id: 4,
    orderNumber: "12342",
    customerName: "Emma Wilson",
    amount: 349.99,
    status: "pending",
    processingTime: "09:30 AM",
    progress: 0,
    priority: "normal"
  },
  {
    id: 5,
    orderNumber: "12343",
    customerName: "James Miller",
    amount: 649.99,
    status: "processing",
    processingTime: "09:15 AM",
    progress: 45,
    priority: "urgent"
  }
];

// Order statistics for quick access
export const orderStats = {
  totalNew: mockEmails.length,
  totalUrgent: mockEmails.filter(email => email.priority === "urgent").length,
  totalPending: mockOrders.filter(order => order.status === "pending").length,
  totalProcessing: mockOrders.filter(order => order.status === "processing").length
};