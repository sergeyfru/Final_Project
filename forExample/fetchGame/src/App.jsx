import { useState, useEffect } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import "./App.css";

const options = {
  ignoreAttributes : false
};
const parser = new XMLParser(options)

function App() {
  const [xml, setXml] = useState();
  const [game, setGame] = useState()

  /**
   * add a state variable to store the XML data
   * and set the initial value to an empty string
   */
  

  useEffect(() => {
    fetchXML()
  }, []);

  const fetchXML = async () => {
    try {
      const response = await axios.get(
        "https://api.geekdo.com/xmlapi2/thing?id=6606"
      );
      let xmldata = parser.parse(response.data);
      console.log(xmldata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

        
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;