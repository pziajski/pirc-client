export const convertDateToRelative = (timestamp: Date) => {
    const now = new Date();
    const timeDiff = now.getTime() - timestamp.getTime();
    const yearDiff = Math.floor(timeDiff/1000/60/60/24/30/12);
    const monthDiff = Math.floor(timeDiff/1000/60/60/24/30);
    const dayDiff = Math.floor(timeDiff/1000/60/60/24);
    const hourDiff = Math.floor(timeDiff/1000/60/60);
    const minDiff = Math.floor(timeDiff/1000/60);
    const secDiff = Math.floor(timeDiff/1000);

    if (secDiff < 60) {
        return `a few seconds ago`;
    } else if (minDiff < 60) {
        return `${minDiff} minute ago`;
    } else if (hourDiff < 24) {
        return `${hourDiff} hour ago`;
    } else if (dayDiff < 30) {
        return `${dayDiff} day ago`;
    } else if (monthDiff < 12) {
        return `${monthDiff} month ago`;
    } else {
        return `${yearDiff} year ago`;
    }
}