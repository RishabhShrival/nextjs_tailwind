// Google Sheets API Integration for ROYOMBER
// This handles all database operations with Google Sheets

import { google } from 'googleapis';

// Initialize Google Sheets API
const initializeSheets = () => {
  try {
    // Properly format the private key
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey) {
      // Remove quotes and properly handle newlines
      privateKey = privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
    throw new Error('Google Sheets configuration error');
  }
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Sheet names (tabs in your Google Sheet)
const SHEETS = {
  USERS: 'Users',
  ADDRESSES: 'Addresses', 
  PRODUCTS: 'Products',
  ORDERS: 'Orders',
  CUSTOMIZATIONS: 'Customizations',
  ADMIN_LOGS: 'Admin_Logs'
};

// Helper function to convert array to object with headers
const arrayToObject = (headers, row) => {
  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = row[index] || '';
  });
  return obj;
};

// Utility function to convert Google Drive links to direct image URLs
const convertDriveLink = (url) => {
  if (!url) return url;
  
  // Check if it's a Google Drive link
  const driveMatch = url.match(/(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  
  if (driveMatch) {
    const fileId = driveMatch[1];
    // Convert to direct viewable link
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url; // Return original URL if not a Drive link
};

// Helper function to process product data and convert image URLs
const processProductData = (product) => {
  if (!product) return product;
  
  return {
    ...product,
    imageUrl: convertDriveLink(product.image_url || product.imageUrl),
    // Convert other image fields if they exist
    gallery_images: product.gallery_images ? 
      product.gallery_images.split(',').map(img => convertDriveLink(img.trim())) : []
  };
};

// USER OPERATIONS
export const createUser = async (userData) => {
  try {
    // Check if required environment variables are set
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets credentials not configured');
      return null;
    }

    const sheets = initializeSheets();
    
    const newUser = {
      user_id: `USER_${Date.now()}`,
      email: userData.email,
      password: userData.password, // Store password (consider hashing in production)
      first_name: userData.firstName,
      last_name: userData.lastName,
      phone: userData.phone || '',
      date_of_birth: userData.dateOfBirth || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: 'TRUE',
      auth_provider: 'credentials'
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.USERS}!A:K`, // Updated to K to include password column
      valueInputOption: 'RAW',
      resource: {
        values: [Object.values(newUser)]
      }
    });

    return newUser;
  } catch (error) {
    console.log('Google Sheets user creation failed, using fallback:', error.message);
    return null;
  }
};

export const getUserByEmail = async (email) => {
  try {
    // Check if required environment variables are set
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets credentials not configured');
      return null;
    }

    const sheets = initializeSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.USERS}!A:K`, // Updated to include password column
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return null;

    const headers = rows[0];
    const userRow = rows.find(row => row[1] === email); // Email is in column B (index 1)
    
    if (!userRow) return null;
    
    return arrayToObject(headers, userRow);
  } catch (error) {
    console.log('Google Sheets authentication failed, using fallback auth:', error.message);
    return null;
  }
};

// PRODUCT OPERATIONS
export const createProduct = async (productData) => {
  try {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets credentials not configured');
      return null;
    }

    const sheets = initializeSheets();
    
    const newProduct = {
      id: productData.id,
      name: productData.name,
      description: productData.description,
      base_price: productData.basePrice,
      category: productData.category,
      image_url: productData.imageUrl,
      features: JSON.stringify(productData.features), // Store as JSON string
      stock_quantity: productData.stockQuantity,
      is_active: productData.isActive ? 'TRUE' : 'FALSE',
      weight: productData.weight,
      dimensions: productData.dimensions,
      warranty_period: productData.warrantyPeriod,
      materials: JSON.stringify(productData.materials), // Store as JSON string
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PRODUCTS}!A:N`, // A to N for all product columns
      valueInputOption: 'RAW',
      resource: {
        values: [Object.values(newProduct)]
      }
    });

    return newProduct;
  } catch (error) {
    console.log('Google Sheets product creation failed:', error.message);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets credentials not configured');
      return [];
    }

    const sheets = initializeSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PRODUCTS}!A:N`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const headers = rows[0];
    const productRows = rows.slice(1); // Skip header row
    
    return productRows.map(row => {
      const product = arrayToObject(headers, row);
      
      // Convert JSON strings back to objects/arrays
      if (product.features) {
        try {
          product.features = JSON.parse(product.features);
        } catch (e) {
          product.features = [];
        }
      }
      
      if (product.materials) {
        try {
          product.materials = JSON.parse(product.materials);
        } catch (e) {
          product.materials = {};
        }
      }
      
      // Convert string values to appropriate types
      product.base_price = parseInt(product.base_price) || 0;
      product.stock_quantity = parseInt(product.stock_quantity) || 0;
      product.is_active = product.is_active === 'TRUE';
      
      // Map sheet column names to product object names
      const mappedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        basePrice: product.base_price,
        category: product.category,
        imageUrl: product.image_url,
        features: product.features,
        stockQuantity: product.stock_quantity,
        isActive: product.is_active,
        weight: product.weight,
        dimensions: product.dimensions,
        warrantyPeriod: product.warranty_period,
        materials: product.materials
      };
      
      // Process and convert image URLs
      return processProductData(mappedProduct);
    });
  } catch (error) {
    console.log('Google Sheets product retrieval failed:', error.message);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const products = await getAllProducts();
    return products.find(product => product.id === productId) || null;
  } catch (error) {
    console.log('Google Sheets product retrieval failed:', error.message);
    return null;
  }
};

export const getActiveProducts = async () => {
  try {
    const products = await getAllProducts();
    return products.filter(product => product.isActive);
  } catch (error) {
    console.log('Google Sheets product retrieval failed:', error.message);
    return [];
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const products = await getAllProducts();
    return products.filter(product => product.category === category && product.isActive);
  } catch (error) {
    console.log('Google Sheets product retrieval failed:', error.message);
    return [];
  }
};

// Order Management Functions
export const createOrder = async (orderData) => {
  try {
    const sheets = initializeSheets();
    
    // Generate order ID
    const orderId = `ORD${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const rowData = [
      orderId,
      orderData.productId,
      orderData.productName,
      orderData.customerName || '',
      orderData.customerEmail || '',
      orderData.customerPhone || '',
      orderData.customerAddress || '',
      orderData.quantity || 1,
      orderData.unitPrice || 0,
      orderData.totalAmount || 0,
      orderData.paymentMethod || 'UPI',
      'PENDING', // payment_status
      'PENDING', // order_status
      orderData.upiTransactionId || '',
      timestamp, // created_at
      timestamp  // updated_at
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A:P`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData]
      }
    });

    return { success: true, orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, updates) => {
  try {
    const sheets = initializeSheets();
    
    // Get all orders to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A:P`
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return { success: false, error: 'No orders found' };

    const headers = rows[0];
    const orderIndex = rows.findIndex((row, index) => index > 0 && row[0] === orderId);
    
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }

    // Update the order row
    const rowNumber = orderIndex + 1;
    const currentRow = rows[orderIndex];
    
    // Update specific fields
    if (updates.paymentStatus) currentRow[11] = updates.paymentStatus;
    if (updates.orderStatus) currentRow[12] = updates.orderStatus;
    if (updates.upiTransactionId) currentRow[13] = updates.upiTransactionId;
    currentRow[15] = new Date().toISOString(); // updated_at

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A${rowNumber}:P${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [currentRow]
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
};

export const getOrderById = async (orderId) => {
  try {
    const sheets = initializeSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A:P`
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return null;

    const headers = rows[0];
    const orderRow = rows.find((row, index) => index > 0 && row[0] === orderId);
    
    if (!orderRow) return null;

    return arrayToObject(headers, orderRow);
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    const sheets = initializeSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A:P`
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    const headers = rows[0];
    const orders = rows.slice(1).map(row => arrayToObject(headers, row));
    
    return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

const sheetsDB = {
  createUser,
  getUserByEmail,
  createProduct,
  getAllProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory,
  createOrder,
  updateOrderStatus,
  getOrderById,
  getAllOrders
};

export default sheetsDB;