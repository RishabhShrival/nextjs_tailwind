// ROYOMBER Product Database
// Centralized product management system

export const products = [
  {
    id: 'ROY001',
    name: 'The Royal Classic',
    description: 'Our flagship umbrella featuring traditional British craftsmanship with a modern twist. Handcrafted mahogany handle with brass fittings.',
    basePrice: 2999,
    category: 'Premium',
    imageUrl: '/products/product1.jpg',
    features: [
      'UV Protection 50+',
      'Wind Resistant up to 70mph',
      'Waterproof Canopy',
      'Mahogany Wood Handle',
      'Brass Fittings',
      'Lifetime Warranty'
    ],
    stockQuantity: 25,
    isActive: true,
    weight: '500g',
    dimensions: '105cm diameter when open',
    warrantyPeriod: 'Lifetime',
    materials: {
      canopy: 'Premium Waterproof Fabric',
      handle: 'Mahogany Wood',
      frame: 'Steel with Brass Fittings'
    }
  },
  {
    id: 'ROY002',
    name: 'The Executive',
    description: 'Perfect for the business professional. Sleek design with carbon fiber frame and leather-wrapped handle for superior comfort.',
    basePrice: 3999,
    category: 'Executive',
    imageUrl: '/products/product2.jpeg',
    features: [
      'Carbon Fiber Frame',
      'Leather Wrapped Handle',
      'Auto Open/Close',
      'UV Protection 50+',
      'Wind Resistant up to 80mph',
      'Travel Case Included'
    ],
    stockQuantity: 15,
    isActive: true,
    weight: '450g',
    dimensions: '110cm diameter when open',
    warrantyPeriod: 'Lifetime',
    materials: {
      canopy: 'High-Tech Waterproof Fabric',
      handle: 'Leather-wrapped Aluminum',
      frame: 'Carbon Fiber'
    }
  },
  {
    id: 'ROY003',
    name: 'The Heritage',
    description: 'A tribute to classic umbrella making. Features traditional construction methods with premium materials sourced from British suppliers.',
    basePrice: 4999,
    category: 'Heritage',
    imageUrl: '/products/product3.jpeg',
    features: [
      'Handmade Construction',
      'British Materials Only',
      'Vintage Brass Hardware',
      'Engraved Handle',
      'Limited Edition',
      'Certificate of Authenticity'
    ],
    stockQuantity: 8,
    isActive: true,
    weight: '600g',
    dimensions: '100cm diameter when open',
    warrantyPeriod: 'Lifetime',
    materials: {
      canopy: 'British Waxed Cotton',
      handle: 'English Oak with Brass Inlay',
      frame: 'Sheffield Steel'
    }
  }
]

// Umbrella customization options
export const umbrellaCustomization = {
  handles: [
    { id: 'mahogany', name: 'Mahogany Wood', price: 0, description: 'Classic mahogany with brass fittings' },
    { id: 'oak', name: 'English Oak', price: 200, description: 'Premium English oak with brass inlay' },
    { id: 'leather', name: 'Leather Wrapped', price: 300, description: 'Genuine leather wrapped aluminum core' },
    { id: 'carbon', name: 'Carbon Fiber', price: 500, description: 'Lightweight carbon fiber with modern design' },
    { id: 'sterling', name: 'Sterling Silver', price: 1200, description: 'Handcrafted sterling silver handle' }
  ],
  fabrics: [
    { id: 'classic-black', name: 'Classic Black', price: 0, description: 'Traditional black waterproof canopy' },
    { id: 'navy-blue', name: 'Navy Blue', price: 50, description: 'Deep navy blue premium fabric' },
    { id: 'forest-green', name: 'Forest Green', price: 50, description: 'Rich forest green with UV protection' },
    { id: 'burgundy', name: 'Burgundy', price: 100, description: 'Luxurious burgundy shade' },
    { id: 'tartan', name: 'Royal Tartan', price: 200, description: 'Traditional Scottish tartan pattern' }
  ],
  frames: [
    { id: 'steel', name: 'Sheffield Steel', price: 0, description: 'Durable Sheffield steel construction' },
    { id: 'titanium', name: 'Titanium Alloy', price: 400, description: 'Lightweight titanium for maximum durability' },
    { id: 'carbon-frame', name: 'Carbon Fiber', price: 600, description: 'Ultra-light carbon fiber frame' }
  ],
  monogramming: {
    available: true,
    price: 150,
    maxLength: 3,
    description: 'Hand-engraved monogram on handle'
  }
}

// Helper functions
export const getActiveProducts = () => {
  return products.filter(product => product.isActive)
}

export const getProductById = (id) => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category && product.isActive)
}

export const calculateCustomizationPrice = (basePrice, customizations) => {
  let totalPrice = basePrice
  
  if (customizations.handle) {
    const handle = umbrellaCustomization.handles.find(h => h.id === customizations.handle)
    if (handle) totalPrice += handle.price
  }
  
  if (customizations.fabric) {
    const fabric = umbrellaCustomization.fabrics.find(f => f.id === customizations.fabric)
    if (fabric) totalPrice += fabric.price
  }
  
  if (customizations.frame) {
    const frame = umbrellaCustomization.frames.find(f => f.id === customizations.frame)
    if (frame) totalPrice += frame.price
  }
  
  if (customizations.monogram && customizations.monogram.length > 0) {
    totalPrice += umbrellaCustomization.monogramming.price
  }
  
  return totalPrice
}

export const getCustomizationSummary = (customizations) => {
  const summary = {
    handle: null,
    fabric: null,
    frame: null,
    monogram: customizations.monogram || '',
    totalAdditionalCost: 0
  }
  
  if (customizations.handle) {
    summary.handle = umbrellaCustomization.handles.find(h => h.id === customizations.handle)
    if (summary.handle) summary.totalAdditionalCost += summary.handle.price
  }
  
  if (customizations.fabric) {
    summary.fabric = umbrellaCustomization.fabrics.find(f => f.id === customizations.fabric)
    if (summary.fabric) summary.totalAdditionalCost += summary.fabric.price
  }
  
  if (customizations.frame) {
    summary.frame = umbrellaCustomization.frames.find(f => f.id === customizations.frame)
    if (summary.frame) summary.totalAdditionalCost += summary.frame.price
  }
  
  if (customizations.monogram && customizations.monogram.length > 0) {
    summary.totalAdditionalCost += umbrellaCustomization.monogramming.price
  }
  
  return summary
}

// Categories for filtering
export const categories = [
  'All',
  'Premium',
  'Executive', 
  'Heritage'
]

// Price ranges for filtering
export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹3,000', min: 0, max: 3000 },
  { label: '₹3,000 - ₹4,000', min: 3000, max: 4000 },
  { label: '₹4,000 - ₹5,000', min: 4000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity }
]

const productsData = {
  products,
  umbrellaCustomization,
  getActiveProducts,
  getProductById,
  getProductsByCategory,
  calculateCustomizationPrice,
  getCustomizationSummary,
  categories,
  priceRanges
};

export default productsData;
