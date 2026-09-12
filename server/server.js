const express = require('express')
const cors = require("cors");
const executeCode = require("./executor")
const app = express()

app.use(cors());

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Code Editor Server is running")
})


app.post("/api/execute", async (req, res) => {
    const { code, language,input } = req.body;

    if (!code || !language) {
        return res.status(400).json({
            error: "Code and language are required"
        });
    }

    try {
        const output = await executeCode(code, language, input);

        res.json({
            output
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


const PORT = process.env.PORT || 3000
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on ${PORT}`)
})