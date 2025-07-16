// ROYOMBER Database Schema
// Luxury Umbrella E-commerce Platform
// Created: July 16, 2025

const databaseSchema = {
  // User Management
  users: {
    id: "UUID PRIMARY KEY",
    email: "VARCHAR(255) UNIQUE NOT NULL",
    password_hash: "VARCHAR(255) NOT NULL",
    first_name: "VARCHAR(100)",
    last_name: "VARCHAR(100)",
    phone: "VARCHAR(20)",
    date_of_birth: "DATE",
    profile_picture: "TEXT", // URL to profile image
    membership_tier: "ENUM('Standard', 'Premium', 'Elite', 'Royal') DEFAULT 'Standard'",
    membership_points: "INTEGER DEFAULT 0",
    email_verified: "BOOLEAN DEFAULT FALSE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    last_login: "TIMESTAMP",
    is_active: "BOOLEAN DEFAULT TRUE"
  },

  // User Addresses
  user_addresses: {
    id: "UUID PRIMARY KEY",
    user_id: "UUID REFERENCES users(id) ON DELETE CASCADE",
    type: "ENUM('billing', 'shipping', 'both') DEFAULT 'shipping'",
    first_name: "VARCHAR(100) NOT NULL",
    last_name: "VARCHAR(100) NOT NULL",
    company: "VARCHAR(255)",
    address_line_1: "VARCHAR(255) NOT NULL",
    address_line_2: "VARCHAR(255)",
    city: "VARCHAR(100) NOT NULL",
    state: "VARCHAR(100) NOT NULL",
    postal_code: "VARCHAR(20) NOT NULL",
    country: "VARCHAR(100) NOT NULL",
    is_default: "BOOLEAN DEFAULT FALSE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Product Categories
  categories: {
    id: "UUID PRIMARY KEY",
    name: "VARCHAR(100) NOT NULL",
    slug: "VARCHAR(100) UNIQUE NOT NULL",
    description: "TEXT",
    image_url: "TEXT",
    parent_id: "UUID REFERENCES categories(id) ON DELETE SET NULL",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "BOOLEAN DEFAULT TRUE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Products
  products: {
    id: "UUID PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    slug: "VARCHAR(255) UNIQUE NOT NULL",
    description: "TEXT",
    short_description: "VARCHAR(500)",
    base_price: "DECIMAL(10,2) NOT NULL",
    sku: "VARCHAR(100) UNIQUE NOT NULL",
    category_id: "UUID REFERENCES categories(id)",
    weight: "DECIMAL(8,2)", // in grams
    dimensions: "JSON", // {length, width, height, diameter}
    materials: "JSON", // {handle, frame, fabric, ribs}
    features: "JSON", // {wind_resistant, auto_open, auto_close, uv_protection}
    care_instructions: "TEXT",
    warranty_period: "INTEGER DEFAULT 12", // months
    stock_quantity: "INTEGER DEFAULT 0",
    min_stock_level: "INTEGER DEFAULT 5",
    is_customizable: "BOOLEAN DEFAULT TRUE",
    is_featured: "BOOLEAN DEFAULT FALSE",
    is_active: "BOOLEAN DEFAULT TRUE",
    meta_title: "VARCHAR(255)",
    meta_description: "TEXT",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Product Images
  product_images: {
    id: "UUID PRIMARY KEY",
    product_id: "UUID REFERENCES products(id) ON DELETE CASCADE",
    image_url: "TEXT NOT NULL",
    alt_text: "VARCHAR(255)",
    sort_order: "INTEGER DEFAULT 0",
    is_primary: "BOOLEAN DEFAULT FALSE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Product Variants (for different sizes, colors, etc.)
  product_variants: {
    id: "UUID PRIMARY KEY",
    product_id: "UUID REFERENCES products(id) ON DELETE CASCADE",
    variant_name: "VARCHAR(255) NOT NULL",
    sku: "VARCHAR(100) UNIQUE NOT NULL",
    price_adjustment: "DECIMAL(10,2) DEFAULT 0.00",
    stock_quantity: "INTEGER DEFAULT 0",
    variant_attributes: "JSON", // {size, color, special_features}
    is_active: "BOOLEAN DEFAULT TRUE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Customization Options
  customization_options: {
    id: "UUID PRIMARY KEY",
    category: "ENUM('handle', 'frame', 'fabric', 'color', 'monogram', 'packaging') NOT NULL",
    name: "VARCHAR(255) NOT NULL",
    description: "TEXT",
    price_adjustment: "DECIMAL(10,2) DEFAULT 0.00",
    image_url: "TEXT",
    is_premium: "BOOLEAN DEFAULT FALSE",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "BOOLEAN DEFAULT TRUE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Custom Product Configurations
  custom_configurations: {
    id: "UUID PRIMARY KEY",
    user_id: "UUID REFERENCES users(id)",
    base_product_id: "UUID REFERENCES products(id)",
    configuration_name: "VARCHAR(255)",
    customizations: "JSON", // {handle_id, frame_id, fabric_id, color_id, monogram_text, packaging_id}
    total_price: "DECIMAL(10,2) NOT NULL",
    is_saved: "BOOLEAN DEFAULT FALSE", // saved for later vs in cart
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Shopping Cart
  cart_items: {
    id: "UUID PRIMARY KEY",
    user_id: "UUID REFERENCES users(id) ON DELETE CASCADE",
    product_id: "UUID REFERENCES products(id)",
    variant_id: "UUID REFERENCES product_variants(id)",
    custom_configuration_id: "UUID REFERENCES custom_configurations(id)",
    quantity: "INTEGER NOT NULL DEFAULT 1",
    unit_price: "DECIMAL(10,2) NOT NULL",
    total_price: "DECIMAL(10,2) NOT NULL",
    added_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Orders
  orders: {
    id: "UUID PRIMARY KEY",
    order_number: "VARCHAR(50) UNIQUE NOT NULL",
    user_id: "UUID REFERENCES users(id)",
    status: "ENUM('pending', 'confirmed', 'processing', 'crafting', 'quality_check', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending'",
    subtotal: "DECIMAL(10,2) NOT NULL",
    tax_amount: "DECIMAL(10,2) DEFAULT 0.00",
    shipping_amount: "DECIMAL(10,2) DEFAULT 0.00",
    discount_amount: "DECIMAL(10,2) DEFAULT 0.00",
    total_amount: "DECIMAL(10,2) NOT NULL",
    currency: "VARCHAR(3) DEFAULT 'INR'",
    payment_status: "ENUM('pending', 'paid', 'failed', 'refunded', 'partially_refunded') DEFAULT 'pending'",
    payment_method: "VARCHAR(50)",
    payment_reference: "VARCHAR(255)",
    billing_address: "JSON",
    shipping_address: "JSON",
    notes: "TEXT",
    estimated_delivery: "DATE",
    shipped_at: "TIMESTAMP",
    delivered_at: "TIMESTAMP",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Order Items
  order_items: {
    id: "UUID PRIMARY KEY",
    order_id: "UUID REFERENCES orders(id) ON DELETE CASCADE",
    product_id: "UUID REFERENCES products(id)",
    variant_id: "UUID REFERENCES product_variants(id)",
    custom_configuration_id: "UUID REFERENCES custom_configurations(id)",
    product_name: "VARCHAR(255) NOT NULL", // snapshot for historical data
    product_sku: "VARCHAR(100)",
    quantity: "INTEGER NOT NULL",
    unit_price: "DECIMAL(10,2) NOT NULL",
    total_price: "DECIMAL(10,2) NOT NULL",
    customization_details: "JSON", // snapshot of customizations
    crafting_status: "ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending'",
    craftsman_id: "UUID", // reference to craftsman
    estimated_completion: "DATE",
    actual_completion: "TIMESTAMP",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Order Status History
  order_status_history: {
    id: "UUID PRIMARY KEY",
    order_id: "UUID REFERENCES orders(id) ON DELETE CASCADE",
    status: "VARCHAR(50) NOT NULL",
    message: "TEXT",
    updated_by: "UUID", // admin/system user
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Payments
  payments: {
    id: "UUID PRIMARY KEY",
    order_id: "UUID REFERENCES orders(id)",
    payment_method: "ENUM('razorpay', 'stripe', 'paypal', 'bank_transfer', 'cash_on_delivery')",
    payment_gateway_id: "VARCHAR(255)",
    amount: "DECIMAL(10,2) NOT NULL",
    currency: "VARCHAR(3) DEFAULT 'INR'",
    status: "ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending'",
    gateway_response: "JSON",
    transaction_fee: "DECIMAL(10,2) DEFAULT 0.00",
    processed_at: "TIMESTAMP",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Discounts and Coupons
  coupons: {
    id: "UUID PRIMARY KEY",
    code: "VARCHAR(50) UNIQUE NOT NULL",
    name: "VARCHAR(255) NOT NULL",
    description: "TEXT",
    type: "ENUM('percentage', 'fixed_amount', 'free_shipping') NOT NULL",
    value: "DECIMAL(10,2) NOT NULL",
    minimum_order_amount: "DECIMAL(10,2) DEFAULT 0.00",
    maximum_discount_amount: "DECIMAL(10,2)",
    usage_limit: "INTEGER",
    usage_limit_per_user: "INTEGER DEFAULT 1",
    used_count: "INTEGER DEFAULT 0",
    valid_from: "TIMESTAMP NOT NULL",
    valid_until: "TIMESTAMP NOT NULL",
    is_active: "BOOLEAN DEFAULT TRUE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Coupon Usage Tracking
  coupon_usage: {
    id: "UUID PRIMARY KEY",
    coupon_id: "UUID REFERENCES coupons(id)",
    user_id: "UUID REFERENCES users(id)",
    order_id: "UUID REFERENCES orders(id)",
    discount_amount: "DECIMAL(10,2) NOT NULL",
    used_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Wishlist
  wishlist_items: {
    id: "UUID PRIMARY KEY",
    user_id: "UUID REFERENCES users(id) ON DELETE CASCADE",
    product_id: "UUID REFERENCES products(id) ON DELETE CASCADE",
    variant_id: "UUID REFERENCES product_variants(id) ON DELETE SET NULL",
    custom_configuration_id: "UUID REFERENCES custom_configurations(id) ON DELETE SET NULL",
    added_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Product Reviews
  reviews: {
    id: "UUID PRIMARY KEY",
    product_id: "UUID REFERENCES products(id) ON DELETE CASCADE",
    user_id: "UUID REFERENCES users(id)",
    order_item_id: "UUID REFERENCES order_items(id)", // ensures verified purchase
    rating: "INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL",
    title: "VARCHAR(255)",
    comment: "TEXT",
    pros: "TEXT",
    cons: "TEXT",
    is_verified_purchase: "BOOLEAN DEFAULT FALSE",
    is_approved: "BOOLEAN DEFAULT FALSE",
    helpful_count: "INTEGER DEFAULT 0",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Review Images
  review_images: {
    id: "UUID PRIMARY KEY",
    review_id: "UUID REFERENCES reviews(id) ON DELETE CASCADE",
    image_url: "TEXT NOT NULL",
    alt_text: "VARCHAR(255)",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Inventory Management
  inventory_movements: {
    id: "UUID PRIMARY KEY",
    product_id: "UUID REFERENCES products(id)",
    variant_id: "UUID REFERENCES product_variants(id)",
    movement_type: "ENUM('in', 'out', 'adjustment', 'reserved', 'released') NOT NULL",
    quantity: "INTEGER NOT NULL",
    reference_type: "ENUM('purchase', 'sale', 'return', 'damage', 'manual')",
    reference_id: "UUID", // order_id, return_id, etc.
    notes: "TEXT",
    performed_by: "UUID", // admin user
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Newsletter Subscriptions
  newsletter_subscribers: {
    id: "UUID PRIMARY KEY",
    email: "VARCHAR(255) UNIQUE NOT NULL",
    user_id: "UUID REFERENCES users(id) ON DELETE SET NULL",
    is_subscribed: "BOOLEAN DEFAULT TRUE",
    subscription_date: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    unsubscription_date: "TIMESTAMP",
    preferences: "JSON" // {product_updates, sales, newsletters}
  },

  // Contact Form Submissions
  contact_submissions: {
    id: "UUID PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    email: "VARCHAR(255) NOT NULL",
    phone: "VARCHAR(20)",
    subject: "VARCHAR(255)",
    message: "TEXT NOT NULL",
    type: "ENUM('general', 'support', 'custom_order', 'complaint', 'partnership') DEFAULT 'general'",
    status: "ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new'",
    assigned_to: "UUID", // admin user
    response: "TEXT",
    responded_at: "TIMESTAMP",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Admin Users
  admin_users: {
    id: "UUID PRIMARY KEY",
    username: "VARCHAR(100) UNIQUE NOT NULL",
    email: "VARCHAR(255) UNIQUE NOT NULL",
    password_hash: "VARCHAR(255) NOT NULL",
    first_name: "VARCHAR(100) NOT NULL",
    last_name: "VARCHAR(100) NOT NULL",
    role: "ENUM('super_admin', 'admin', 'manager', 'craftsman', 'support') NOT NULL",
    permissions: "JSON", // specific permissions array
    is_active: "BOOLEAN DEFAULT TRUE",
    last_login: "TIMESTAMP",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Site Settings
  site_settings: {
    id: "UUID PRIMARY KEY",
    key: "VARCHAR(100) UNIQUE NOT NULL",
    value: "TEXT",
    type: "ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string'",
    category: "VARCHAR(100)", // general, payment, shipping, etc.
    description: "TEXT",
    is_public: "BOOLEAN DEFAULT FALSE", // can be accessed by frontend
    updated_by: "UUID REFERENCES admin_users(id)",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },

  // Shipping Methods
  shipping_methods: {
    id: "UUID PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    description: "TEXT",
    base_cost: "DECIMAL(10,2) NOT NULL",
    cost_per_kg: "DECIMAL(10,2) DEFAULT 0.00",
    free_shipping_threshold: "DECIMAL(10,2)",
    estimated_days_min: "INTEGER",
    estimated_days_max: "INTEGER",
    is_express: "BOOLEAN DEFAULT FALSE",
    is_active: "BOOLEAN DEFAULT TRUE",
    sort_order: "INTEGER DEFAULT 0",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  },

  // Tracking Information
  shipment_tracking: {
    id: "UUID PRIMARY KEY",
    order_id: "UUID REFERENCES orders(id)",
    carrier: "VARCHAR(100)",
    tracking_number: "VARCHAR(255)",
    tracking_url: "TEXT",
    current_status: "VARCHAR(100)",
    estimated_delivery: "TIMESTAMP",
    actual_delivery: "TIMESTAMP",
    tracking_updates: "JSON", // array of status updates
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  }
};

// Indexes for Performance
const indexes = {
  // User related indexes
  "idx_users_email": "CREATE INDEX ON users(email)",
  "idx_users_membership": "CREATE INDEX ON users(membership_tier)",
  "idx_user_addresses_user": "CREATE INDEX ON user_addresses(user_id)",
  
  // Product related indexes
  "idx_products_category": "CREATE INDEX ON products(category_id)",
  "idx_products_active": "CREATE INDEX ON products(is_active)",
  "idx_products_featured": "CREATE INDEX ON products(is_featured)",
  "idx_product_images_product": "CREATE INDEX ON product_images(product_id)",
  "idx_product_variants_product": "CREATE INDEX ON product_variants(product_id)",
  
  // Order related indexes
  "idx_orders_user": "CREATE INDEX ON orders(user_id)",
  "idx_orders_status": "CREATE INDEX ON orders(status)",
  "idx_orders_created": "CREATE INDEX ON orders(created_at)",
  "idx_order_items_order": "CREATE INDEX ON order_items(order_id)",
  "idx_order_items_product": "CREATE INDEX ON order_items(product_id)",
  
  // Cart and wishlist indexes
  "idx_cart_items_user": "CREATE INDEX ON cart_items(user_id)",
  "idx_wishlist_user": "CREATE INDEX ON wishlist_items(user_id)",
  
  // Review indexes
  "idx_reviews_product": "CREATE INDEX ON reviews(product_id)",
  "idx_reviews_user": "CREATE INDEX ON reviews(user_id)",
  "idx_reviews_approved": "CREATE INDEX ON reviews(is_approved)",
  
  // Customization indexes
  "idx_custom_configs_user": "CREATE INDEX ON custom_configurations(user_id)",
  "idx_customization_options_category": "CREATE INDEX ON customization_options(category)",
  
  // Performance indexes
  "idx_payments_order": "CREATE INDEX ON payments(order_id)",
  "idx_coupons_code": "CREATE INDEX ON coupons(code)",
  "idx_inventory_product": "CREATE INDEX ON inventory_movements(product_id)"
};

// Sample Data Inserts
const sampleData = {
  // Customization Options
  handleOptions: [
    {
      category: 'handle',
      name: 'Italian Leather',
      description: 'Premium Italian leather with embossed pattern',
      price_adjustment: 0.00,
      is_premium: true
    },
    {
      category: 'handle',
      name: 'Oak Wood',
      description: 'Solid oak wood with natural grain finish',
      price_adjustment: 1500.00,
      is_premium: true
    },
    {
      category: 'handle',
      name: 'Bamboo',
      description: 'Sustainable bamboo with smooth finish',
      price_adjustment: 800.00,
      is_premium: false
    },
    {
      category: 'handle',
      name: 'Carbon Grip',
      description: 'High-tech carbon fiber grip',
      price_adjustment: 2200.00,
      is_premium: true
    }
  ],

  frameOptions: [
    {
      category: 'frame',
      name: 'Carbon Fiber',
      description: 'Lightweight and extremely durable',
      price_adjustment: 0.00,
      is_premium: true
    },
    {
      category: 'frame',
      name: 'Titanium',
      description: 'Ultra-lightweight aerospace grade titanium',
      price_adjustment: 3500.00,
      is_premium: true
    },
    {
      category: 'frame',
      name: 'Aluminum',
      description: 'Lightweight aluminum alloy',
      price_adjustment: -800.00,
      is_premium: false
    },
    {
      category: 'frame',
      name: 'Steel',
      description: 'Traditional steel frame for durability',
      price_adjustment: -1200.00,
      is_premium: false
    }
  ],

  fabricOptions: [
    {
      category: 'fabric',
      name: 'Waterproof Polyester',
      description: 'High-performance waterproof fabric',
      price_adjustment: 0.00,
      is_premium: false
    },
    {
      category: 'fabric',
      name: 'Silk Blend',
      description: 'Luxurious silk and polyester blend',
      price_adjustment: 2500.00,
      is_premium: true
    },
    {
      category: 'fabric',
      name: 'Heritage Canvas',
      description: 'Traditional waxed canvas',
      price_adjustment: 1800.00,
      is_premium: true
    },
    {
      category: 'fabric',
      name: 'Tech Nylon',
      description: 'Advanced ripstop nylon',
      price_adjustment: 1200.00,
      is_premium: false
    }
  ]
};

module.exports = {
  databaseSchema,
  indexes,
  sampleData
};
