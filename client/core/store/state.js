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