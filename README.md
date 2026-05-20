# AI-First CRM HCP Module – Log Interaction Screen

## Project Overview

The project combines a structured CRM interface with an AI-powered assistant that enables users to log, edit, retrieve, and analyze HCP interactions using natural language.

The system uses:

- LangGraph for workflow orchestration
- Groq-hosted Large Language Models for intelligent extraction and reasoning
- FastAPI for backend services
- PostgreSQL for data storage
- React for the frontend interface

The primary goal of this project is to reduce manual CRM data entry and demonstrate how conversational AI can automate enterprise healthcare workflows.

---

# Features

## Conversational Interaction Logging

Users can describe interactions in natural language, and the AI automatically extracts structured CRM data.

### Example

```text
Today I met Dr. Sarah Johnson and discussed Ozempic cardiovascular benefits.
```

---

## Structured CRM Form

The system automatically fills:

- HCP Name
- Interaction Type
- Date and Time
- Attendees
- Topics Discussed
- Materials Shared
- Sentiment
- Follow-Up Actions

Users can also manually edit fields.

---

## LangGraph AI Workflow

LangGraph manages:

- Intent detection
- Tool routing
- Workflow execution

---

# AI Tools Implemented

## 1. Log Interaction Tool

Extracts structured CRM information from natural language.

---

## 2. Edit Interaction Tool

Allows conversational modification of existing interaction data.

---

## 3. Retrieve History Tool

Fetches previous interaction records from PostgreSQL.

---

## 4. Follow-Up Recommendation Tool

Generates AI-powered next-step recommendations.

---

## 5. Compliance Validation Tool

Checks promotional statements for pharmaceutical compliance risks.

---

# System Architecture

```text
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
```

---

# Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- Tailwind CSS v4
- Axios

---

## Backend

- FastAPI
- LangGraph
- SQLAlchemy
- Pydantic

---

## Database

- PostgreSQL

---

## AI / LLM

- Groq API
- llama-3.3-70b-versatile

---

# Project Structure

```text
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
```

---

# AI Workflow Explanation

## Step 1 — User Input

The user enters a conversational interaction.

### Example

```text
Met Dr. Emily Carter and discussed Eliquis study updates.
```

---

## Step 2 — Frontend API Request

React sends the request to the FastAPI backend.

---

## Step 3 — LangGraph Workflow Starts

The request enters the LangGraph workflow.

---

## Step 4 — Intent Detection

LangGraph determines the user intent:

- Log interaction
- Edit interaction
- Retrieve history
- Recommendation
- Compliance check

---

## Step 5 — Tool Execution

The appropriate tool is executed.

---

## Step 6 — LLM Extraction

Groq-hosted LLM extracts structured CRM fields.

---

## Step 7 — Database Storage

Interaction data is saved into PostgreSQL.

---

## Step 8 — Response Returned

The backend sends the structured response to the frontend.

---

## Step 9 — Redux State Update

Redux updates the application state.

---

## Step 10 — CRM Form Auto-Fills

The frontend automatically populates CRM fields.

---

# Installation Guide

## Prerequisites

Install the following:

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

---

# Backend Setup

## Step 1 — Clone Repository

```bash
git clone <repository-url>
cd AI-First-CRM-HCP
```

---

## Step 2 — Setup Virtual Environment

### Windows

```bash
cd backend
python -m venv venv
```

### Activate Environment

```bash
venv\Scripts\activate
```

---

## Step 3 — Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Step 4 — Configure Environment Variables

Create:

```text
backend/.env
```

Add:

```env
DATABASE_URL=your_postgresql_url
GROQ_API_KEY=your_groq_api_key
```

---

## Step 5 — Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

## Step 1 — Open Frontend Directory

```bash
cd frontend
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Database Setup

## PostgreSQL Database

Create a PostgreSQL database.

### Example

```sql
CREATE DATABASE ai_first_crm;
```

Update the `.env` file with the PostgreSQL connection string.

---

# API Endpoints

## Health Check

```http
GET /health
```

---

## Chat Endpoint

```http
POST /chat
```

### Request Body

```json
{
  "message": "Met Dr. Smith and discussed Product X"
}
```

---

# Example Test Inputs

## Log Interaction

```text
Today I met Dr. Emily Carter and discussed Ozempic diabetes management benefits.
```

---

## Edit Interaction

```text
Change sentiment to positive
```

---

## Retrieve History

```text
Show previous interactions
```

---

## Recommendation

```text
Suggest next action for Dr. Emily Carter
```

---

## Compliance Check

```text
Check compliance risk: This medicine guarantees complete cure.
```


---


# Future Improvements

- JWT authentication
- Multi-user support
- Voice-based interaction logging
- Advanced analytics dashboard
- Docker containerization
- Kubernetes deployment
- Multi-language support
- Real-time notifications

---

# Summary

This project demonstrates how conversational AI can modernize enterprise CRM workflows in the healthcare and pharmaceutical domain.

By combining LangGraph, LLMs, FastAPI, React, and PostgreSQL, the system enables:

- Intelligent interaction logging
- Conversational editing
- Automated recommendations
- Compliance validation

within a professional CRM interface.