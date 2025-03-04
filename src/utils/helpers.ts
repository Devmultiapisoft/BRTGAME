export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 1000) + 100;
};

export const generateRandomUserName = (): string => {
  const names = ['John', 'Jane', 'Mike', 'Sarah', 'David'];
  return names[Math.floor(Math.random() * names.length)];
};

export const generateRandomImageURL = (): string => {
  return `https://picsum.photos/200/200?random=${Math.random()}`;
}; 