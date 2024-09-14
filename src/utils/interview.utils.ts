export const formatData = (_date: string) => {
  const date = new Date(_date);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} (${
    ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
  }) ${date.getHours()}:${date.getMinutes()}`;
};
