1. Project Description

Project Name: CarAuction

Short Description:

CarAuction is a modern web-based auction platform where users can place bids on vehicles through an open auction system. The system allows users to register and log in to actively participate in bidding. Additionally, it provides an admin panel for administrators to perform full CRUD (Create, Read, Update, Delete) operations on vehicles in the system.

Purpose and Motivation:

The main goal of this project was to learn new skills by using React (frontend) and .NET (backend) technologies. At the same time, I aimed to understand potential security vulnerabilities in such applications and explore ways to build a secure system.

Target User Group:

The platform targets a broad audience without restrictions. It can be used by anyone, from individuals looking to purchase vehicles to technology enthusiasts.

Core Features:

Fetching data via API

User registration and login system

Participating in auctions and placing bids

Admin panel for administrators

CRUD operations on vehicles through the admin panel
(Note: No CRUD operations are provided for regular users.)

2. Tech Stack

   The CarAuction project is built using modern web development technologies in a full-stack, n-layer architecture backend.

Frontend:

React (with TypeScript)

Redux Toolkit + RTK Query (for global state management and API calls)

SignalR (for real-time bid updates)

Bootstrap (for UI design)

RTK Query

Backend:

ASP.NET Core 8

Entity Framework (Code-First)

ASP.NET Identity (for user management)

JWT (JSON Web Token) (for authentication and authorization)

Database:

MySQL (for data management)

Payment System:

Stripe API (for payment integration)

Real-Time Communication:

SignalR (to transmit real-time bid data)

3. Setup and Running Instructions

   The project is structured with frontend (React) and backend (ASP.NET Core) code in separate folders. The following steps outline how to run the project in a local development environment.

Prerequisites
Make sure the following software is installed on your computer:

Node.js (for React application)

.NET 8 SDK (for backend)

MySQL Server (for the database)

Visual Studio

1. Frontend (React + TypeScript)
   Navigate to the CarAuction/client folder in your terminal:
   cd CarAuctionReact/auctionclient
2. Install dependencies:
   npm install
   3.Start the application:
   npm start
   Database Setup
   The project uses Entity Framework Code-First approach.
   3.Database Setup

Before running the application for the first time, execute the migrations commands:
dotnet ef migrations add InitialCreate
dotnet ef database update
These commands will create the MySQL database based on the defined ApplicationDbContext.
4.Environment Variables

Example of appsettings.json configuration:
{
"ConnectionStrings": {
"DefaultConnection": "server=localhost;database=carauctiondb;user=root;password=yourpassword;"
},
"Jwt": {
"Key": "YourSuperSecretKey",
"Issuer": "CarAuctionApp"
},
"Stripe": {
"SecretKey": "your_stripe_secret_key"
}
}
