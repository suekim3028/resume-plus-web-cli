export const formatDate = (_date: string) => {
  console.log(_date);

  const dateString = _date.endsWith("Z") ? _date : _date + "Z";
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} (${
    ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
  }) ${date.getHours()}:${date.getMinutes()}`;
};
