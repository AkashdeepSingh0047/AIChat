# Project Description

A lightweight *AI-integrated web app* built with *React + Vite*, allowing users to chat with an AI model in a clean and interactive interface.  
This project was developed as part of a *Frontend Engineer Technical Assessment* to showcase strong UI/UX design, API integration, and clean architecture.



## Features
- Chat with AI using OpenAI API  
- Modern UI with *Material UI (MUI)*  
- Clear button to reset conversation  
- Error dispplayed using *React Toastify*  
- Maintains dynamic chat history  
- Environment variable for secure API key (VITE_OPENAI_API_KEY)

## Tech Stack
- React (Vite)
- MUI
- JavaScript/TypeScript
- OpenAI API
- React Toastify


## Prerequisites
Make sure you have the following installed:
- Node.js (v18 or newer)
- npm (v9 or newer)


## Setup

### 1. Clone the repository
    https://github.com/AkashdeepSingh0047/AIChat.git

### 2. Install dependencies
    npm install

### 3. Create an environment file
Create a `.env` file in the root directory and add your OpenAI API key:

    VITE_OPENAI_API_KEY="xxxxxxxxxxxxxxxxxxxxx"

> Note: Environment variables prefixed with `VITE_` are exposed to the client side in Vite.

### 4. Run the development server

    npm run dev

Open your browser and go to the URL displayed in the terminal (usually http://localhost:5173).

---

##  Build and Preview
### To create a production build:
    npm run build

### To preview the build locally:
    npm run preview

