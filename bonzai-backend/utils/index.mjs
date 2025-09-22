export const getRoomCount = (rooms) => {
    let totalRoomCount = 0;
    rooms.forEach(room => {
        totalRoomCount += parseInt(room.count)
    })
    return totalRoomCount;
}