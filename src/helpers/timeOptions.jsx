export function generateTimeOptions(startHour, endHour, increment) {
    const options = [];
    for (let h = startHour; h < endHour + 1; h++) {
        for (let m = 0; m <= 30; m += increment) {
            const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            options.push(formattedTime);
        }
    }
    return options;
}