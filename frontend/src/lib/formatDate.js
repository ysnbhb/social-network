export function formatDate(date) {
    const newdate = new Date(date);
    return newdate.toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', '') 
    .replace(' at', ' -');
}
