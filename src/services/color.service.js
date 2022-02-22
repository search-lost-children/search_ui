const colorMap = {}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getColor (userId) {
    const userColor = colorMap[userId]
    if (!userColor) {
        colorMap[userId] = rgbToHex(
            Math.floor(Math.random()* (255 -50) + 50),
            Math.floor(Math.random()* (255 -50) + 50),
            Math.floor(Math.random()* (255 - 50) + 50)
        )
        return colorMap[userId]
    }
    return userColor
}