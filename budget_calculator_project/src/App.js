import { useEffect } from "react";
import './App.css';
import { db } from "./components/Firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {

  //assigning the items collection from the database to variable
  const itemsCollectionRef = collection(db, "items");

  //querying the database with an api call
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef)
      console.log(data);
    };

    getItems();
  })

  return (
    <div className="App"></div>
  );
}

export default App;
