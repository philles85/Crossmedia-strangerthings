export const state = {

    timerCircleAngle: Math.PI * 2,

    currentTime: 10000,

    startedTime: 0,

    currentMap: {
        idname: "currentMap",
        mapName: "karta1",
        // { topLeftLong: 12.9882200, topRightLong: 13.0003500, topLeftLat: 55.6142100, bottomLeftLat: 55.6071200 },
        cordinates: { topLeftLong: 12.989825, topRightLong: 12.998336, topLeftLat: 55.612500, bottomLeftLat: 55.606900 },
        mapSize: { width: 947, height: 1102 }
    },

    endingPageOpen: false,
    lastPageOpen: false

}