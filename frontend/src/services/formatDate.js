const formatDate = (string) => {
  const date = new Date(string).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return date;
};

export default formatDate;
