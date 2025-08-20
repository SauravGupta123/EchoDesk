
# Multi-Tier Agentic RAG WhatsApp Support

The **Multi-Tier Agentic RAG WhatsApp Support** system brings next-generation customer support automation and efficiency to WhatsApp. Built on a multi-agent architecture, it intelligently classifies and handles incoming customer queries, delivering instant responses to FAQs and order-related questions while seamlessly escalating complex issues to human agents.

This application combines advanced Retrieval-Augmented Generation (RAG) techniques, real-time intent classification, and secure data integrations—ensuring that every user receives the right answer, at the right time, with conversational context preserved throughout. For businesses and support teams, it means faster response times, higher satisfaction, fewer repetitive tasks for human operators, and a unified dashboard that provides complete visibility and control over all support tickets and conversations.

### Key Features

- **Automated Multi-Tier Routing:** Classifies user queries and smartly routes them to the appropriate automation path or human agent.
- **Hybrid AI + Human-in-the-Loop:** Ensures reliable escalation for queries not confidently addressed by automation.
- **Context-Preserved Conversations:** Every interaction is logged, enabling agents and bots to deliver relevant, accurate answers at all support tiers.
- **Live Knowledge Base:** Supports dynamic updates to FAQ and order data with immediate effect, no downtime.
- **Unified Admin Dashboard:** Manage tickets, track conversations, monitor system health, and ensure customer satisfaction in real time.
- **Production-Ready & Extensible:** Designed for easy customization, scaling, and integration into enterprise environments.

## 📦 Overview

- **Multi-tier automated support:** FAQ (Tier 1), Order queries (Tier 2), Escalations (Tier 3)
- **Multi-agent architecture:** Intent classification, routing, and contextual response generation
- **Integration:** WhatsApp Cloud API, MongoDB Atlas, Gemini LLM, Pinecone embeddings, React Admin Dashboard

---

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

## 🏗️ Architecture

```
WhatsApp → Webhook → LangGraph → Agents (FAQ/Order/Escalation) → MongoDB/Pinecone → Gemini LLM → WhatsApp Reply
```

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
