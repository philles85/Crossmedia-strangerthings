export const state = {

    // Kolla genom state och se vad som behövs, främst bland annat vad användaren behöver, alltså typ current som påverkar beroende på
    // om någon current ändras, då ska det påverka allt på sidan, allt annat blir fördefinerat

    currentDirection: {
        // example
        direction: "N"
    },

    currentTime: {
        time: 10800000
    },


    directions: {
        // I vilken riktning sker med grader
        N: 0,
        E: 90,
        S: 180,
        W: 270
    },

    currentMap: {
        // mapName: "karta1",
        // cordinates: { pointA: { long: 12.990065, x: 126, lat: 55.608927, y: 732 }, pointB: { long: 12.998400, x: 991, lat: 55.609754, y: 631 } },
        // mapSize: { width: 1107, height: 1151 }
        mapName: "karta2",
        cordinates: { cordinates: { topLeftLong: 12.974861, topRightLong: 12.988768, topLeftLat: 55.612296, bottomLeftLat: 55.606152 } },
        mapSize: { width: 1853, height: 1180 }
        // mapName: "karta2",
        // cordinates: [
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.989777, lat: 55.608883 },
        //             mapCoord: { x: 1763, y: 753 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.986731, lat: 55.608502 },
        //             mapCoord: { x: 1414, y: 790 }
        //         }
        //     },
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.986731, lat: 55.608502 },
        //             mapCoord: { x: 1414, y: 790 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.979316, lat: 55.606721 },
        //             mapCoord: { x: 1296, y: 922 }
        //         }
        //     },
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.979316, lat: 55.606721 },
        //             mapCoord: { x: 1296, y: 922 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.979052, lat: 55.606509 },
        //             mapCoord: { x: 570, y: 1040 }
        //         }
        //     },
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.979052, lat: 55.606509 },
        //             mapCoord: { x: 570, y: 1040 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.978397, lat: 55.606564 },
        //             mapCoord: { x: 546, y: 1063 }
        //         }
        //     },
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.978397, lat: 55.606564 },
        //             mapCoord: { x: 546, y: 1063 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.975459, lat: 55.608519 },
        //             mapCoord: { x: 198, y: 654 }
        //         }
        //     },
        //     {
        //         pointA: {
        //             geoCoord: { long: 12.975459, lat: 55.608519 },
        //             mapCoord: { x: 198, y: 654 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.975267, lat: 55.608718 },
        //             mapCoord: { x: 179, y: 602 }
        //         }
        //     },
        //     {
        //         pointB: {
        //             geoCoord: { long: 12.975267, lat: 55.608718 },
        //             mapCoord: { x: 179, y: 602 }
        //         },
        //         pointB: {
        //             geoCoord: { long: 12.974859, lat: 55.609700 },
        //             mapCoord: { x: 160, y: 414 }
        //         }
        //     },
        // ],
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


    "array3": [

    ]




}