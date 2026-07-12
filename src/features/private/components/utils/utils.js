export function formatMessageTime(timeString) {
  // 1. Exit if the string is empty, null, or undefined
  if (!timeString) return "";

  const date = new Date(timeString);
  
  // 2. This is the missing link: It catches strings like "null" or " "
  if (isNaN(date.getTime())) {
    return ""; // Returns an empty string instead of "Invalid Date"
  }

  // 3. Your formatting logic runs safely here
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}