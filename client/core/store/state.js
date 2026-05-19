export const state = {

    // Kolla genom state och se vad som behövs, främst bland annat vad användaren behöver, alltså typ current som påverkar beroende på
    // om någon current ändras, då ska det påverka allt på sidan, allt annat blir fördefinerat

    currentDirection: {
        // example
        direction: "N"
    },

    currentTime: 10800000,

    startedTime: 0,

    currentMap: {
        idname: "currentMap",
        mapName: "karta1",
        cordinates: { topLeftLong: 12.9882200, topRightLong: 13.0003500, topLeftLat: 55.6142100, bottomLeftLat: 55.6071200 },
        mapSize: { width: 947, height: 1102 }
        // mapName: "karta2",
        // cordinates: { cordinates: { topLeftLong: 12.974861, topRightLong: 12.988768, topLeftLat: 55.612296, bottomLeftLat: 55.606152 } },
        // mapSize: { width: 1853, height: 1180 }

    },

    coordinates: [
        //example object
        {
            cordinates: "57.1, 12.3",
            hasPassed: false,
        },
        {
            cordinates: "43.1, 8.3",
            hasPassed: false,
        },
        {
            cordinates: "50.1, 5.3",
            hasPassed: false,
        },
        {
            cordinates: "35.1, 15.3",
            hasPassed: false,
        },
        {
            cordinates: "60.1, 20.3",
            hasPassed: false,
        },
    ],

    // Maybe object, not array?
    times: [
        {
            start: 10800000,
            hasPassed: false
        },

        {
            half: 5400000,
            hasPassed: false
        },
        {
            mid: 2700000,
            hasPassed: false
        }
    ],






}