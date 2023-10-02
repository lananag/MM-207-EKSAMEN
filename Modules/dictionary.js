async function getLanguageData(language){
  try {
      let languageData = require("./language/" + language + ".json");
      return languageData;
  } catch (e) {
      return {error: "An error has occurred"};
  }
};

module.exports = getLanguageData;