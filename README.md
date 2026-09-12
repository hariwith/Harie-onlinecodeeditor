# Harie Online Code Editor

A web-based online code editor that allows users to write, format, and
execute code directly from their browser.

Built with React, Monaco Editor, Express.js, and Judge0 CE.

## 🚀 Live Demo

https://harie-onlinecodeeditor-1.onrender.com

## 📂 GitHub Repository

https://github.com/hariwith/Harie-onlinecodeeditor

------------------------------------------------------------------------

## ✨ Features

-   Monaco-based code editor
-   Supports multiple programming languages
-   Execute code directly from the browser
-   Custom program input using stdin
-   Displays program output and errors
-   Dark developer-focused interface
-   JavaScript code formatting using Prettier
-   Language-specific boilerplate code
-   Automatic deployment through GitHub and Render

### Supported Languages

-   Python
-   JavaScript
-   C
-   C++
-   Java

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React
-   Vite
-   Monaco Editor
-   Prettier
-   CSS

### Backend

-   Node.js
-   Express.js
-   REST API
-   CORS

### Code Execution

-   Judge0 CE API

### Deployment

-   Render
-   GitHub

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
                    User
                      │
                      ▼
             React + Monaco Editor
                      │
                      │ HTTP Request
                      ▼
                Express.js API
                      │
                      ▼
                 Judge0 CE
                      │
             ┌────────┼────────┐
             ▼        ▼        ▼
          Python   JavaScript  C/C++/Java
             │        │        │
             └────────┼────────┘
                      ▼
                   Output
                      │
                      ▼
             React Output Panel
```

------------------------------------------------------------------------

## 📁 Project Structure

``` text
Harie-onlinecodeeditor/
│
├── client/
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── .env.local
│
├── server/
│   ├── executor.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## ⚙️ How It Works

### 1. Write Code

The user writes code inside the Monaco Editor.

### 2. Select a Language

The editor supports Python, JavaScript, C, C++, and Java.

### 3. Provide Input

Users can provide program input through the Input panel.

### 4. Run Code

When the user clicks the Run button, React sends a request to the
Express backend.

Example:

``` text
POST /api/execute
```

The request contains the source code, selected language, and user input.

### 5. Code Execution

The Express server sends the source code, language, and input to Judge0
CE.

Judge0 handles compilation and execution in its sandboxed environment.

### 6. Display Result

The execution result is returned to Express and then sent back to React.

The output is displayed in the Output panel.

------------------------------------------------------------------------

## 🔌 API

### Execute Code

``` text
POST /api/execute
```

### Request Body

``` json
{
  "code": "print('Hello Harie')",
  "language": "python",
  "input": ""
}
```

### Response

``` json
{
  "output": "Hello Harie\n"
}
```

------------------------------------------------------------------------

## 💻 Run Locally

### Prerequisites

Make sure you have:

-   Node.js
-   npm
-   Git

### Clone the Repository

``` bash
git clone https://github.com/hariwith/Harie-onlinecodeeditor.git
```

Move into the project:

``` bash
cd Harie-onlinecodeeditor
```

------------------------------------------------------------------------

## 🎨 Frontend Setup

Move into the client directory:

``` bash
cd client
```

Install dependencies:

``` bash
npm install
```

Create:

``` text
.env.local
```

Add:

``` env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

``` bash
npm run dev
```

The frontend will normally be available at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 🖥️ Backend Setup

Open another terminal.

Move into the server directory:

``` bash
cd server
```

Install dependencies:

``` bash
npm install
```

Start the server:

``` bash
node server.js
```

The API will normally run on:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 🔐 Environment Variables

### Frontend

Create:

``` text
client/.env.local
```

For local development:

``` env
VITE_API_URL=http://localhost:3000
```

For production:

``` env
VITE_API_URL=https://harie-onlinecodeeditor.onrender.com
```

`.env.local` should not be committed to GitHub.

------------------------------------------------------------------------

## 🚀 Deployment

The application is deployed using Render.

### Frontend

The React frontend is deployed as a Render Static Site.

``` text
GitHub
   ↓
Render
   ↓
Vite Build
   ↓
Static Website
```

### Backend

The Express backend is deployed as a Render Web Service.

``` text
GitHub
   ↓
Render
   ↓
Node.js
   ↓
Express API
```

### Automatic Deployment

The project is connected to GitHub.

After making changes:

``` bash
git add .
git commit -m "Update application"
git push origin main
```

Render automatically detects changes pushed to the connected branch and
deploys the updated version.

------------------------------------------------------------------------

## 🎯 Project Goals

Harie Online Code Editor provides a simple browser-based environment
where developers and students can:

-   Practice programming
-   Test small programs
-   Learn different programming languages
-   Experiment with code without installing a local compiler

------------------------------------------------------------------------

## 🔮 Future Improvements

-   [ ] Code execution history
-   [ ] Multiple editor tabs
-   [ ] File management
-   [ ] Improved error formatting
-   [ ] More programming languages
-   [ ] Keyboard shortcuts
-   [ ] Resizable editor/output panels
-   [ ] Code sharing
-   [ ] Better mobile responsiveness
-   [ ] Execution status indicators
-   [ ] Custom editor themes

------------------------------------------------------------------------

## 👨‍💻 Author

**Harie**

Built as a full-stack software project to explore:

-   React development
-   API development
-   Code execution systems
-   Backend architecture
-   Deployment
-   Git/GitHub workflows

------------------------------------------------------------------------

## 📄 License

This project is available for educational and personal use.
