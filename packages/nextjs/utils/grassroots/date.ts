export const dateToString = (dateNum: any) => {
  const date = new Date(Number(dateNum));

  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  //   const year = date.toLocaleDateString("en-US", { year: "numeric" });

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} at ${hour}:${minutesPadded}`;
};
