import "./styles.css";
import Item from "../Item";
import { useState } from "react";
import { idbPromise } from "../../utils/idb";

function Group({ group }) {
  const [newItem, setNewItem] = useState({
    name: "",
    unit: "",
    uses: 0,
    price: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newItem.name) {
      return;
    }
    const existingItem = group.items.filter((item) => {
      return item.name === newItem.name;
    });
    if (!existingItem.length) {
      group.items.push(newItem);
      idbPromise("put", group);
    }
    setNewItem({
      name: "",
      unit: "",
      uses: 0,
      price: 0,
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>item</th>
            <th>units</th>
            <th>price</th>
            <th>uses</th>
            <th>cost per use</th>
          </tr>
        </thead>
        <tbody>
          {group.items.length ? (
            group.items.map((item, i) => {
              return (
                <tr key={i}>
                  <td key={i}>{item.name}</td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <h3>Add an Item</h3>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>Name</label>
        <input name="name" type="text" onChange={handleChange}></input>
        <label>Unit</label>
        <input name="unit" type="text" onChange={handleChange}></input>
        <label>Price</label>
        <input name="price" type="number" onChange={handleChange}></input>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </>
  );
}

export default Group;
