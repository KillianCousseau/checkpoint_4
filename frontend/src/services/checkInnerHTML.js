const checkInnerHTML = (string) => {
  if (string.includes("</")) {
    return "No description available.";
  }
  return string;
};

export default checkInnerHTML;
