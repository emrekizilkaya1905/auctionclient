function formatTime(ms:number):string {
  const seconds = Math.floor(ms/1000);
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);
  return `${days} days,${hours%24} hours, minutes ${minutes % 60} , seconds ${seconds%60} `
}
export default formatTime
// const seconds = Math.floor(ms / 1000) % 60;
// const minutes = Math.floor(ms / (1000 * 60)) % 60;
// const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
// const days = Math.floor(ms / (1000 * 60 * 60 * 24));

// let result = [];

// if (days > 0) result.push(`${days} ${days === 1 ? "day" : "days"}`);
// if (hours > 0) result.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
// if (minutes > 0) result.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
// if (seconds > 0 || result.length === 0) result.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);

// return result.join(", ");