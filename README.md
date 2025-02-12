# Chatbot Backend

## Project Description

This project is the backend for the Dixie Chatbot Desktop Application built with Node.js and Express.js. It handles API requests from the frontend, processes user messages (currently by echoing them back), and is designed to serve as the foundation for further backend logic—such as integrating search APIs or additional processing.

## Directory Structure

```bash
/dixie-chatbot-server
├── app.js            # Express server handling API requests
├── .env              # Environment variables (e.g., PORT, API keys)
├── .gitignore        # Files and directories to ignore in Git
├── LICENSE           # MIT License file
├── package.json      # npm configuration file
└── README.md         # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chatbot-backend.git
   cd chatbot-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root and add your configuration:

   ```dotenv
   PORT=3000
   BING_API_KEY=your_bing_api_key_here
   ```

### Running the Server

Start the Express server with:

```bash
node app.js
```

Your server should now be running on [http://localhost:3000](http://localhost:3000).

## API Endpoint

### POST `/message`

- **Description:** Accepts a JSON object containing a `message` field, echoes the message back.
- **Request Example:**

  ```json
  { "message": "Hello, backend!" }
  ```

- **Response Example:**

  ```json
  { "message": "Hello, backend!" }
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
