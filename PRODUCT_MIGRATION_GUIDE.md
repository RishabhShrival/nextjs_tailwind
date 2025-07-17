# ROYOMBER Product Database Migration

## Overview

Successfully migrated product data from static files to Google Sheets for dynamic, persistent data management.

## What Was Changed

### 1. Google Sheets Integration (`src/lib/sheets-db.js`)

- Added product management functions:
  - `createProduct()` - Add new products to Google Sheets
  - `getAllProducts()` - Fetch all products from Google Sheets
  - `getProductById()` - Get specific product by ID
  - `getActiveProducts()` - Get only active products
  - `getProductsByCategory()` - Filter products by category

### 2. API Endpoints (`src/app/api/products/route.js`)

- **POST** `/api/products` - Seed products or get products
- **GET** `/api/products` - Fetch all products from Google Sheets

### 3. Updated Product Data Structure (`src/data/products.js`)

- Converted helper functions to async for Google Sheets integration
- Added fallback to static data if Google Sheets fails
- Maintained backward compatibility

### 4. Dynamic Product Pages

- **Products List** (`src/app/products/page.js`) - Now fetches from Google Sheets API
- **Product Details** (`src/app/products/view/page.js`) - Now uses Google Sheets data
- Added loading states and error handling
- Added stock quantity display and out-of-stock handling

### 5. Admin Tools (`src/app/admin/seed-products/page.js`)

- Easy-to-use interface for migrating products to Google Sheets
- Shows current products in Google Sheets
- One-click seeding from local data

## Google Sheets Setup Required

### 1. Create Products Sheet Tab

Create a new tab called "Products" in your Google Sheet with these column headers:

```
id | name | description | base_price | category | image_url | features | stock_quantity | is_active | weight | dimensions | warranty_period | materials | created_at | updated_at
```

### 2. Column Details

- **id**: Product identifier (e.g., "ROY001")
- **name**: Product name
- **description**: Product description
- **base_price**: Price in rupees (without ₹ symbol)
- **category**: Product category (Premium, Executive, Heritage)
- **image_url**: Path to product image (e.g., "/products/product1.jpg")
- **features**: JSON array as string (e.g., '["UV Protection", "Waterproof"]')
- **stock_quantity**: Number of items in stock
- **is_active**: "TRUE" or "FALSE"
- **weight**: Product weight (e.g., "500g")
- **dimensions**: Product dimensions (e.g., "105cm diameter")
- **warranty_period**: Warranty info (e.g., "Lifetime")
- **materials**: JSON object as string (e.g., '{"canopy":"Premium Fabric","handle":"Mahogany"}')
- **created_at**: ISO date string
- **updated_at**: ISO date string

## How to Use

### 1. Seed Your Products

1. Visit `/admin/seed-products`
2. Click "Seed Products to Google Sheets"
3. Verify products were added by clicking "Fetch Products from Sheets"

### 2. Access Dynamic Products

- Visit `/products` to see products loaded from Google Sheets
- Products will show loading state while fetching
- Out-of-stock products will be disabled
- If no products exist, users can click link to seed products

### 3. Manage Products

- Add new products directly in Google Sheets
- Edit existing products in Google Sheets
- Changes reflect immediately on the website
- Set `is_active` to "FALSE" to hide products

## Benefits

✅ **Persistent Data**: Products survive deployments and rebuilds
✅ **Dynamic Updates**: Edit products without code changes
✅ **Real-time Stock**: Update stock levels directly in Google Sheets
✅ **Easy Management**: Non-technical users can manage products
✅ **Backup**: Google Sheets provides automatic backup and version history
✅ **Collaboration**: Multiple people can manage products
✅ **Fallback**: Falls back to static data if Google Sheets fails

## Next Steps

1. **Set up Google Sheets**: Create the Products tab with proper headers
2. **Seed Products**: Use the admin interface to migrate your products
3. **Test**: Verify products load correctly on the frontend
4. **Customize**: Add more product fields as needed
5. **Scale**: Add more products directly in Google Sheets

## Technical Notes

- Products are fetched fresh on each page load
- Consider adding caching for better performance
- Features and materials are stored as JSON strings
- Stock quantity of 0 disables the buy button
- Images still need to be uploaded to `/public/products/`

## File Changes Made

- ✅ `src/lib/sheets-db.js` - Added product functions
- ✅ `src/app/api/products/route.js` - New API endpoint
- ✅ `src/data/products.js` - Updated to async with fallback
- ✅ `src/app/products/page.js` - Dynamic product list
- ✅ `src/app/products/view/page.js` - Dynamic product details
- ✅ `src/app/admin/seed-products/page.js` - Admin seeding interface
- 📁 `src/app/products/page_old.js` - Backup of original page

Your e-commerce platform now has a fully dynamic, Google Sheets-powered product management system!
