const baseUrl = "https://api.openai.com/v1/completions";

export const fetchOpenApi = (apiKey, query) =>
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(query),
  });
