import express from "express";
import AviationEdge from "./aviationEdge";

import * as dotenv from "dotenv";

dotenv.config();
const app: express.Application = express();

app.get('/', function (req: express.Request, res: express.Response) {
    const edge = new AviationEdge(process.env.AVIATION_EDGE_API_KEY);
    return edge.handle(req);
});

app.listen(3000, function () {
    console.log('Test task app listening on port 3000!');
});