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
      return {
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

const sheetsDB = {
  createUser,
  getUserByEmail,
  createProduct,
  getAllProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory
};

export default sheetsDB;