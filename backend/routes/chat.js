const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/message", (req, res) => {
  const { text } = req.body;
  let adaptiveCard;

  // Dynamic card generation based on user input
  if (text.toLowerCase().includes("weather")) {
    adaptiveCard = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          text: "5-Day Weather Forecast for New York City",
          weight: "bolder",
          size: "medium",
        },
        {
          type: "ColumnSet",
          columns: [
            {
              type: "Column",
              width: "stretch",
              items: [
                { type: "TextBlock", text: "Mon", weight: "bolder" },
                { type: "TextBlock", text: "32°F" },
                { type: "TextBlock", text: "Partly Cloudy" },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                { type: "TextBlock", text: "Tue", weight: "bolder" },
                { type: "TextBlock", text: "28°F" },
                { type: "TextBlock", text: "Snow" },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                { type: "TextBlock", text: "Wed", weight: "bolder" },
                { type: "TextBlock", text: "34°F" },
                { type: "TextBlock", text: "Rain" },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                { type: "TextBlock", text: "Thu", weight: "bolder" },
                { type: "TextBlock", text: "30°F" },
                { type: "TextBlock", text: "Clear" },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                { type: "TextBlock", text: "Fri", weight: "bolder" },
                { type: "TextBlock", text: "35°F" },
                { type: "TextBlock", text: "Cloudy" },
              ],
            },
          ],
        },
      ],
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.5",
    };
  } else if (text.toLowerCase().includes("quiz")) {
    adaptiveCard = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          text: "Next.js Quiz",
          weight: "bolder",
          size: "medium",
        },
        {
          type: "TextBlock",
          text: "Test your knowledge about Next.js!",
          wrap: true,
        },
        {
          type: "TextBlock",
          text: "1. What command is used to create a new Next.js project?",
          wrap: true,
        },
        {
          type: "Input.ChoiceSet",
          id: "q1",
          style: "compact",
          choices: [
            { title: "npx create-next-app", value: "npx create-next-app" },
            { title: "npm install next", value: "npm install next" },
            { title: "npx next-start", value: "npx next-start" },
          ],
        },
        {
          type: "TextBlock",
          text: "2. How does Next.js handle static site generation?",
          wrap: true,
        },
        {
          type: "Input.ChoiceSet",
          id: "q2",
          style: "compact",
          choices: [
            { title: "Using getStaticProps", value: "Using getStaticProps" },
            {
              title: "Using getServerSideProps",
              value: "Using getServerSideProps",
            },
          ],
        },
        {
          type: "TextBlock",
          text: "3. Which file is used to add global CSS in a Next.js project?",
          wrap: true,
        },
        {
          type: "Input.ChoiceSet",
          id: "q3",
          style: "compact",
          choices: [
            { title: "_app.js", value: "_app.js" },
            { title: "index.css", value: "index.css" },
            { title: "style.css", value: "style.css" },
          ],
        },
      ],
      actions: [
        {
          type: "Action.Submit",
          title: "Submit Answers",
          style: "positive",
          data: { action: "submitQuiz" },
        },
      ],
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.5",
    };
  } else if (text.toLowerCase().includes("cheatsheet")) {
    adaptiveCard = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          text: "Next.js Cheatsheet",
          weight: "bolder",
          size: "medium",
        },
        {
          type: "TextBlock",
          text: "Quick reference for common Next.js tasks and configurations.",
          wrap: true,
        },
        {
          type: "TextBlock",
          text: "Create a new project:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "npx create-next-app project-name",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Start development:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "npm run dev",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Build for production:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "npm run build",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Start production server:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "npm start",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Static Site Generation:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "getStaticProps - Fetch data at build time",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Server-side Generation:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "getServerSideProps - Fetch data on each request",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Client-side Data Fetching:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "Use useEffect() for fetching methods like fetch() or axios",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "API Routes:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "Place API files in /pages/api/",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Global CSS:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "Import global CSS in _app.js only",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Image Optimization:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "Use the <Image /> component from next/image",
          wrap: true,
          isSubtle: true,
        },
        {
          type: "TextBlock",
          text: "Static Files:",
          weight: "bolder",
        },
        {
          type: "TextBlock",
          text: "Place static files in /public/ directory",
          wrap: true,
          isSubtle: true,
        },
      ],
      actions: [
        {
          type: "Action.Submit",
          title: "Generate a Next.js cheatsheet",
          style: "positive",
          data: { action: "generateCheatsheet" },
        },
      ],
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.5",
    };
  } else if (text.toLowerCase().includes("reservation")) {
    adaptiveCard = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          text: "Restaurant Reservation",
          weight: "bolder",
          size: "medium",
        },
        {
          type: "TextBlock",
          text: "Please fill the form to reserve a table.",
          wrap: true,
        },
        {
          type: "TextBlock",
          text: "Name",
          wrap: true,
        },
        {
          type: "Input.Text",
          id: "name",
          placeholder: "Enter your name",
        },
        {
          type: "TextBlock",
          text: "Email",
          wrap: true,
        },
        {
          type: "Input.Text",
          id: "email",
          placeholder: "Enter your email",
        },
        {
          type: "TextBlock",
          text: "Reservation Date",
          wrap: true,
        },
        {
          type: "Input.Date",
          id: "date",
        },
        {
          type: "TextBlock",
          text: "Reservation Time",
          wrap: true,
        },
        {
          type: "Input.Time",
          id: "time",
        },
        {
          type: "TextBlock",
          text: "Number of Guests",
          wrap: true,
        },
        {
          type: "Input.Number",
          id: "guests",
          placeholder: "Number of guests",
          min: 1,
        },
        {
          type: "TextBlock",
          text: "Seating Preference",
          wrap: true,
        },
        {
          type: "Input.ChoiceSet",
          id: "seating",
          style: "compact",
          choices: [
            { title: "Indoor", value: "indoor" },
            { title: "Outdoor", value: "outdoor" },
          ],
        },
      ],
      actions: [
        {
          type: "Action.Submit",
          title: "Reserve Table",
          style: "positive",
          data: { action: "submitReservation" },
        },
      ],
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.5",
    };
  } else {
    adaptiveCard = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          text: `You said: ${text}`,
          wrap: true,
        },
        {
          type: "Input.Text",
          id: "userInput",
          placeholder: "Type your response",
        },
      ],
      actions: [
        {
          type: "Action.Submit",
          title: "Submit",
          style: "positive",
          data: { action: "submitResponse" },
        },
      ],
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.5",
    };
  }

  const botResponse = new Message("Here's a response", "bot", adaptiveCard);
  res.json(botResponse);
});

module.exports = router;
