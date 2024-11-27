const ParseJson = (obj) => {
  return JSON.parse(obj);
};

const StringifyJson = (obj) => {
  return JSON.stringify(obj);
};

const getLocalStorage = (key) => {
  return localStorage.hasOwnProperty(key)
    ? ParseJson(localStorage.getItem(key))
    : [];
};

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, StringifyJson(data));
};

const listData = getLocalStorage("taskList");

export const saveData = (content) => {
  listData.push(ParseJson(content));
  setLocalStorage("taskList", listData);
};

export const readData = () => {
  return listData;
};

export const deleteData = (id) => {
  const list = getLocalStorage("taskList");
  const updatedList = list.filter((item) => item.id !== id);
  setLocalStorage("taskList", updatedList);
  return updatedList;
};

export const taskReport = () => {
  const list = getLocalStorage("taskList");
  const alltask = list.length;

  // const count = {};
  // list.forEach((item, index) => {
  //   count[item.status] = count[item.status] ? count[item.status] + 1 : 1;
  // });

  const count =
    list.length &&
    list.reduce((acc, item) => {
      const key = item.status.toLowerCase().replace(" ", "");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return { alltask, ...count };
};

export const fetchTask = (id) => {
  const list = getLocalStorage("taskList");
  return list.filter((item) => item.id === id)[0];
};

export const updateTask = (id, content) => {
  const data = listData;
  data.map((item) => {
    if (item.id === id) {
      const task = Object.keys(item).map((key) => {
        return (item[key] = content[key]);
      });
      return task;
    } else {
      return item;
    }
  });
  setLocalStorage("taskList", data);
};

export const filterSearchTaskList = (searchInput) => {
  const list = getLocalStorage("taskList");
  return list.filter((item) =>
    item?.title?.toLowerCase().includes(searchInput?.toLowerCase())
  );
};

export const filterTaskList = (selectedFilter) => {
  const list = getLocalStorage("taskList");
  if (selectedFilter?.toLowerCase() === "all") {
    return list;
  }

  return list.filter(
    (item) => item?.status?.toLowerCase() === selectedFilter?.toLowerCase()
  );
};

export const daysCal = (createdOn) => {
  let currentDate = new Date(new Date().toLocaleDateString());
  let seconds = 1000 * 3600 * 24;
  let daysDiff = currentDate.getTime() - new Date(createdOn).getTime();
  let days = Math.round(daysDiff / seconds);
  return `${daysDiff === 0 ? "Today" : `${days} days`}`;
};

export const generateToken = (length = 32) => {
  const tokenChar =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var token = [];
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (tokenChar.length - 1)).toFixed(0);
    token[i] = tokenChar[j];
  }
  return token.join("");
};
