const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
const {getCompliment,getFortune, getPerfumes,creatPerfume,deletePerfume,updatePerfume} = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/cookie",getFortune);


app.get("/api/perfumes",getPerfumes);
app.post("/api/perfumes",creatPerfume);
app.put("/api/perfumes/:id",updatePerfume);
app.delete("/api/perfumes/:id",deletePerfume);

app.listen(4000, () => console.log("Server running on 4000"));
