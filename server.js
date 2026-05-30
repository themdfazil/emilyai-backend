const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ APNI ASLI NAYI GROQ KEY KO YAHAN "" KE ANDAR PASTE KAREIN
const groq = new Groq({ 
    apiKey: "gsk_p0yaDPtYkBxGyb3FYvEuz6VNleMmolnHmCSTqVqGv" 
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ response: "Message khali hai." });
    }

    try {
        // server.js ke andar is section ko aise badlein:
const chatCompletion = await groq.chat.completions.create({
    messages: [
        { 
            role: 'system', 
            content: 'You are Emily, a smart and polite female AI assistant. Always introduce yourself as Emily.' 
        },
        { 
            role: 'user', 
            content: message 
        }
    ],
    model: 'llama-3.1-8b-instant'
});


        const aiResponse = chatCompletion.choices[0].message.content;
        res.json({ response: aiResponse });

    } catch (error) {
        console.error("Groq System Error:", error.message);
        res.status(500).json({ response: "Groq Error: " + error.message });
    }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
