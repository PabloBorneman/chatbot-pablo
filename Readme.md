# Chatbot API using OpenAI and Express

This project sets up a simple chatbot API using OpenAI's GPT-3.5 Turbo model, integrated with an Express.js server. The API accepts user input, sends it to OpenAI for processing, and returns the generated response.

# Chatbot API using OpenAI and Express

<img src="public/chat comletion ui.PNG" />

This project sets up a simple chatbot API using OpenAI's GPT-3.5 Turbo model, integrated with an Express.js server. The API accepts user input, sends it to OpenAI for processing, and returns the generated response.

## Features

- Simple Express server setup
- Integration with OpenAI API
- JSON parsing for incoming requests
- Serving static files from the `public` directory
- Error handling for API calls and user input validation

## Installation

Before starting, ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the server with `npm start` or `node index.js`.

## Usage

Once the server is running, you can access the chatbot interface by navigating to `http://localhost:3000` in your web browser.

To interact with the chatbot API directly, send a POST request to `http://localhost:3000/chat` with a JSON payload containing the user's message:

```
{
  "message": "Your message here"
}

```

The API will respond with a JSON object containing the AI's response:

```
{
  "message": "AI's response here"
}
```

## Code Explanation

Express: The web framework for Node.js that handles HTTP requests.
body-parser: Middleware for parsing incoming request bodies in a middleware before your handlers, available under req.body.
OpenAI: The official OpenAI Node.js client library for interacting with the OpenAI API.
dotenv: A module that loads environment variables from a .env file into process.env.
The server is set up to listen on the port specified in the .env file or default to port 3000. It serves static files from the public directory and defines two routes:

A GET route to serve index.html as the entry point.
A POST route `/chat` that processes the user's message, sends it to OpenAI, and returns the response.

## Contribution

Contributions to the project are welcome. Please ensure you follow the code of conduct and submit pull requests for any new features or updates.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.
