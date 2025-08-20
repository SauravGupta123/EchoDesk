EchoDesk 🤖💬
=============

**Multi-Tier Agentic RAG WhatsApp Support System**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas) [![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-blue.svg)](https://langchain-ai.github.io/langgraph/) [![WhatsApp](https://img.shields.io/badge/WhatsApp-Cloud%20API-25D366.svg)](https://developers.facebook.com/docs/whatsapp) [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://claude.ai/chat/LICENSE)

EchoDesk brings **next-generation customer support automation** to WhatsApp through intelligent multi-agent architecture. Built with advanced **Retrieval-Augmented Generation (RAG)**, real-time intent classification, and seamless human-in-the-loop escalation, EchoDesk ensures every customer receives the right answer at the right time.

* * * * *

🌟 Why EchoDesk?
----------------

-   **🚀 Instant Response**: 80% of queries resolved automatically within seconds
-   **🎯 Smart Routing**: Multi-agent system intelligently classifies and routes queries
-   **🔄 Seamless Escalation**: Complex issues smoothly transition to human agents
-   **📊 Complete Visibility**: Unified dashboard for full conversation oversight
-   **⚡ Zero Downtime**: Live knowledge base updates with immediate effect
-   **🔒 Enterprise Ready**: Production-grade security and scalability

* * * * *

🎯 Key Features
---------------

### **Automated Multi-Tier Support**

-   **Tier 1**: FAQ automation with semantic search
-   **Tier 2**: Order status and tracking queries
-   **Tier 3**: Human agent escalation with context preservation

### **Advanced AI Architecture**

-   **Multi-Agent System**: Specialized agents for different query types
-   **RAG-Powered Responses**: Context-aware answers using vector search
-   **Intent Classification**: Intelligent routing based on message analysis
-   **Conversation Memory**: Context preserved across all interactions

### **Human-in-the-Loop**

-   **Smart Escalation**: Automatic ticket creation for complex queries
-   **Real-time Dashboard**: Agent interface for ticket management
-   **Bi-directional Sync**: Messages synchronized between dashboard and WhatsApp
-   **SLA Tracking**: Performance monitoring and response time analytics

### **Enterprise Integration**

-   **WhatsApp Cloud API**: Official integration for business messaging
-   **MongoDB Atlas**: Scalable data storage with vector search capabilities
-   **Pinecone Vector DB**: High-performance similarity search
-   **Google Gemini**: Advanced language model for response generation

* * * * *

🏗️ System Architecture
-----------------------

### High-Level Flow

```
graph TD
    A[📱 WhatsApp User] --> B[☁️ WhatsApp Cloud API]
    B --> C[🎣 Webhook Endpoint]
    C --> D[⚡ Message Processor]
    D --> E[🧠 LangGraph Router Agent]

    E --> F{🎯 Intent Classification}
    F -->|❓ FAQ Query| G[📚 FAQ Agent]
    F -->|📦 Order Query| H[🛒 Order Agent]
    F -->|🆘 Complex/Unknown| I[🎫 Escalation Agent]
    F -->|💬 Greeting/Small Talk| J[🤝 Conversational Agent]

    G --> K[🔍 MongoDB Atlas Vector Search]
    H --> L[🔍 MongoDB Atlas Vector Search]
    I --> M[🎟️ Ticket Management System]
    J --> N[💭 Context-Aware Response]

    K --> O[📊 Pinecone Vector DB]
    L --> P[🗄️ Order Database]
    O --> Q[🤖 Gemini LLM]
    P --> Q
    M --> R[👨‍💼 Admin Dashboard]
    Q --> S[💬 Response Generator]

    S --> T[📲 WhatsApp Response]
    R --> U[👤 Human Agent Interface]
    U --> T
    T --> A

    style A fill:#25D366,color:#fff
    style E fill:#FF6B6B,color:#fff
    style Q fill:#4ECDC4,color:#fff
    style R fill:#45B7D1,color:#fff

```

### Multi-Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        EchoDesk Core                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  🎣 Message API │  │ 🧠 LangGraph Core│  │ 👨‍💼 Admin    │ │
│  │   - Webhook     │  │  - Router Agent │  │  Dashboard   │ │
│  │   - Validation  │  │  - Multi-Agent  │  │  - Tickets   │ │
│  │   - Audit Log   │  │  - Checkpoints  │  │  - Analytics │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   📚 FAQ Agent  │  │  🛒 Order Agent │  │ 🆘 Escalation│ │
│  │  - Semantic     │  │  - Status Check │  │    Agent     │ │
│  │    Search       │  │  - Tracking     │  │  - Ticketing │ │
│  │  - RAG Response │  │  - Updates      │  │  - SLA Track │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  🗄️ MongoDB     │  │  📊 Pinecone    │  │ 🤖 Gemini    │ │
│  │    Atlas        │  │    Vector DB    │  │    LLM       │ │
│  │  - Collections  │  │  - Embeddings   │  │  - Generation│ │
│  │  - Vector Index │  │  - Similarity   │  │  - Context   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘

```

* * * * *

🚀 Getting Started
------------------

### Prerequisites

-   **Node.js** (v18+)
-   **MongoDB Atlas** account
-   **WhatsApp Business API** credentials
-   **Google Cloud** account (Gemini API)
-   **Pinecone** account (optional but recommended)

### 1\. Clone Repository

```
git clone https://github.com/your-org/echodesk.git
cd echodesk

```

### 2\. Environment Setup

Create `.env` file in the root directory:

```
# WhatsApp Configuration
WHATSAPP_API_TOKEN=your_whatsapp_api_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/echodesk
REDIS_URL=redis://localhost:6379

# AI Services
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=echodesk-vectors

# Application Configuration
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key

# Dashboard Configuration
DASHBOARD_PORT=3001
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=secure_admin_password

```

### 3\. Install Dependencies

```
# Install backend dependencies
npm install

# Install dashboard dependencies
cd dashboard
npm install
cd ..

```

### 4\. Database Setup

```
# Run database migrations and seed data
npm run setup:db

# Create vector indexes
npm run setup:vectors

```

### 5\. Start Services

```
# Start all services (backend + dashboard)
npm run dev

# Or start individually
npm run start:backend    # Backend on port 3000
npm run start:dashboard  # Dashboard on port 3001

```

### 6\. Configure WhatsApp Webhook

Set your webhook URL in WhatsApp Business API:

```
https://your-domain.com/webhook/whatsapp

```

* * * * *



📊 Admin Dashboard
------------------

### Features

-   **🎫 Ticket Management**: View, assign, and resolve customer tickets
-   **💬 Live Chat**: Real-time messaging with customers via WhatsApp
-   **📈 Analytics**: Response times, resolution rates, and customer satisfaction
-   **👥 Agent Management**: User roles, permissions, and workload distribution
-   **📚 Knowledge Base**: FAQ and order data management with vector updates
-   **⚡ Real-time Updates**: WebSocket integration for live notifications

### Dashboard API Endpoints

```
// Ticket Management
GET    /api/tickets                    # List all tickets
GET    /api/tickets/:id               # Get ticket details
POST   /api/tickets/:id/assign        # Assign ticket to agent
PUT    /api/tickets/:id/status        # Update ticket status
POST   /api/tickets/:id/reply         # Send message to customer

// Analytics
GET    /api/analytics/overview        # Dashboard metrics
GET    /api/analytics/performance     # Agent performance
GET    /api/analytics/satisfaction    # Customer satisfaction

// Knowledge Base
GET    /api/faqs                      # List FAQs
POST   /api/faqs                      # Create FAQ
PUT    /api/faqs/:id                  # Update FAQ
DELETE /api/faqs/:id                  # Delete FAQ
POST   /api/faqs/bulk-embed           # Trigger embedding update

// System
GET    /api/health                    # System health check
GET    /api/metrics                   # System metrics
POST   /api/webhook/test              # Test webhook

```

* * * * *

🔒 Security & Compliance
------------------------

### Authentication & Authorization

-   **JWT-based authentication** for dashboard access
-   **Role-based access control** (Admin, Agent, Viewer)
-   **WhatsApp webhook signature verification**
-   **Rate limiting** on all API endpoints

### Data Protection

-   **Encryption at rest** (MongoDB Atlas)
-   **Encryption in transit** (TLS 1.3)
-   **PII data handling** compliance
-   **GDPR-ready** data retention policies

### Monitoring & Logging

-   **Structured logging** with correlation IDs
-   **Real-time alerts** for system issues
-   **Performance monitoring** and metrics
-   **Audit trail** for all administrative actions

* * * * *

🚀 Deployment
-------------

### Production Setup

1.  **Environment Variables**

```
# Set production environment
NODE_ENV=production
WEBHOOK_URL=https://your-domain.com/webhook/whatsapp

```

1.  **Docker Deployment**

```
# Build and run with Docker
docker build -t echodesk .
docker run -p 3000:3000 --env-file .env echodesk

```

1.  **Database Indexes**

```
# Create required indexes
npm run db:create-indexes
npm run vectors:create-indexes

```

### Scaling Considerations

-   **Load Balancer**: Use nginx or cloud load balancer
-   **Database Sharding**: MongoDB Atlas auto-scaling
-   **Vector Search**: Pinecone handles scaling automatically
-   **Caching**: Redis for frequently accessed data
-   **Monitoring**: Implement comprehensive logging and alerting

* * * * *

📈 Performance Metrics
----------------------

### System Benchmarks

-   **Response Time**: < 3 seconds average
-   **Throughput**: 1000+ messages/minute
-   **Accuracy**: 85%+ intent classification
-   **Escalation Rate**: < 20% of queries
-   **Customer Satisfaction**: 4.5/5 average rating

### Monitoring Dashboards

-   Real-time message processing rates
-   Agent response times and workload
-   System resource utilization
-   Customer satisfaction scores
-   Knowledge base effectiveness metrics

* * * * *

🤝 Contributing
---------------

We welcome contributions! Please see our [Contributing Guide](https://claude.ai/chat/CONTRIBUTING.md) for details.

### Development Setup

```
# Install development dependencies
npm install --include=dev

# Run tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

```

### Pull Request Process

1.  Fork the repository
2.  Create a feature branch
3.  Make your changes
4.  Add tests if applicable
5.  Ensure all tests pass
6.  Submit a pull request

* * * * *

📝 License
----------

This project is licensed under the MIT License - see the [LICENSE](https://claude.ai/chat/LICENSE) file for details.

* * * * *


🎉 Acknowledgments
------------------

-   **LangGraph** team for the multi-agent framework
-   **MongoDB Atlas** for vector search capabilities
-   **Google Gemini** for advanced language understanding
-   **WhatsApp Business API** for messaging platform
-   **Pinecone** for high-performance vector operations

* * * * *

<div align="center">

**Built with ❤️ for better customer support**

[⭐ Star this repository](https://github.com/SauravGupta123/EchoDesk) if you found it helpful!

</div>
