import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";

function WordCloud() {
  const [wordList, setWords] = useState(null);
  const url = "https://ass-4ikbgrxxmq-de.a.run.app/wordList";

  useEffect(() => {
    async function fetchUserData() {
      const response = await axios.get(url);
      let json = JSON.parse(
        JSON.stringify(response.data).split('"score":').join('"value":')
      );
      setWords(json);
    }
    fetchUserData();
  }, []);

  //   let json = JSON.parse(JSON.stringify(wordList).split('"score":').join('"value":'));

  return <div>{wordList && <ReactWordcloud words={wordList} />}</div>;
}

export default WordCloud;
