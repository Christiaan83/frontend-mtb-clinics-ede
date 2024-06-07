export const formatTime = (time) => {

    const formattedTime = time.toString();
    const [hours, minutes] = formattedTime.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};