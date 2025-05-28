import { app } from "./app.js";
import http from "http"
import "dotenv/config"


export const server = http.createServer(app);
const port = process.env.PORT

server.listen(port,()=>{
    console.log(`server is listen at${port}`)
});

