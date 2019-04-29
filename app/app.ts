import express from "express";
import { readFile } from "./functions/readFile";
import { formatRouteData, IRouteDataRow } from "./functions/formatRouteData";

import * as dotenv from "dotenv";

dotenv.config();
const app: express.Application = express();

app.get('/', function (req: express.Request, res: express.Response) {
    const data: string[] = readFile('./app/files/routes.dat');
    const formattedData: IRouteDataRow[] = formatRouteData(data);
    // console.log(formattedData[0]);
    res.send(formattedData[0]);
});

app.listen(3000, function () {
    console.log('Test task app listening on port 3000!');
});
