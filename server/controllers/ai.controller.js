import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getResults = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    if(!prompt){
        return res.status(400).json({error: "Prompt is required"});
    }
    const query = `Act as a show or movie recommendation system and give the results for the following prompt: ${prompt}, just give the names of whatever is asked in comma seaprated format (max 10 names) don't give any other thing except the names.`;
    const result = await model.generateContent(query);
    const data = await result.response.text();
    const ans = data.split(",").map((item) => item.trim());

    if(result.error){
        return res.status(400).json({error: result.error});
    }
    res.status(200).json(ans);
})