

const state = {

    directions: {
        N: "straigt",
        S: "backwards",
        W: "left",
        E: "right"
    },

    currentTime: {
        time: 5000000
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