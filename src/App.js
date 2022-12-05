import { useEffect, useState } from "react";
import "./App.css";
import Group from "./Components/Group";
import { idbPromise } from "./utils/idb";

function App() {
  const [newGroup, setNewGroup] = useState({ name: "", unit: "" });
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(0);
  const [updateGroups, setUpdateGroups] = useState(true);

  useEffect(() => {
    if (updateGroups) {
      idbPromise("get").then((res) => {
        setGroups(res);
      });
      setUpdateGroups(false);
    }
  }, [updateGroups]);

  const handleChange = ({ target }) => {
    console.log(target);
    const { name, value } = target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGroups([{ ...newGroup, items: [] }]);
    idbPromise("put", { ...newGroup, items: [] });
  };

  return (
    <div className="App">
      {groups.length ? (
        <div>
          <h2>{groups[activeGroup].name}</h2>
          <Group
            group={groups[activeGroup]}
            setUpdateGroups={setUpdateGroups}
          />
        </div>
      ) : (
        <form>
          <h2>No Groups Found Create a New One</h2>
          <label>Name</label>
          <input name="name" type="text" onChange={handleChange}></input>
          <label>unit</label>
          <input name="unit" type="text" onChange={handleChange}></input>
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
