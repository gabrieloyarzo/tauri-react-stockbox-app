export function formatDateToSpanish(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateString.match(regex)) {
    return dateString;
  }

  const [year, month, day] = dateString.split('-').map(Number);

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const formattedDate = `${day.toString().padStart(2, '0')} ${months[month - 1]} ${year}`;

  return formattedDate;
}