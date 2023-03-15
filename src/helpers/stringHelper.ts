const stringHelper = {
  capitolize(str: string) {
    if (str) {
      const words = str.split(" ");
      return words
        .map((word) => {
          const arr = word.toLowerCase().split("");
          arr[0] = arr[0] ? arr[0].toUpperCase() : "";
          return arr.join("");
        })
        .join(" ");
    }
  },
};

export default stringHelper;
