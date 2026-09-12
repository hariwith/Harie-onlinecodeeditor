const express = require('express')
const cors = require("cors");
const executeCode = require("./executor")
const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}));

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

app.listen(3000,()=>{
    console.log("Server running on 3000")
})