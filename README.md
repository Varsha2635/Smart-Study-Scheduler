#  Smart Study Scheduler

A full-stack personal study planner that automates schedule generation, manages tasks, boosts productivity with focus timers, and tracks progress — all with secure user authentication.

##  Features

###  Core Functionalities

- **Smart Scheduling** – Smart scheduling engine uses AI-inspired logic to prioritize subjects based on exam urgency and distribute daily study hours efficiently.
- **Task Management** – Add tasks with priority, due date, and status tracking.
- **Focus Mode** – Built-in Pomodoro timer to increase concentration with break cycles.
- **Progress Dashboard** – Visual subject progress, task calendar, and productivity stats.

###  Authentication & Security

- JWT-based login with secure session handling  
- Encrypted password storage using **bcrypt**  
- HTTP-only **cookies** for session security

---

##  Tech Stack

### Frontend – `client/`

- **React.js**
- **Tailwind CSS** for styling
- **React Router** for routing

### Backend – `server/`

- **Node.js** with **Express.js**
- **JWT** for auth tokens
- **bcrypt** for hashing passwords
- **Cookies** for session management



## How to Run Locally

###  Prerequisites

* [Node.js](https://nodejs.org/) and npm
* MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* Git installed

---

###  1. Clone the Repository

```bash
git clone https://github.com/Varsha2635/Smart-Study-Scheduler.git
cd Smart-Study-Scheduler
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
npm start
```

> Runs the frontend on `http://localhost:3000/`

---

####  Backend

Open a new terminal:

```bash
cd server
npm install
npm run dev
```

> Runs the backend on `http://localhost:5000/` or your configured port

---

###  Environment Variables

In `server/`, create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```



