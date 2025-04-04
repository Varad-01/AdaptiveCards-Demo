import React, { useEffect, useRef } from "react";
import * as AdaptiveCards from "adaptivecards";
import axios from "axios";

function AdaptiveCardRenderer({ card, onAction }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && card) {
      try {
        const adaptiveCard = new AdaptiveCards.AdaptiveCard();

        // Apply a custom hostConfig for styling
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          containerStyles: {
            default: {
              backgroundColor: "#ffffff",
              foregroundColors: {
                default: { default: "#333333" },
                accent: { default: "#007bff" },
              },
            },
          },
          actions: {
            actionStyle: "positive",
            actionsOrientation: "horizontal",
            actionAlignment: "stretch",
          },
          spacing: {
            padding: 15,
            small: 5,
            default: 10,
            medium: 15,
            large: 20,
          },
          separator: {
            lineThickness: 1,
            lineColor: "#e0e0e0",
          },
        });

        adaptiveCard.parse(card);
        adaptiveCard.onExecuteAction = async (action) => {
          if (action instanceof AdaptiveCards.SubmitAction) {
            const data = action.data;
            console.log("Submit action data:", data);
            try {
              const response = await axios.post(
                "http://localhost:5000/api/chat/message",
                { text: JSON.stringify(data) }
              );
              onAction(response.data);
            } catch (error) {
              console.error("Error submitting action:", error);
            }
          }
        };
        const renderedCard = adaptiveCard.render();
        if (renderedCard) {
          cardRef.current.innerHTML = "";
          cardRef.current.appendChild(renderedCard);
        } else {
          console.error("Failed to render Adaptive Card");
        }
      } catch (error) {
        console.error("Adaptive Card rendering error:", error);
      }
    }
  }, [card, onAction]);

  return <div ref={cardRef} className="adaptive-card" />;
}

export default AdaptiveCardRenderer;
