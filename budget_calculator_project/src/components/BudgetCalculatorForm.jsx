import { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

function BudgetCalculatorForm() {

  //using useState to hold the list of the items
  const [items, setItems] = useState([]);

  //assigning the items collection from the database to variable
  const itemsCollectionRef = collection(db, "items");

  //querying the database with an api call
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef)
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, [])

  return (
    <div className="App">
      {items.map((item) => {
        return (
          <div>
            <h3>Type: {item.type}</h3>
            <h3>Name: {item.name}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default BudgetCalculatorForm;