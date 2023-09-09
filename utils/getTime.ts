export function getTimeAgoSinceCreated(created_at: Date | undefined | string) {
  const currentTime = new Date();
  if (!created_at)
    return currentTime.toLocaleString("default", { month: "short" });
  const createdAtDate = new Date(created_at);

  const timeDifference = currentTime.getTime() - createdAtDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const createdAtDay = createdAtDate.getDate();
    const createdAtMonth = createdAtDate.toLocaleString("default", {
      month: "short",
    });
    return `${createdAtDay} ${createdAtMonth}`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}
