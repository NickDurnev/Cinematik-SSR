import moment from "moment";

export const formatDate = (date: string) => {
  const parsedDate = moment(date).startOf("day");
  const today = moment().startOf("day");

  if (parsedDate.isSame(today, "day")) {
    return "Today";
  } else if (parsedDate.isSame(today.clone().subtract(1, "day"), "day")) {
    return "Yesterday";
  } else {
    return parsedDate.format("DD MMM YYYY");
  }
};
