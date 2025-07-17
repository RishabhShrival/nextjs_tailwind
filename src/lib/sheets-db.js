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

const sheetsDB = {
  createUser,
  getUserByEmail
};

export default sheetsDB;