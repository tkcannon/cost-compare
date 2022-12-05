export function idbPromise(method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("cost-compare", 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("groups", { keyPath: "name" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction("groups", "readwrite");
      store = tx.objectStore("groups");

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          if (object.length) {
            for (let i = 0; i < object.length; i++) {
              console.log(object[i]);
              store.put(object[i]);
            }
          } else {
            console.log(object);
            store.put(object);
          }
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object.group);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
