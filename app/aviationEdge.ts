import express from "express";

const aviation = require("aviation-edge");

export default class AviationEdge {
    private aviationEdge: any;

    constructor (apiKey: string) {
        console.log(apiKey);
        this.aviationEdge = new aviation(apiKey);
    }

    public handle (req: express.Request) {

        this.aviationEdge.apiCall('routes', {departureIata: 'TLL', arrivalIata: 'HEL'}, (data) => {
            console.log(data);
        });
    }
}
