export default function formatDateTime(dateString) {
  const formattedDateTime = new Date(dateString).toLocaleString({
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return formattedDateTime;
}
