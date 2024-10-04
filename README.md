# Neuromnia Full-Stack Engineer Take-Home Assignment

## 🎯 Goal: Build a Simple Milestone Lookup Chatbot

This assignment assesses your ability to:

- **Build a basic full-stack web application.**
- **Work with provided data (no prior knowledge about the data needed).**
- **Write clean and understandable code.**

**Time Budget:** Aim to complete this assignment within **6 hours**.

**Important:** You should **NOT** require resources beyond:
* What's provided in this repository.
* What you can readily find with a web search (e.g., documentation for React, Node.js, etc.).

## 🚀 Getting Started

### 1. Clone the Repository

Clone the repository to your local machine using:

```bash
git clone https://github.com/neuromnia/fse-take-home.git
```

### 2. Start the Backend Server

- **Navigate to the `backend` folder** in a terminal.
- **Install dependencies:** `npm install`
- **Run the server:** `node index.js` — it should be accessible at `http://localhost:3001`.

### 3. Start the Frontend Development Server

- **Open a *second* terminal and navigate to the `frontend` folder.**
- **Install dependencies:** `npm install`
- **Run the server:** `npm start` — it typically opens automatically in your browser at `http://localhost:3000`.

Both servers should now be running!

## 📝 The Assignment

You will work with data located in `backend/vb_mapp_milestones.csv`. Consider it similar to a spreadsheet.

**Your task is to build a web app allowing users to:**

1. **Lookup Milestone:** Enter a code (e.g., "MAN-01") to retrieve its description.
2. **List Domain:** Select a domain and level via dropdowns to view all corresponding milestones.

## 💻 Frontend (React)

- **Utilize the starter code in `frontend/components/ChatInterface.js`.**
- **Utilize the provided `frontend/index.js`.**
- **Tasks to implement:**
    - Button logic to trigger requests to your backend at `/api/chatbot` for actions:
        - "Lookup Milestone" — sending the entered code.
        - "List Domain" — sending selected domain and level.
    - Display the fetched data in the chat interface.
    - Show user-friendly error messages for issues like network errors or no data found.

## ⚙️ Backend (Node.js & Express)

- **Key implementations:**
    - **Load `vb_mapp_milestones.csv` into memory when the server starts.**
    - **API Endpoint (`/api/chatbot`):**
        - Determine whether the request is for "Lookup Milestone" or "List Domain."
        - Return appropriate data based on the request type.
        - Gracefully handle errors (e.g., milestone not found).
    - **Ensure the provided rate limiting is active.**

## ⏰ Time Management

- **Focus on core functionality first.**
- **Avoid getting bogged down with edge cases or complex error handling.** 
- **Prioritize a working application, detailing any incomplete areas in your commit messages.**

## 📤 Submission

1. **Push your completed code to a public GitHub repository.**
2. **Share the repository link with us.**
