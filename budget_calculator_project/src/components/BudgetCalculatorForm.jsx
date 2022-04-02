import { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

function BudgetCalculatorForm() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginTop: 80, marginLeft: 50 }}>
        Budget Calculator
      </Button>

      {/*using dialog from material ua to show the list of the items in*/}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <tbody>
          {items.map(item => (
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.lowPrice}</td>
              <td>{item.highPrice}</td>

            </tr>
          ))}
        </tbody>
      </Dialog>
    </div>

  );
}

export default BudgetCalculatorForm;