import { useState } from "react";

function Item({ item, unit, update }) {
  const [edit, setEdit] = useState(false);
  const [changedItem, setChangedItem] = useState(item);
  if (!item.name) {
    return <></>;
  }

  const costPerUse = item.price / item.uses;

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setChangedItem({ ...changedItem, [name]: value });
  };

  const handleUpdate = () => {
    update(changedItem);
    toggleEdit();
  };

  return (
    <tr>
      <td>{item.name}</td>
      {edit ? (
        <>
          <td>
            <input
              name="price"
              value={changedItem.price}
              onChange={handleChange}
              onBlur={handleUpdate}
            ></input>
          </td>
          <td>
            <input
              name="uses"
              value={changedItem.uses}
              onChange={handleChange}
              onBlur={handleUpdate}
            ></input>
          </td>
        </>
      ) : (
        <>
          <td onClick={toggleEdit}>{item.price}</td>
          <td onClick={toggleEdit}>{item.uses}</td>
        </>
      )}
      <td>{unit}</td>
      <td>{costPerUse}</td>
    </tr>
  );
}

export default Item;
