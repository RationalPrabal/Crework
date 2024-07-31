# Trello-Style Task Management Application

## Overview

**Trello-Style Task Management Application** is a web-based tool designed to help users organize and manage their tasks effectively. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application mimics the functionality of Trello, providing features like task boards, drag-and-drop functionality, and advanced task management tools.

## Features

- **User Authentication**
  - Signup and login with email and password
  - Secure password storage and user session management

- **Task Board**
  - Personal task board with columns: "To-Do", "In Progress", "Under Review", "Completed"

- **Task Management**
  - Create, edit, and delete tasks
  - Task details include:
    - Title (mandatory)
    - Description (optional)
    - Status (auto-filled based on the column)
    - Priority (optional: Low, Medium, Urgent)
    - Deadline (optional)

- **Drag and Drop Functionality**
  - Move tasks between columns with automatic status updates

- **Search and Filter**
  - Search for tasks by title or description
  - Filter tasks based on priority, status, and deadlines


- **Calendar View**
  - View tasks in a calendar format based on deadlines

- **Data Persistence**
  - Secure storage of user data and tasks in a database
  - Each user manages their own tasks only


## Installation

### Prerequisites

- Node.js
- MongoDB
- Git

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RationalPrabal/Crework.git
   cd Crework
2. Navigate to Backend folder and create an env file
    ```
   MONGO_URI=your mongo uri
   PORT= your port 
   JWT_SECRET=your jwt secret
    
    
3. npm i
4. npm run dev
   
5. Navigate to Frontend folder and create an env file
   ```
   NEXT_PUBLIC_API_URL=your deployed backend
   
6. npm i
7. npm run dev

