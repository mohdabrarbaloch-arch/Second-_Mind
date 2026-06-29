# SECOND BRAIN OS - MASTER ARCHITECTURE

*The Official Engineering Blueprint for Second Brain OS.*

---

## 1. Complete Folder Structure

The system is designed as a highly scalable, monorepo-style architecture separating the visual interface from the AI cognitive engines and backend services.

```text
second-brain-os/
├── frontend/                  # React, Vite, Tailwind, React Three Fiber (Completed MVP)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                   # FastAPI Server, REST API, WebSocket Handlers
│   ├── api/                   # Route definitions (v1)
│   ├── core/                  # Security, Auth, Configuration
│   ├── models/                # Pydantic & SQLAlchemy Models
│   └── services/              # Business logic
├── ai_core/                   # The Brain (Ask_ABraz & Routing)
│   ├── llm_gateway/           # Provider agnostic LLM routing (OpenAI, Anthropic, Local)
│   ├── planning/              # Autonomous reasoning and planning algorithms
│   └── delegation/            # Logic for routing tasks to sub-agents
├── engines/                   # Specialized Sub-Systems
│   ├── memory/                # Vector DB sync, Knowledge Graphs, Retrieval
│   ├── automation/            # Webhooks, Browser control, API Integrations
│   ├── voice/                 # Speech-to-Text, Text-to-Speech pipelines
│   ├── notification/          # Push, Email, In-app alerting system
│   └── realtime/              # WebSocket state management for UI syncing
├── database/                  # Migrations (Alembic) and Seed Data
├── assets/                    # 3D Models (.gltf), Audio, Textures
├── docs/                      # Technical Documentation, Architecture Diagrams
├── testing/                   # E2E Tests (Playwright), Unit Tests (Pytest, Jest)
└── deployment/                # Dockerfiles, Kubernetes Manifests, CI/CD Pipelines
    ├── dev/
    └── prod/
```

---

## 2. Backend Architecture

The backend is built for high concurrency, real-time agent updates, and heavy asynchronous processing.

* **Core Framework**: `FastAPI` (Python) for asynchronous, high-performance REST APIs.
* **Authentication**: OAuth2 with JWT tokens. NextAuth.js on frontend communicating with FastAPI backend.
* **REST API**: Handles CRUD operations (Tasks, Projects, Settings) and synchronous UI requests.
* **WebSocket (Realtime Engine)**: Bi-directional streaming for live AI Agent status, chat typing indicators, and immediate 3D scene state updates.
* **Background Workers**: `Celery` workers paired with `Redis` for heavy AI processing (e.g., summarizing long documents, generating reports).
* **Task Queue**: `RabbitMQ` or `Redis` for managing asynchronous job distribution among AI worker agents.
* **Scheduler**: `Celery Beat` or `APScheduler` for recurring tasks (cron jobs, daily summaries).
* **File Storage**: `AWS S3` (or MinIO for local dev) for user uploads, processed reports, and agent-generated assets.
* **Logging**: Structured JSON logging (`ELK Stack` or `Datadog`) capturing system events and AI reasoning traces.
* **Monitoring**: `Prometheus` and `Grafana` for tracking system load, LLM API latency, and token usage.

---

## 3. Database Design

A hybrid database approach: `PostgreSQL` for relational data, and a Vector Database (e.g., `Pinecone` or `pgvector`) for semantic memory.

### Relational Schema (PostgreSQL)

* **Users**: `id`, `email`, `password_hash`, `tier`, `created_at`
* **Settings**: `id`, `user_id`, `theme`, `llm_preferences`, `notification_prefs`
* **Rooms**: `id`, `name`, `description`, `access_level`
* **Agents**: `id`, `room_id`, `name`, `role`, `status`, `energy`, `workload`
* **Projects**: `id`, `user_id`, `title`, `status`, `deadline`
* **Tasks**: `id`, `project_id`, `agent_id`, `title`, `description`, `status`, `priority` (FK to Projects and Agents)
* **Calendar**: `id`, `user_id`, `event_name`, `start_time`, `end_time`, `attendees`
* **Chat History**: `id`, `user_id`, `agent_id`, `message`, `timestamp`, `sender_type` (User vs Agent)
* **Notifications**: `id`, `user_id`, `title`, `message`, `read_status`, `type`
* **Reports**: `id`, `generated_by_agent_id`, `content_url`, `created_at`
* **Files**: `id`, `user_id`, `filename`, `s3_url`, `size`, `type`

### Semantic Schema (Vector / Knowledge Graph)

* **Agent Memory (Vector)**: `id`, `agent_id`, `embedding_vector`, `text_chunk`, `context_metadata`
* **Knowledge Base (Vector)**: `id`, `user_id`, `embedding_vector`, `source_document_id`, `summary`
* **Documents**: Metadata indexing for retrieved files.

---

## 4. AI Core: Ask_ABraz

**Ask_ABraz** is the CEO of the Operating System. It is the central orchestrator that interacts directly with the user.

* **Responsibilities**: Understand user intent, break down massive goals into actionable projects, oversee all sub-agents, and report progress.
* **Decision Making**: Uses a ReAct (Reasoning and Acting) loop to determine if a task can be done instantly or needs delegation.
* **Planning**: Creates multi-step execution graphs (Directed Acyclic Graphs) for complex requests.
* **Memory**: Has root access to the Knowledge Graph and User Context to maintain a perfectly personalized relationship.
* **Task Delegation**: Matches required skills against the Agent Database and dispatches tasks to the appropriate Manager or Worker Agent.
* **Conversation**: The primary conversational interface. Friendly, professional, and context-aware.
* **Reasoning**: Evaluates the output of sub-agents before presenting it to the user.
* **Tool Calling**: Can invoke the Automation Engine (e.g., "Schedule a meeting", "Draft an email").
* **Autonomous Actions**: Can proactively suggest actions based on the Calendar or Inbox without being explicitly prompted.

---

## 5. Agent Hierarchy

The system uses a Swarm Architecture to distribute cognitive load.

1. **CEO Agent (Ask_ABraz)**
   * *Role*: Master orchestrator, user interface, final decision maker.
2. **Manager Agents**
   * *Role*: Oversee specific Rooms (e.g., "Head of Development", "Head of Marketing"). They take high-level projects from the CEO, break them into tasks, and assign them to workers.
3. **Worker Agents**
   * *Role*: Specialists (e.g., "Frontend Agent", "Copywriter Agent"). They execute specific tasks, write code, draft text, or scrape data.
4. **Mini Agents (Functions)**
   * *Role*: Single-purpose, fast LLM calls or deterministic scripts (e.g., "Summarizer Bot", "Formatting Bot"). They don't have long-term memory; they just process I/O.

---

## 6. Office Architecture

Every room in the 3D and Backend architecture has specific bounds, data silos, and specialized agents.

* **Reception**: 
  * *Role*: Intake. Triage incoming emails, messages, and raw Brain Dumps. Routes data to appropriate rooms.
* **CEO Office**: 
  * *Role*: Global command. Holds user preferences, global strategy, and root memory access.
* **Developer Room**: 
  * *Role*: Code generation, architecture planning, GitHub integrations. Has access to the local file system or sandboxed environments.
* **Research Lab**: 
  * *Role*: Web scraping, data analysis, deep-dive reporting. Access to Search APIs and Vector DBs.
* **Marketing**: 
  * *Role*: Social media drafting, content calendar management.
* **Finance**: 
  * *Role*: Expense tracking, budget alerts. Highly secure data silo.
* **Sales / Client Hunt**: 
  * *Role*: Lead generation, CRM integrations, cold email drafting.
* **Meeting Room**: 
  * *Role*: Multi-agent collaboration. Manager agents meet here to resolve cross-department dependencies.
* **Server Room**: 
  * *Role*: Infrastructure monitoring. Reports on token usage, API limits, and system health.
* **Storage**: 
  * *Role*: The Knowledge Base. The physical representation of the Vector Database and Long-Term Memory.

---

## 7. Memory Engine

Memory flows through a tiered system to prevent context-window overflow and hallucination.

1. **Short Memory**: The current active conversation context (last N messages). Stored in memory/Redis.
2. **Working Memory**: Context injected specifically for the current task (e.g., the contents of a specific document being edited).
3. **Long-Term Memory**: Important facts, preferences, and core instructions extracted and saved forever.
4. **Vector Memory**: Massive repository of all past conversations, documents, and scraped data, retrieved via Semantic Search (RAG).
5. **Knowledge Graph**: Entity relationships (e.g., "John" -> [is client of] -> "Company X"). Crucial for logical deduction.
6. **Daily Journal**: An automated end-of-day cron job where Ask_ABraz summarizes what was accomplished and writes it to a persistent log.
7. **Learning History & Decision History**: Logs of *why* the AI made certain choices, used to fine-tune future responses and avoid repeating mistakes.

---

## 8. Automation Engine

The hands and feet of the OS. Tools the Agents can use to affect the outside world.

* **Calendar**: Read/Write events (Google Calendar/Outlook API).
* **Email**: Draft, send, and summarize emails (Gmail/IMAP APIs).
* **WhatsApp / SMS**: Twilio integration for urgent pings.
* **GitHub**: Read issues, open PRs, commit code.
* **Google Drive**: Read docs, create spreadsheets.
* **Slack / Discord**: Post updates to external team channels.
* **Browser Automation**: Playwright/Puppeteer instances allowing the Research Agent to log into websites and click around.
* **Future Integrations**: Zapier/Make.com webhooks for infinite extensibility.

---

## 9. Security

Since this OS has access to the user's entire life and business, security is paramount.

* **Authentication**: Multi-factor authentication (MFA) required for login.
* **Authorization**: Granular permissions. (e.g., The Marketing Agent cannot access the Finance Room's database).
* **Encryption**: 
  * *In Transit*: TLS 1.3 for all endpoints.
  * *At Rest*: AES-256 encryption for the database, especially the Vector DB containing personal memories.
* **Audit Logs**: Every action taken by an AI agent is logged immutably. The user can see exactly who did what, and when.
* **Secrets Management**: AWS KMS or HashiCorp Vault to store API keys (OpenAI, GitHub, etc.). Agents request temporary, scoped access tokens, never raw keys.
* **Role Based Access (RBAC)**: Enforced at the API level to ensure agents only access their designated schemas.

---

## 10. Future Roadmap

* **Version 1 (The MVP)**: Static 3D UI, basic mock data, integration of Ask_ABraz as a conversational chat interface with basic memory and task creation.
* **Version 2 (The Workforce)**: Implementation of Worker Agents. Ask_ABraz can successfully delegate simple tasks (e.g., web research) to sub-agents and return the result.
* **Version 3 (The Swarm)**: Full Agent Hierarchy. Manager agents autonomously spawn Mini Agents to accomplish complex, multi-day projects without user intervention.
* **Version 4 (Immersive & Voice)**: Real-time voice interaction with Ask_ABraz (WebRTC). The 3D UI is upgraded for VR/AR (Apple Vision Pro/Meta Quest) allowing the user to literally walk into their Virtual Office.
* **Version 5 (Full Autonomy)**: The OS operates 24/7. It proactively manages the user's life, predicting needs before they arise, handling 90% of digital interactions autonomously.
* **Version 10 (Personal AGI)**: Second Brain OS reaches seamless cognitive integration with the user. It perfectly mirrors the user's reasoning, ethics, and goals, operating as a true digital clone and omnipotent personal assistant.
