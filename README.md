AI-First CRM for HCP Interaction Management
Project Overview

AI-First CRM is a conversational Healthcare Professional (HCP) interaction management system designed for pharmaceutical field representatives. The project combines a structured CRM interface with an AI-powered assistant that allows users to log, edit, retrieve, and analyze HCP interactions using natural language.

The system uses LangGraph for workflow orchestration, Groq-hosted Large Language Models for intelligent extraction and reasoning, FastAPI for backend services, PostgreSQL for data storage, and React for the frontend interface.

The primary goal of this project is to reduce manual CRM data entry and demonstrate how conversational AI can automate enterprise healthcare workflows.

Features
Conversational Interaction Logging

Users can describe interactions in natural language, and the AI automatically extracts structured CRM data.

Example:

Today I met Dr. Sarah Johnson and discussed Ozempic cardiovascular benefits.
Structured CRM Form

The system automatically fills:

HCP Name
Interaction Type
Date and Time
Attendees
Topics Discussed
Materials Shared
Sentiment
Follow-Up Actions

Users can also manually edit fields.

LangGraph AI Workflow

LangGraph manages:

intent detection
tool routing
workflow execution
Five AI Tools Implemented
1. Log Interaction Tool

Extracts structured CRM information from natural language.

2. Edit Interaction Tool

Allows conversational modification of existing interaction data.

3. Retrieve History Tool

Fetches previous interaction records from PostgreSQL.

4. Follow-Up Recommendation Tool

Generates AI-powered next-step recommendations.

5. Compliance Validation Tool

Checks promotional statements for pharmaceutical compliance risks.

System Architecture
React Frontend
        ↓
FastAPI Backend
        ↓
LangGraph Workflow
        ↓
AI Tool Execution
        ↓
Groq LLM API
        ↓
PostgreSQL Database
Tech Stack
Frontend
React.js
Vite
Redux Toolkit
Tailwind CSS v4
Axios
Backend
FastAPI
LangGraph
SQLAlchemy
Pydantic
Database
PostgreSQL
AI / LLM
Groq API
llama-3.3-70b-versatile
Deployment
Vercel (Frontend)
Render (Backend)
Neon PostgreSQL
Project Structure
AI-First-CRM-HCP/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── tools/
│   │   ├── models/
│   │   ├── db/
│   │   ├── services/
│   │   ├── api/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── components/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
AI Workflow Explanation
Step 1 — User Input

The user enters a conversational interaction.

Example:

Met Dr. Emily Carter and discussed Eliquis study updates.
Step 2 — Frontend API Request

React sends the request to the FastAPI backend.

Step 3 — LangGraph Workflow Starts

The request enters the LangGraph workflow.

Step 4 — Intent Detection

LangGraph determines the user intent:

log interaction
edit interaction
retrieve history
recommendation
compliance check
Step 5 — Tool Execution

The appropriate tool is executed.

Step 6 — LLM Extraction

Groq-hosted LLM extracts structured CRM fields.

Step 7 — Database Storage

Interaction data is saved into PostgreSQL.

Step 8 — Response Returned

Backend sends structured response to frontend.

Step 9 — Redux State Update

Redux updates application state.

Step 10 — CRM Form Auto-Fills

Frontend automatically populates CRM fields.

Installation Guide
Prerequisites

Install:

Python 3.11+
Node.js 18+
PostgreSQL
Git
Backend Setup
Step 1 — Clone Repository
git clone <repository-url>
cd AI-First-CRM-HCP
Step 2 — Setup Virtual Environment
Windows
cd backend
python -m venv venv

Activate:

venv\Scripts\activate
Step 3 — Install Dependencies
pip install -r requirements.txt
Step 4 — Configure Environment Variables

Create:

backend/.env

Add:

DATABASE_URL=your_postgresql_url
GROQ_API_KEY=your_groq_api_key
Step 5 — Run Backend
uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000
Frontend Setup
Step 1 — Open Frontend
cd frontend
Step 2 — Install Dependencies
npm install
Step 3 — Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
Database Setup
PostgreSQL Database

Create a PostgreSQL database.

Example:

CREATE DATABASE ai_crm;

Update .env with the PostgreSQL connection string.

API Endpoints
Health Check
GET /health
Chat Endpoint
POST /chat

Request:

{
  "message": "Met Dr. Smith and discussed Product X"
}
Example Test Inputs
Log Interaction
Today I met Dr. Emily Carter and discussed Ozempic diabetes management benefits.
Edit Interaction
Change sentiment to positive
Retrieve History
Show previous interactions
Recommendation
Suggest next action for Dr. Emily Carter
Compliance Check
Check compliance risk: This medicine guarantees complete cure.
Deployment Guide
Backend Deployment (Render)
Build Command
pip install -r requirements.txt
Start Command
uvicorn app.main:app --host 0.0.0.0 --port 10000

Environment Variables:

DATABASE_URL
GROQ_API_KEY
Frontend Deployment (Vercel)

Update API base URL before deployment.

Example:

baseURL: "https://your-backend-url.onrender.com"

Deploy frontend using Vercel.

Key Learnings
AI workflow orchestration using LangGraph
Conversational CRM architecture
LLM-based structured data extraction
FastAPI backend development
PostgreSQL integration
Redux state management
Prompt engineering
Enterprise AI system design
Full-stack deployment workflow
Challenges Faced
Model Availability

The originally suggested Gemma model became unavailable.

Solution:
Switched to llama-3.3-70b-versatile.

Frontend Synchronization

AI updates were not properly syncing with UI.

Solution:
Implemented Redux centralized state management.

Database Validation Issues

Null values caused insertion failures.

Solution:
Improved extraction validation and backend handling.

Future Improvements
JWT authentication
Multi-user support
Voice-based interaction logging
Advanced analytics dashboard
Docker containerization
Kubernetes deployment
Multi-language support
Real-time notifications
Summary

This project demonstrates how conversational AI can modernize enterprise CRM workflows in the healthcare and pharmaceutical domain. By combining LangGraph, LLMs, FastAPI, React, and PostgreSQL, the system enables intelligent interaction logging, conversational editing, automated recommendations, and compliance validation within a professional CRM interface.