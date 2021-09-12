var monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formateDate = (date) => {
  if (date) {
    date = new Date(date);
    date.setDate(date.getDate() - 1);
    return (
      capitalizeFirstLetter(monthNames[date.getMonth()]) +
      " " +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      ", " +
      date.getFullYear() +
      " " +
      (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
      ":" +
      (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())
    );
  } else {
    return "";
  }
};

export const sortAscendingList = (data, key) => {
  return data.sort((x, y) => {
    let a = x.upVote.length,
      b = y.upVote.length;
    return a === b ? 0 : a > b ? -1 : 1;
  });
};

export const sortDescendingList = (data, key) => {
  return data.sort((x, y) => {
    let a = x.upVote.length,
      b = y.upVote.length;
    return a === b ? 0 : a > b ? 1 : -1;
  });
};

export const sortListWithDate = (data, key) => {
  return data.sort((a, b) => {
    var key1 = a.createdDate;
    var key2 = b.createdDate;
    if (key1 < key2) {
      return -1;
    } else if (key1 === key2) {
      return 0;
    } else {
      return 1;
    }
  });
};
export const sortListWithDate1 = (data, key) => {
  return data.sort((a, b) => {
    var key1 = new Date(a.createdDate);
    var key2 = new Date(b.createdDate);
    if (key1 < key2) {
      return 1;
    } else if (key1 === key2) {
      return 0;
    } else {
      return -1;
    }
  });
};

function ASC(key1, key2) {
  if (key1 < key2) {
    return 1;
  } else if (key1 === key2) {
    return 0;
  } else {
    return -1;
  }
}
function DESC(key1, key2) {
  if (key1 < key2) {
    return -1;
  } else if (key1 === key2) {
    return 0;
  } else {
    return 1;
  }
}

export const sortData = (data, key, orderType) => {
  // key = "createdDate";
  switch (orderType) {
    case "ASC": {
      return data.sort((a, b) => {
        return ASC(a[key], b[key]);
      });
    }
    case "DESC": {
      return data.sort((a, b) => {
        return DESC(a[key], b[key]);
      });
    }
    default:
      return data;
  }
};
