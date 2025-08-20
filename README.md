
# Overview

EchoDesk is a **Multi-Tier Agentic RAG WhatsApp Support** system brings next-generation customer support automation and efficiency to WhatsApp. Built on a multi-agent architecture, it intelligently classifies and handles incoming customer queries, delivering instant responses to FAQs and order-related questions while seamlessly escalating complex issues to human agents.

This application combines advanced Retrieval-Augmented Generation (RAG) techniques, real-time intent classification, and secure data integrations—ensuring that every user receives the right answer, at the right time, with conversational context preserved throughout. For businesses and support teams, it means faster response times, higher satisfaction, fewer repetitive tasks for human operators, and a unified dashboard that provides complete visibility and control over all support tickets and conversations.

### Key Features

- **Automated Multi-Tier Routing:** Classifies user queries and smartly routes them to the appropriate automation path or human agent.
- **Hybrid AI + Human-in-the-Loop:** Ensures reliable escalation for queries not confidently addressed by automation.
- **Context-Preserved Conversations:** Every interaction is logged, enabling agents and bots to deliver relevant, accurate answers at all support tiers.
- **Live Knowledge Base:** Supports dynamic updates to FAQ and order data with immediate effect, no downtime.
- **Unified Admin Dashboard:** Manage tickets, track conversations, monitor system health, and ensure customer satisfaction in real time.
- **Production-Ready & Extensible:** Designed for easy customization, scaling, and integration into enterprise environments.



## 🚦 End-to-End Flow

1. **User → WhatsApp → Webhook**
   - Customer sends message on WhatsApp; webhook receives payload, extracts info, and stores message audit.
2. **LangGraph Router Agent**
   - Classifies intent: FAQ, Order Support, Escalation, or Small Talk.
3. **Agentic Pathways**
   - **FAQ:** Embed/query, vector search FAQs, answer via Gemini.
   - **Order:** Embed/query, vector search user orders, contextual update via Gemini.
   - **Escalation:** Ticket created if confidence low or escalated; admin notified and replies via dashboard.
4. **Admin Dashboard**
   - Agents manage tickets, chat with users, close/reassign tickets, with real-time WhatsApp sync.
5. **Knowledge Update**
   - New FAQs/orders trigger embedding jobs and vector index updates.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas
- WhatsApp Cloud API credentials
- Pinecone account (optional)
- Gemini API credentials

### Installation

```
git clone https://github.com/your-org/whatsapp-support-rag-app.git
cd whatsapp-support-rag-app
npm install
```

Create a `.env` file with:

```
WHATSAPP_API_TOKEN=your_token
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_gemini_key
PINECONE_API_KEY=your_pinecone_key
```

### Backend

```
npm run start
```

### Dashboard

```
cd dashboard
npm install
npm start
```

Access via [http://localhost:3000](http://localhost:3000).

---

🏗️ System Architecture
-----------------------

### High-Level Architecture Flow

```
graph TD
    A[WhatsApp User] --> B[WhatsApp Cloud API]
    B --> C[Webhook Endpoint]
    C --> D[Message Processor]
    D --> E[LangGraph Router Agent]

    E --> F{Intent Classification}
    F -->|FAQ Query| G[FAQ Agent]
    F -->|Order Query| H[Order Agent]
    F -->|Complex/Unknown| I[Escalation Agent]
    F -->|Greeting/Small Talk| J[Conversational Agent]

    G --> K[MongoDB Atlas Vector Search]
    H --> L[MongoDB Atlas Vector Search]
    I --> M[Ticket Management System]
    J --> N[Context-Aware Response]

    K --> O[Pinecone Vector DB]
    L --> P[Order Database]
    O --> Q[Gemini LLM]
    P --> Q
    M --> R[Admin Dashboard]
    Q --> S[Response Generator]

    S --> T[WhatsApp Response]
    R --> U[Human Agent Interface]
    U --> T
    T --> A

    style A fill:#e1f5fe
    style E fill:#fff3e0
    style Q fill:#f3e5f5
    style R fill:#e8f5e8

```

### Component Architecture

#### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    WhatsApp Support System                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Message API   │  │  LangGraph Core │  │    Admin     │ │
│  │   - Webhook     │  │  - Router Agent │  │  Dashboard   │ │
│  │   - Validation  │  │  - Multi-Agent  │  │  - Ticket    │ │
│  │   - Audit Log   │  │  - Orchestration│  │  Management  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   FAQ Agent     │  │   Order Agent   │  │  Escalation  │ │
│  │  - Vector Query │  │  - Status Check │  │    Agent     │ │
│  │  - FAQ Search   │  │  - Order Search │  │  - Ticketing │ │
│  │  - Response Gen │  │  - Context Gen  │  │  - Routing   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  MongoDB Atlas  │  │  Pinecone VDB   │  │  Gemini LLM  │ │
│  │  - Messages     │  │  - Embeddings   │  │  - Text Gen  │ │
│  │  - Tickets      │  │  - Similarity   │  │  - Context   │ │
│  │  - Orders       │  │  - Vector Ops   │  │  - Reasoning │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘

```

### Data Flow Architecture

#### 1\. **Message Ingestion Pipeline**

```
WhatsApp Message → Webhook Validation → Message Storage → Intent Classification

```

#### 2\. **Multi-Agent Processing Pipeline**

```
Router Agent → [FAQ|Order|Escalation] Agent → Context Retrieval → LLM Processing → Response Generation

```

#### 3\. **Knowledge Management Pipeline**

```
Data Update → Embedding Generation → Vector Index Update → Real-time Availability

```

### Detailed Component Breakdown

#### **Message Processing Layer**

-   **Webhook Handler**: Validates WhatsApp Cloud API payloads
-   **Message Parser**: Extracts user info, message content, and metadata
-   **Audit Logger**: Stores all interactions for compliance and debugging
-   **Rate Limiter**: Prevents API abuse and ensures fair usage

#### **Intelligence Layer (LangGraph Multi-Agent System)**

-   **Router Agent**:
    -   Analyzes message intent using NLP classification
    -   Routes to appropriate specialized agent
    -   Maintains conversation context
-   **FAQ Agent**:
    -   Embeds user queries using text-embedding models
    -   Performs semantic search against FAQ knowledge base
    -   Generates contextual responses via Gemini LLM
-   **Order Agent**:
    -   Queries order database with customer context
    -   Provides order status, tracking, and update information
    -   Handles order modifications and cancellations
-   **Escalation Agent**:
    -   Creates support tickets for complex queries
    -   Assigns tickets to available human agents
    -   Manages escalation workflows and SLA tracking

#### **Data Storage Layer**

-   **MongoDB Atlas Collections**:

    ```
    // Message Schema
    {
      _id: ObjectId,
      phoneNumber: String,
      messageText: String,
      timestamp: Date,
      intent: String,
      response: String,
      processingTime: Number
    }

    // Ticket Schema
    {
      _id: ObjectId,
      ticketId: String,
      customerNumber: String,
      messages: [MessageSchema],
      status: "open|in_progress|resolved|closed",
      assignedTo: String,
      priority: "low|medium|high|urgent",
      createdAt: Date,
      updatedAt: Date,
      metadata: Object
    }

    // Order Schema
    {
      _id: ObjectId,
      orderId: String,
      customerNumber: String,
      status: String,
      orderDetails: Object,
      summary: String,
      embedding: [Number], // Vector representation
      lastUpdated: Date
    }

    // FAQ Schema
    {
      _id: ObjectId,
      question: String,
      answer: String,
      category: String,
      keywords: [String],
      embedding: [Number], // Vector representation
      usage_count: Number,
      last_updated: Date
    }

    ```

-   **Pinecone Vector Database**:

    -   Stores high-dimensional embeddings for semantic search
    -   Enables similarity-based retrieval for FAQs and orders
    -   Supports real-time index updates and scaling

#### **AI/ML Layer**

-   **Google Gemini LLM**:
    -   Generates human-like responses
    -   Maintains conversation context
    -   Handles multi-turn conversations with memory
-   **Embedding Models**:
    -   Converts text to vector representations
    -   Enables semantic similarity matching
    -   Supports multiple languages and domains

#### **User Interface Layer**

-   **Admin Dashboard (React)**:
    -   Real-time ticket management
    -   Agent assignment and workload balancing
    -   System analytics and performance monitoring
    -   Knowledge base management interface
-   **WhatsApp Integration**:
    -   Bidirectional message synchronization
    -   Rich media support (images, documents, buttons)
    -   Message status tracking (sent, delivered, read)



#### **Webhook Endpoints**

```
POST /webhook/whatsapp     # WhatsApp message reception
POST /webhook/orders       # Order status updates
POST /webhook/faqs         # Knowledge base updates
GET  /health              # System health check

```

This architecture ensures high availability, scalability, and maintainability while providing seamless customer support automation with human oversight capabilities.

Data Models:
- **Messages:** `{ phone_number, message_text, timestamp }`
- **Tickets:** `{ customerNumber, messages[], status, assignedTo }`
- **Orders:** `{ customerNumber, orderId, status, summary, embedding }`
- **FAQs:** `{ question, answer, embedding }`

---

## 🤖 Multi-Agent Routing

- **Router Agent:** Classifies intent and routes message.
- **FAQ Agent:** Embeds, vector search FAQ, answers via Gemini.
- **Order Agent:** Embeds, vector search orders, status via Gemini.
- **Escalation Agent:** Ticketing, dashboard notification.

Agents leverage:
- **MongoDBAtlasVectorSearch**
- **MessageSender** (to WhatsApp)
- **TicketCreator** (for escalation)

---

## 🔄 Knowledge Updates

- FAQ/Order updates trigger embedding job to update vector index.



## 🔐 Security

- MongoDB at-rest encryption
- HTTPS for all APIs
- Auth-required dashboard access


---

## 🙌 Contributions

PRs welcome. See repo workflow for details.

---
```
