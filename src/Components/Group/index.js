import "./styles.css";
import Item from "../Item";
import { useEffect, useState } from "react";
import { idbPromise } from "../../utils/idb";

function Group({ group, setUpdateGroups }) {
  const [newItem, setNewItem] = useState({
    name: "",
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
      setUpdateGroups(true);
    }
    setNewItem({
      name: "",
      uses: 0,
      price: 0,
    });
  };

  const updateItem = (item) => {
    console.log(item);
    const updatedItems = group.items.map((groupItem) => {
      if (groupItem.name === item.name) {
        console.log("found");
        console.log(item);
        return item;
      }
      return groupItem;
    });
    idbPromise("put", { ...group, items: updatedItems });
    setUpdateGroups(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>item</th>
            <th>price</th>
            <th>uses</th>
            <th>units</th>
            <th>cost per use</th>
          </tr>
        </thead>
        <tbody>
          {group.items.length ? (
            group.items.map((item, i) => {
              return (
                <Item
                  item={item}
                  unit={group.unit}
                  update={updateItem}
                  key={i}
                />
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
        <input
          name="name"
          type="text"
          value={newItem.name}
          onChange={handleChange}
        ></input>
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={newItem.price}
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </>
  );
}

export default Group;
