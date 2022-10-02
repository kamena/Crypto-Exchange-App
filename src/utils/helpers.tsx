export const formatMoney = (number: number) => {
  if (isNaN(Number(number))) return number
  return (Number(number)).toFixed(Number(number) < 10 ? 5 : 2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const formatDate = (unixTimestamp: number) => {
  if (isNaN(Number(unixTimestamp))) return unixTimestamp
  var date = new Date(unixTimestamp);
  return date.toLocaleString()
}
