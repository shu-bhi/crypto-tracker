# Crypto Tracker

Crypto Tracker is a Node.js server-side application that tracks the price, market cap, and 24-hour change of three cryptocurrencies—Bitcoin, Matic, and Ethereum—using the CoinGecko API. The project is designed to fetch the latest cryptocurrency data every 2 hours and store it in a MongoDB database. The application provides two APIs for retrieving the latest stats and calculating the standard deviation of price over the last 100 records for a given cryptocurrency.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run the Project](#run-the-project)
- [APIs](#apis)
  - [/stats](#stats-api)
  - [/deviation](#deviation-api)

## Features
- Fetches and stores the latest price, market cap, and 24-hour percentage change for Bitcoin, Matic, and Ethereum.
- Runs a background job every 2 hours to update the database with the latest data from CoinGecko.
- Provides APIs to retrieve the latest stats for any of the three cryptocurrencies.
- Calculates the standard deviation of the price over the last 100 records.

## Prerequisites
- Node.js (v14.6.0 or higher)
- MongoDB (Local instance or MongoDB Atlas cloud database)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-tracker.git

2. Navigate to the project directory:
   ```bash
   cd crypto-tracker
3. Install the dependencies:
   ```bash
   npm install
4. Start your MongoDB server locally

## Run the Project

1. Start the Node.js server:
   ```bash
   node index.js
2. The server should start on http://localhost:5000 and the background job will run to fetch the initial cryptocurrency data.

## APIs
/stats API

Description: Returns the latest price, market cap, and 24-hour percentage change of a specified cryptocurrency.

Method: GET

Endpoint: /api/stats

Query Parameters:

coin (required): Name of the cryptocurrency (bitcoin, matic-network, ethereum).

Sample Response:
```bash
{
  "price": 40000,
  "marketCap": 800000000,
  "change24h": 3.4
}
```

/deviation API
Description: Returns the standard deviation of the price of a specified cryptocurrency over the last 100 records stored in the database.

Method: GET

Endpoint: /api/deviation

Query Parameters:

coin (required): Name of the cryptocurrency (bitcoin, matic-network, ethereum).
Sample Response:
```bash
{
  "deviation": 4082.48
}
```
