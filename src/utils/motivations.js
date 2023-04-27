export const displayMotivation = () => {
  const quotes = [
    '"Believe you can and you\'re halfway there." — Theodore Roosevelt',
    '"Don\'t let yesterday take up too much of today." — Will Rogers',
    '"It is never too late to be what you might have been." - George Eliot',
    '"Do the best you can. No one can do more that that." - John Wooden',
    '"If you can dream it, you can do it." - Walt Disney',
    '"Do what you can, with what you have, where you are." - Theodore Roosevelt',
    '"Don\'t look at your feet to see if you are doing it right. Just dance." - Anne Lamott',
    '"The only one who can tell you "you cant win" is you and you don\'t have to listen." - Jessica Ennis',
    '"Set your goals high, and don\'t stop till you get there." - Bo Jackson',
    '"Take your victories, whatever they may be, cherish them, use them, but don\'t settle for them" - Mia Hamm',
  ];
  const index = (Math.random() * 9).toFixed(0);
  return quotes[index];
};
