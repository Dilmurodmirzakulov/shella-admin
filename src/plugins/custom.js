export const truncateString = (string, length) => {
  if (!!string && string.length > length) return `${string.substring(0, length)}...`;
  return string;
};
export const getGroupNameById = (groups, id, locale) => {
  if (groups.length > 0) {
    const item = groups.find((g) => g.id == id);
    return (item || {}).nameUz || "";
  }
  return "";
};
export const getGroup = (id, groups) => {
  const group = groups.find((x) => x.id === id);
  console.log(group)
  if (!group) {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].child.length > 0) {
        let item = groups[i].child.find((x) => x.id === id);
        if (!!item) return item;
      }
    }
    return {};
  }
  return group;
};
