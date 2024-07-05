import express from "express";
import axios from 'axios';
import { auth } from "../middlewares/auth.js";
import { AdminAuth } from "../middlewares/admin-auth.js";
import { User } from "../models/user.models.js";
const router = express.Router()

router.post('/send-prompt', async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }
  
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model  : 'llama3',
        prompt : prompt,
        stream : false,
      });
  
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to process the request' });
    }
});

export default router;