export const ORDER_STATUS = {
  LEVEL_1: {
    level: 1,
    status: "Order Received",
    description: "Order has been received and registered in the system"
  },
  LEVEL_2: {
    level: 2,
    status: "Inventory Verified",
    description: "Stock availability has been confirmed"
  },
  LEVEL_3: {
    level: 3,
    status: "Payment Completed",
    description: "Payment has been processed and confirmed"
  },
  LEVEL_4: {
    level: 4,
    status: "Ready for Dispatch",
    description: "Order is processed and ready for shipping"
  }
};

export const mockEmails = [
  {
    id: 1,
    subject: "New Laptop Order Request",
    sender: "john.smith@example.com",
    body: "I would like to order a Dell XPS 15 laptop with the following specifications:\n- 32GB RAM\n- 1TB SSD\n- NVIDIA RTX 3050 Ti\n- Extended Warranty Package\n\nPlease process this order as soon as possible.",
    canBeProcessed: true,
    orderDetails: {
      items: [
        {
          name: "Dell XPS 15 Laptop",
          specifications: [
            "32GB RAM",
            "1TB SSD",
            "NVIDIA RTX 3050 Ti",
            "Extended Warranty Package"
          ],
          quantity: 1,
          price: 2399.99
        }
      ],
      totalAmount: 2399.99
    }
  },
  {
    id: 2,
    subject: "Office Equipment Order",
    sender: "sarah.jones@example.com",
    body: "We need to order the following items for our new office space:\n- Dell P2723QE Monitors\n- Logitech MX Keys & Master 3 Combo\n- Dell WD19TBS Thunderbolt Dock\n- Herman Miller Aeron Chairs\n\nThis is for our new team of 20 people.",
    canBeProcessed: true,
    orderDetails: {
      items: [
        {
          name: "Dell P2723QE Monitor",
          specifications: [
            "27-inch 4K UHD",
            "USB-C Hub",
            "Height Adjustable Stand"
          ],
          quantity: 20,
          price: 449.99
        },
        {
          name: "Logitech MX Keys & Master 3 Combo",
          specifications: [
            "Wireless Keyboard",
            "Wireless Mouse",
            "USB-C Charging"
          ],
          quantity: 20,
          price: 169.99
        },
        {
          name: "Dell WD19TBS Thunderbolt Dock",
          specifications: [
            "Thunderbolt 4",
            "180W Power Delivery",
            "Dual 4K Support"
          ],
          quantity: 20,
          price: 299.99
        },
        {
          name: "Herman Miller Aeron Chair",
          specifications: [
            "Size B",
            "Graphite Color",
            "PostureFit SL",
            "Fully Adjustable Arms"
          ],
          quantity: 20,
          price: 1495.00
        }
      ],
      totalAmount: 48299.40
    }
  },
  {
    id: 3,
    subject: "Custom PC Build Request",
    sender: "mike.wilson@example.com",
    body: "I need a high-end gaming PC with these components:\n- Intel Core i9-13900K\n- NVIDIA RTX 4090\n- 64GB DDR5 RAM\n- 2TB NVMe SSD\n- 4TB HDD\n- NZXT Kraken Liquid Cooling\n- Corsair 1000W PSU\n- Lian Li PC-O11 Dynamic Case",
    canBeProcessed: true,
    orderDetails: {
      items: [
        {
          name: "Custom Gaming PC Build",
          specifications: [
            "Intel Core i9-13900K CPU",
            "NVIDIA RTX 4090 24GB GPU",
            "64GB DDR5 RAM",
            "2TB NVMe SSD",
            "4TB HDD Storage",
            "NZXT Kraken Liquid Cooling",
            "Corsair 1000W PSU",
            "Lian Li PC-O11 Dynamic Case"
          ],
          quantity: 1,
          price: 3999.99
        }
      ],
      totalAmount: 3999.99
    }
  },
  {
    id: 4,
    subject: "iPhone Order Query",
    sender: "emily.brown@example.com",
    body: "Looking to get some iPhones for the team. Need the latest iPhone 15 Pro Max in Space Black. Want them with AppleCare+ and all accessories.",
    canBeProcessed: false,
    issueDescription: "Quantity not specified in the email",
    orderDetails: {
      items: [
        {
          name: "iPhone 15 Pro Max",
          specifications: [
            "256GB Storage",
            "Space Black",
            "AppleCare+ 2 Years",
            "USB-C Charging Cable",
            "20W Power Adapter"
          ],
          price: 1299.99
        }
      ]
    }
  },
  {
    id: 5,
    subject: "Office Supplies Request",
    sender: "david.clark@example.com",
    body: "Need to order some HP printer supplies and paper:\n- HP 26X High Yield Black Toner\n- HP 202X Color Toner Set\n- HP Premium Business Paper\n- HP Advanced Photo Paper\n\nPlease process this order for the design department.",
    canBeProcessed: false,
    issueDescription: "Quantities not specified for any items",
    orderDetails: {
      items: [
        {
          name: "HP 26X High Yield Black Toner",
          specifications: [
            "9,000 Page Yield",
            "Original HP Cartridge",
            "For LaserJet Pro M402/M426"
          ],
          price: 189.99
        },
        {
          name: "HP 202X Color Toner Set",
          specifications: [
            "Cyan, Magenta, Yellow",
            "2,500 Page Yield per Color",
            "For Color LaserJet Pro M254/M281"
          ],
          price: 299.99
        },
        {
          name: "HP Premium Business Paper",
          specifications: [
            "8.5 x 11 inches",
            "32 lb, 100 Bright",
            "500 Sheets per Box"
          ],
          price: 39.99
        },
        {
          name: "HP Advanced Photo Paper",
          specifications: [
            "Glossy Finish",
            "4 x 6 inches",
            "100 Sheets per Box"
          ],
          price: 29.99
        }
      ]
    }
  },
  {
    id: 6,
    subject: "Custom Monitor Request",
    sender: "alice.wong@example.com",
    body: "I need a gaming monitor with high refresh rate and low response time. Something with G-Sync would be great.",
    canBeProcessed: false,
    issueDescription: "Product specifications unclear, no specific model mentioned",
    orderDetails: null
  },
  {
    id: 7,
    subject: "Laptop Accessories Order",
    sender: "tom.harris@example.com",
    body: "Need a Razer BlackWidow V4 Pro keyboard and a SteelSeries Aerox 5 Wireless mouse.",
    canBeProcessed: false,
    issueDescription: "Quantity not specified for requested items",
    orderDetails: {
      items: [
        {
          name: "Razer BlackWidow V4 Pro",
          specifications: [
            "Mechanical Gaming Keyboard",
            "Razer Green Switches",
            "RGB Lighting"
          ],
          price: 229.99
        },
        {
          name: "SteelSeries Aerox 5 Wireless",
          specifications: [
            "Ultra-lightweight Design",
            "18,000 CPI Sensor",
            "Up to 180 Hours Battery Life"
          ],
          price: 139.99
        }
      ]
    }
  },
  {
    id: 8,
    subject: "Bulk Order - Office Supplies",
    sender: "sarah.jones@company.com",
    timestamp: "2025-02-02T01:25:00",
    content: "Requesting quote for bulk office supplies order including 20 monitors and keyboards.",
    body: `Hello,

Our office is expanding and we need to place a bulk order for the following items:

1. 20x Dell 27" 4K Monitors (P2723QE)
2. 20x Wireless Keyboard and Mouse Combos
3. 20x Laptop Docking Stations
4. 20x Ergonomic Office Chairs

Could you please provide a quote for these items with bulk pricing?

Thanks,
Sarah Jones
Office Manager`,
    status: ORDER_STATUS.LEVEL_1.status,
    processingLevel: 1,
    processingHistory: [
      {
        level: 1,
        status: ORDER_STATUS.LEVEL_1.status,
        timestamp: "2025-02-02T01:26:00",
        note: "Bulk order received, pending inventory check"
      }
    ],
    needsReview: true,
    priority: "urgent",
    orderDetails: {
      items: [
        {
          name: "Dell P2723QE Monitor",
          specifications: [
            "27-inch 4K UHD",
            "USB-C Hub",
            "Height Adjustable Stand"
          ],
          quantity: 20,
          price: 449.99
        },
        {
          name: "Logitech MX Keys & Master 3 Combo",
          specifications: [
            "Wireless Keyboard",
            "Wireless Mouse",
            "USB-C Charging"
          ],
          quantity: 20,
          price: 169.99
        },
        {
          name: "Dell WD19TBS Thunderbolt Dock",
          specifications: [
            "Thunderbolt 4",
            "180W Power Delivery",
            "Dual 4K Support"
          ],
          quantity: 20,
          price: 299.99
        },
        {
          name: "Herman Miller Aeron Chair",
          specifications: [
            "Size B",
            "Graphite Color",
            "PostureFit SL",
            "Fully Adjustable Arms"
          ],
          quantity: 20,
          price: 1495.00
        }
      ],
      totalAmount: 48299.40,
      paymentStatus: "Pending",
      paymentMethod: "Pending Corporate Invoice"
    }
  },
  {
    id: 9,
    subject: "Gaming PC Configuration Order",
    sender: "mike.wilson@email.com",
    timestamp: "2025-02-02T01:20:00",
    content: "Looking to order custom gaming PC with RTX 4090 configuration.",
    body: `Hi there,

I'm interested in ordering a high-end gaming PC with the following specs:

- Intel Core i9-13900K
- NVIDIA RTX 4090 24GB
- 64GB DDR5 RAM
- 2TB NVMe SSD
- 4TB HDD
- Liquid Cooling System
- 1000W Power Supply

Please provide the total cost and build time for this configuration.

Thanks,
Mike Wilson`,
    status: ORDER_STATUS.LEVEL_4.status,
    processingLevel: 4,
    processingHistory: [
      {
        level: 1,
        status: ORDER_STATUS.LEVEL_1.status,
        timestamp: "2025-02-02T01:21:00",
        note: "Custom build order received"
      },
      {
        level: 2,
        status: ORDER_STATUS.LEVEL_2.status,
        timestamp: "2025-02-02T01:30:00",
        note: "All components available in stock"
      },
      {
        level: 3,
        status: ORDER_STATUS.LEVEL_3.status,
        timestamp: "2025-02-02T01:45:00",
        note: "Full payment received"
      },
      {
        level: 4,
        status: ORDER_STATUS.LEVEL_4.status,
        timestamp: "2025-02-02T02:15:00",
        note: "Build completed and tested, ready for shipping"
      }
    ],
    needsReview: false,
    priority: "high",
    orderDetails: {
      items: [
        {
          name: "Custom Gaming PC Build",
          specifications: [
            "Intel Core i9-13900K CPU",
            "NVIDIA RTX 4090 24GB GPU",
            "64GB DDR5 RAM",
            "2TB NVMe SSD",
            "4TB HDD Storage",
            "NZXT Kraken Liquid Cooling",
            "Corsair 1000W PSU",
            "Lian Li PC-O11 Dynamic Case"
          ],
          quantity: 1,
          price: 3999.99
        }
      ],
      totalAmount: 3999.99,
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer"
    }
  },
  {
    id: 10,
    subject: "Smartphone Order Request",
    sender: "emily.brown@email.com",
    timestamp: "2025-02-02T01:15:00",
    content: "Interested in ordering 5 iPhone 15 Pro Max devices for business use.",
    body: `Dear Sales Team,

I need to place an order for our executive team:

5x iPhone 15 Pro Max with the following specifications:
- 256GB Storage
- Space Black color
- AppleCare+ coverage

Please include any available business discount in the quote.

Best regards,
Emily Brown
IT Procurement`,
    status: ORDER_STATUS.LEVEL_2.status,
    processingLevel: 2,
    processingHistory: [
      {
        level: 1,
        status: ORDER_STATUS.LEVEL_1.status,
        timestamp: "2025-02-02T01:16:00",
        note: "Bulk iPhone order received"
      },
      {
        level: 2,
        status: ORDER_STATUS.LEVEL_2.status,
        timestamp: "2025-02-02T01:30:00",
        note: "Stock verified - All models available"
      }
    ],
    needsReview: false,
    priority: "normal",
    orderDetails: {
      items: [
        {
          name: "iPhone 15 Pro Max",
          specifications: [
            "256GB Storage",
            "Space Black",
            "AppleCare+ 2 Years",
            "USB-C Charging Cable",
            "20W Power Adapter"
          ],
          quantity: 5,
          price: 1299.99
        }
      ],
      totalAmount: 6499.95,
      paymentStatus: "Pending",
      paymentMethod: "Pending Corporate Card"
    }
  },
  {
    id: 11,
    subject: "Printer Supplies Bulk Order",
    sender: "david.clark@office.com",
    timestamp: "2025-02-02T01:10:00",
    content: "Need to place order for printer cartridges and paper supplies.",
    body: `Hello,

We need to restock our printer supplies. Here's what we need:

- 10x Black Toner Cartridges (HP 26X)
- 5x Color Toner Sets (HP 202X)
- 50 Boxes of Premium Paper
- 20 Boxes of Photo Paper

Please provide the total cost with bulk discount if available.

Thanks,
David Clark`,
    status: ORDER_STATUS.LEVEL_4.status,
    processingLevel: 4,
    processingHistory: [
      {
        level: 1,
        status: ORDER_STATUS.LEVEL_1.status,
        timestamp: "2025-02-02T01:11:00",
        note: "Supply restock order received"
      },
      {
        level: 2,
        status: ORDER_STATUS.LEVEL_2.status,
        timestamp: "2025-02-02T01:20:00",
        note: "Inventory checked - All items available"
      },
      {
        level: 3,
        status: ORDER_STATUS.LEVEL_3.status,
        timestamp: "2025-02-02T01:35:00",
        note: "Payment processed via purchase order"
      },
      {
        level: 4,
        status: ORDER_STATUS.LEVEL_4.status,
        timestamp: "2025-02-02T02:00:00",
        note: "Order packed and ready for shipping"
      }
    ],
    needsReview: true,
    priority: "medium",
    orderDetails: {
      items: [
        {
          name: "HP 26X High Yield Black Toner",
          specifications: [
            "9,000 Page Yield",
            "Original HP Cartridge",
            "For LaserJet Pro M402/M426"
          ],
          quantity: 10,
          price: 189.99
        },
        {
          name: "HP 202X Color Toner Set",
          specifications: [
            "Cyan, Magenta, Yellow",
            "2,500 Page Yield per Color",
            "For Color LaserJet Pro M254/M281"
          ],
          quantity: 5,
          price: 299.99
        },
        {
          name: "HP Premium Business Paper",
          specifications: [
            "8.5 x 11 inches",
            "32 lb, 100 Bright",
            "500 Sheets per Box"
          ],
          quantity: 50,
          price: 39.99
        },
        {
          name: "HP Advanced Photo Paper",
          specifications: [
            "Glossy Finish",
            "4 x 6 inches",
            "100 Sheets per Box"
          ],
          quantity: 20,
          price: 29.99
        }
      ],
      totalAmount: 4799.30,
      paymentStatus: "Paid",
      paymentMethod: "Purchase Order"
    }
  },
  {
    id: 12,
    subject: "Server Hardware Order",
    sender: "tech.team@enterprise.com",
    timestamp: "2025-02-02T01:05:00",
    content: "Requesting order for server rack equipment and networking supplies.",
    needsReview: true,
    priority: "urgent"
  },
  {
    id: 13,
    subject: "Software License Order",
    sender: "lisa.wong@company.com",
    timestamp: "2025-02-02T01:00:00",
    content: "Need to order 50 licenses for development software suite.",
    needsReview: false,
    priority: "high"
  },
  {
    id: 14,
    subject: "Audio Equipment Order",
    sender: "audio.pro@studio.com",
    timestamp: "2025-02-02T00:55:00",
    content: "Looking to order professional audio recording equipment set.",
    needsReview: false,
    priority: "normal"
  },
  {
    id: 15,
    subject: "Security Camera System Order",
    sender: "security@mall.com",
    timestamp: "2025-02-02T00:50:00",
    content: "Request for complete CCTV system with 32 cameras and DVR setup.",
    needsReview: true,
    priority: "urgent"
  },
  {
    id: 16,
    subject: "Tablet Bulk Order",
    sender: "education@school.org",
    timestamp: "2025-02-02T00:45:00",
    content: "Need to order 100 tablets for educational purposes.",
    needsReview: true,
    priority: "high"
  },
  {
    id: 17,
    subject: "Network Equipment Order",
    sender: "it.dept@corporation.com",
    timestamp: "2025-02-02T00:40:00",
    content: "Ordering networking equipment including switches and routers.",
    needsReview: false,
    priority: "medium"
  },
  {
    id: 18,
    subject: "Smart Home Devices Order",
    sender: "home.automation@email.com",
    timestamp: "2025-02-02T00:35:00",
    content: "Bulk order for smart home devices including thermostats and cameras.",
    needsReview: false,
    priority: "normal"
  },
  {
    id: 19,
    subject: "Digital Signage Order",
    sender: "marketing@retail.com",
    timestamp: "2025-02-02T00:30:00",
    content: "Order request for digital signage displays and media players.",
    needsReview: true,
    priority: "high"
  },
  {
    id: 20,
    subject: "VR Equipment Order",
    sender: "training@company.com",
    timestamp: "2025-02-02T00:25:00",
    content: "Ordering VR headsets and accessories for training facility.",
    needsReview: false,
    priority: "medium"
  },
  {
    id: 21,
    subject: "Mobile Device Management Order",
    sender: "mdm@enterprise.com",
    timestamp: "2025-02-02T00:20:00",
    content: "Order for MDM software licenses and setup services.",
    needsReview: true,
    priority: "urgent"
  },
  {
    id: 22,
    subject: "3D Printer Order",
    sender: "engineering@design.com",
    timestamp: "2025-02-02T00:15:00",
    content: "Requesting industrial 3D printer and materials.",
    needsReview: true,
    priority: "high"
  },
  {
    id: 23,
    subject: "Conference Room Equipment",
    sender: "facilities@corp.com",
    timestamp: "2025-02-02T00:10:00",
    content: "Order for video conferencing equipment and displays.",
    needsReview: false,
    priority: "normal"
  },
  {
    id: 24,
    subject: "Data Storage Solution Order",
    sender: "data.center@company.com",
    timestamp: "2025-02-02T00:05:00",
    content: "Ordering NAS storage systems and backup solutions.",
    needsReview: true,
    priority: "urgent"
  },
  {
    id: 25,
    subject: "Developer Workstation Order",
    sender: "dev.team@software.com",
    timestamp: "2025-02-02T00:00:00",
    content: "Order for high-performance developer workstations.",
    needsReview: false,
    priority: "high"
  },
  {
    id: 26,
    subject: "Point of Sale System Order",
    sender: "retail@store.com",
    timestamp: "2025-02-01T23:55:00",
    content: "Ordering complete POS system with hardware and software.",
    needsReview: true,
    priority: "medium"
  }
];

export const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2025-001",
    customerName: "John Smith",
    amount: 2399.99,
    status: "processing",
    processingTime: "10:30 AM",
    progress: 65,
    priority: "high",
    items: ["Dell XPS 15 Laptop"]
  },
  {
    id: 2,
    orderNumber: "ORD-2025-002",
    customerName: "Sarah Jones",
    amount: 48299.40,
    status: "pending",
    processingTime: "10:25 AM",
    progress: 25,
    priority: "urgent",
    items: ["Dell P2723QE Monitor", "Logitech MX Keys & Master 3 Combo", "Dell WD19TBS Thunderbolt Dock", "Herman Miller Aeron Chair"]
  },
  {
    id: 3,
    orderNumber: "ORD-2025-003",
    customerName: "Mike Wilson",
    amount: 3999.99,
    status: "processing",
    processingTime: "10:20 AM",
    progress: 80,
    priority: "high",
    items: ["Custom Gaming PC Build"]
  },
  {
    id: 4,
    orderNumber: "ORD-2025-004",
    customerName: "Emily Brown",
    amount: 6499.95,
    status: "pending",
    processingTime: "10:15 AM",
    progress: 15,
    priority: "normal",
    items: ["iPhone 15 Pro Max"]
  },
  {
    id: 5,
    orderNumber: "ORD-2025-005",
    customerName: "David Clark",
    amount: 4799.30,
    status: "processing",
    processingTime: "10:10 AM",
    progress: 45,
    priority: "medium",
    items: ["HP 26X High Yield Black Toner", "HP 202X Color Toner Set", "HP Premium Business Paper", "HP Advanced Photo Paper"]
  },
  {
    id: 6,
    orderNumber: "ORD-2025-006",
    customerName: "Tech Team Enterprise",
    amount: 25999.99,
    status: "processing",
    processingTime: "10:05 AM",
    progress: 30,
    priority: "urgent",
    items: ["Server Rack", "Network Equipment"]
  },
  {
    id: 7,
    orderNumber: "ORD-2025-007",
    customerName: "Lisa Wong",
    amount: 24999.99,
    status: "pending",
    processingTime: "10:00 AM",
    progress: 0,
    priority: "high",
    items: ["Software Licenses x50"]
  },
  {
    id: 8,
    orderNumber: "ORD-2025-008",
    customerName: "Audio Pro Studio",
    amount: 8999.99,
    status: "processing",
    processingTime: "09:55 AM",
    progress: 60,
    priority: "normal",
    items: ["Professional Audio Equipment"]
  },
  {
    id: 9,
    orderNumber: "ORD-2025-009",
    customerName: "Mall Security",
    amount: 12999.99,
    status: "pending",
    processingTime: "09:50 AM",
    progress: 10,
    priority: "urgent",
    items: ["CCTV System", "DVR Setup"]
  },
  {
    id: 10,
    orderNumber: "ORD-2025-010",
    customerName: "Education School",
    amount: 49999.99,
    status: "processing",
    processingTime: "09:45 AM",
    progress: 40,
    priority: "high",
    items: ["Tablets x100"]
  },
  {
    id: 11,
    orderNumber: "ORD-2025-011",
    customerName: "IT Department Corp",
    amount: 18999.99,
    status: "pending",
    processingTime: "09:40 AM",
    progress: 5,
    priority: "medium",
    items: ["Network Switches", "Routers"]
  },
  {
    id: 12,
    orderNumber: "ORD-2025-012",
    customerName: "Home Automation",
    amount: 5999.99,
    status: "processing",
    processingTime: "09:35 AM",
    progress: 70,
    priority: "normal",
    items: ["Smart Home Devices Bundle"]
  },
  {
    id: 13,
    orderNumber: "ORD-2025-013",
    customerName: "Retail Marketing",
    amount: 15999.99,
    status: "pending",
    processingTime: "09:30 AM",
    progress: 20,
    priority: "high",
    items: ["Digital Signage Displays"]
  },
  {
    id: 14,
    orderNumber: "ORD-2025-014",
    customerName: "Training Company",
    amount: 9999.99,
    status: "processing",
    processingTime: "09:25 AM",
    progress: 55,
    priority: "medium",
    items: ["VR Headsets", "Accessories"]
  },
  {
    id: 15,
    orderNumber: "ORD-2025-015",
    customerName: "MDM Enterprise",
    amount: 29999.99,
    status: "pending",
    processingTime: "09:20 AM",
    progress: 0,
    priority: "urgent",
    items: ["MDM Software Licenses"]
  },
  {
    id: 16,
    orderNumber: "ORD-2025-016",
    customerName: "Engineering Design",
    amount: 39999.99,
    status: "processing",
    processingTime: "09:15 AM",
    progress: 35,
    priority: "high",
    items: ["Industrial 3D Printer"]
  },
  {
    id: 17,
    orderNumber: "ORD-2025-017",
    customerName: "Corporate Facilities",
    amount: 12999.99,
    status: "pending",
    processingTime: "09:10 AM",
    progress: 15,
    priority: "normal",
    items: ["Conference Room Equipment"]
  },
  {
    id: 18,
    orderNumber: "ORD-2025-018",
    customerName: "Data Center Company",
    amount: 45999.99,
    status: "processing",
    processingTime: "09:05 AM",
    progress: 25,
    priority: "urgent",
    items: ["NAS Storage Systems"]
  },
  {
    id: 19,
    orderNumber: "ORD-2025-019",
    customerName: "Software Dev Team",
    amount: 19999.99,
    status: "pending",
    processingTime: "09:00 AM",
    progress: 5,
    priority: "high",
    items: ["Developer Workstations"]
  },
  {
    id: 20,
    orderNumber: "ORD-2025-020",
    customerName: "Retail Store",
    amount: 8999.99,
    status: "processing",
    processingTime: "08:55 AM",
    progress: 50,
    priority: "medium",
    items: ["POS System Complete"]
  }
];

export const mockProcessedOrders = mockEmails.filter(email => email.canBeProcessed).map(email => ({
  id: email.id,
  orderNumber: `ORD-2025-${email.id}`,
  customerName: email.sender.split('@')[0],
  amount: email.orderDetails.totalAmount,
  status: "Processing",
  processingLevel: 1,
  processingHistory: [
    {
      level: 1,
      status: ORDER_STATUS.LEVEL_1.status,
      timestamp: "2025-02-02T01:31:00",
      note: "Order received and registered in system"
    }
  ],
  items: email.orderDetails.items,
  paymentStatus: "Pending",
  paymentMethod: "Pending Corporate Invoice",
  emailId: email.id
}));

