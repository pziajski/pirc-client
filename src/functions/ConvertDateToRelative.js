export const convertDateToRelative = (timestamp) => {
    const now = new Date();
    const timeDiff = now.getTime() - timestamp;
    const yearDiff = Math.floor(timeDiff/1000/60/60/24/30/12);
    const monthDiff = Math.floor(timeDiff/1000/60/60/24/30);
    const dayDiff = Math.floor(timeDiff/1000/60/60/24);
    const hourDiff = Math.floor(timeDiff/1000/60/60);
    const minDiff = Math.floor(timeDiff/1000/60);
    const secDiff = Math.floor(timeDiff/1000);

    if (secDiff < 60) {
        return `a few seconds ago`;
    } else if (minDiff < 60) {
        return `${minDiff} minutes ago`;
    } else if (hourDiff < 24) {
        return `${hourDiff} hours ago`;
    } else if (dayDiff < 30) {
        return `${dayDiff} days ago`;
    } else if (monthDiff < 12) {
        return `${monthDiff} months ago`;
    } else {
        return `${yearDiff} years ago`;
    }
}