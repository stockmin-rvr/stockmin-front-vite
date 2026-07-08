

export function getAbbreviation(text: string): string {
    const stopWords = new Set(["de", "del", "la", "las", "el", "los", "y", "and", "o", "or", "a", "en", "of", "the"]);

    const cleaned = text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, "").trim();
    if (!cleaned) return "-";
    const cleanedWords = cleaned.split(/\s+/).filter(Boolean);

    if (cleanedWords.length >= 2) {
        const initials = cleanedWords.filter(word => !stopWords.has(word.toLowerCase())).map(word => word.charAt(0));
        return (initials.join("").slice(0, 2).toUpperCase()|| "-");
    }

    const result = cleaned.replace(/\s/g, "");
    if (result.length === 1) return result.toUpperCase();
    return result.substring(0, 2).toUpperCase();
}

type FormatDateType = {
    date: string | Date,
    showTime?: boolean
}

export function formatDate({date, showTime = false}: FormatDateType): string {

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "-";
  }


  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();


  const formattedDate = `${day}/${month}/${year}`;


  if (!showTime) {
    return formattedDate;
  }


  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  const seconds = String(parsedDate.getSeconds()).padStart(2, "0");


  return `${formattedDate} - ${hours}:${minutes}:${seconds}`;
}