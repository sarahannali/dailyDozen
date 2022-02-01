const zeroedDate = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  return date;
};

export default zeroedDate;
