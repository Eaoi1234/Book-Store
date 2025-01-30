# Book Store - Setup Guide

This repository contains the implementation of a Book Store with the following structure:

- **Frontend**: Implemented using React and Vite.
- **Backend**: Implemented using Node.js and Express.
- **Database**: MongoDB for data storage.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB**
- **Git**
---
## Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/yourusername/book-store.git
   cd book-store/backend

2. Install the dependencies:
    ```bash 
    npm install

3. Create a .env file in the backend directory and add the following environment variables:
    ```bash
    NODE_ENV=development
    DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/book-store?retryWrites=true&w=majority
    PORT=3000
    DATABASE_PASSWORD=your_database_password

4. Start the backend server:
    ```bash
    npm run dev

The backend server will run at http://localhost:3000
---
## Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend

2. Install the dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run dev
Access the frontend at http://localhost:5173

Usage
    Open your browser and go to http://localhost:5173 to access the frontend.
    Ensure the backend server is running on http://localhost:3000 for API access.       
---

<h1>API Endpoints</h1>

## Product API Endpoints

| Endpoint	| Method	| Description |
|---------------|------------|-----------------------|
|/api/v1/products	|GET	| Retrieves all products. |
|/api/v1/products/:id|	GET	| Retrieves a product by its ID. |
|/api/v1/products	|POST	| Creates a new product. |
|/api/v1/products/:id|	PATCH	| Updates an existing product by its ID. |
|/api/v1/products/:id|	DELETE	| Deletes a product by its ID. |

## Cart API Endpoints
| Endpoint | Method | Description |
|-----------------|------|-------------------------------|
|/api/v1/cart/add |	POST | Adds a product to the cart. |
|/api/v1/cart | GET	| Retrieves cart items. |
|/api/v1/cart/total | POST | Calculates the total price of the cart. |

## Frontend Routes Overview
|Route|	Page | Description |
|--------|-------|---------------------------|
|/Home	| Displays | the home page with products. |
|/cart	| CartPage | Displays the cart page. |