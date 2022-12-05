import { useEffect, useState } from "react";
import "./App.css";
import Group from "./Components/Group";
import { idbPromise } from "./utils/idb";

function App() {
  const [newName, setNewName] = useState({ name: "" });
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    if (!groups.length) {
      idbPromise("get").then((res) => {
        setGroups(res);
      });
    }
  });

  const handleChange = ({ target }) => {
    console.log(target);
    const { name, value } = target;
    setNewName({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newName);
    idbPromise("put", { ...newName, items: [] });
  };

  return (
    <div className="App">
      {groups.length ? (
        <div>
          <h2>{groups[activeGroup].name}</h2>
          <Group group={groups[activeGroup]} />
        </div>
      ) : (
        <form>
          <h2>No Groups Found Create a New One</h2>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder={newName.name}
            onChange={handleChange}
          ></input>
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
