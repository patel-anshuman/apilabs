const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/api/test", async (req, res) => {
  const { url, method, headers, data } = req.body;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.get("/api/test", async (req, res) => {
  const { url, headers } = req.query;

  try {
    const response = await axios({
      method: "GET",
      url,
      headers: JSON.parse(headers),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.delete("/api/test", async (req, res) => {
  const { url, headers } = req.query;

  try {
    const response = await axios({
      method: "DELETE",
      url,
      headers: JSON.parse(headers),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.patch("/api/test", async (req, res) => {
  const { url, headers, data } = req.body;

  try {
    const response = await axios({
      method: "PATCH",
      url,
      headers,
      data,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`API testing platform backend listening at http://localhost:${port}`);
});