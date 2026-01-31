export const getColor = (value: number) => {
  switch (value) {
    case 1:
      return '#FF4D4F';
    case 2:
      return '#FFA500';
    case 3:
      return '#FFC107';
    case 4:
      return '#8BC34A';
    case 5:
      return '#4CAF50';
    default:
      return '#ccc';
  }
};
