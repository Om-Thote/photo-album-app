##Photo Album Web Application

A full-stack Photo Album web application built with React (TypeScript + Tailwind CSS) on the frontend and Python Flask with MySQL on the backend.
The application allows users to upload, view, and manage images through a clean, responsive interface powered by REST APIs.

#Why This Project

Among the available options (To-Do app, Blog, Food Delivery, Photo Album), the Photo Album application was chosen because it demonstrates a broader range of real-world engineering skills in a focused and manageable scope.
This project showcases:
File handling and storage (image uploads)
Frontend–backend communication using REST APIs
Database integration for metadata storage
Media serving from a backend server
Responsive UI design
Unlike a basic To-Do app (mostly CRUD text data) or a large Food Delivery system (which requires heavy business logic and integrations), this project strikes a balance between technical depth and clarity, making it ideal for demonstrating full-stack fundamentals.

#Application Architecture

The application follows a client–server architecture:

React (TypeScript + Tailwind)
        |
        |  Axios (HTTP Requests)
        v
Flask REST API
        |
        |  SQL Queries
        v
MySQL Database


The frontend is responsible for UI, user interaction, and API consumption.
The backend handles image validation, file storage, and database operations.
MySQL stores image metadata (title and filename).
Actual image files are stored on the server and served via Flask.

#Technology Stack

Frontend
React (with TypeScript)
Tailwind CSS
Axios
Vite (development and build tool)

Backend
Python Flask
Flask-CORS
MySQL Connector (Python)
Database
MySQL

#Features

Upload images with a custom title
Server-side image validation (PNG, JPG, JPEG only)
Unique filename generation to prevent overwrites
Responsive image gallery
Delete images (removes both file and database entry)
Clean, mobile-friendly UI using Tailwind CSS

#Frontend–Backend Communication

The frontend communicates with the backend using Axios over HTTP.
All API calls originate from a centralized Axios instance
Flask uses CORS to allow requests from the frontend port
Images are served directly from the backend using a dedicated route
Example:
GET http://localhost:5000/photos
POST http://localhost:5000/upload
This separation keeps the frontend stateless and the backend responsible for data and file management.

#Database Design

Only essential metadata is stored in the database:
Column	Type	Description
id	INT	Primary key
title	VARCHAR	Image title
image	VARCHAR	Stored filename
Image files themselves are stored on the server filesystem for better performance and simplicity.

#Dependencies

Frontend Dependencies
react – UI library
react-dom – DOM rendering for React
typescript – Static type checking
axios – HTTP client for API communication
tailwindcss – Utility-first CSS framework
postcss – CSS processing
autoprefixer – Vendor prefix handling
vite – Development server and build tool
@types/react – Type definitions for React
@types/react-dom – Type definitions for React DOM

Backend Dependencies
flask – Web framework
flask-cors – Cross-origin request handling
mysql-connector-python – MySQL database connector

#Running the Application

Backend
Configure MySQL and create the database
Install Python dependencies
Start the Flask server
Backend runs on:
http://localhost:5000

Frontend
Install Node.js dependencies
Start the Vite development server
Frontend runs on:
http://localhost:5173

#File Storage Strategy

Uploaded images are stored inside an uploads/ directory on the server
Filenames are generated using UUIDs to ensure uniqueness
A .gitkeep file is used to track the uploads directory in version control


Author
Om Thote
