import { useEffect, useState } from "react";
import "./App.css";

import { mergeMap, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";

function renderUser(user) {
  return (
    <li>
      <p>Name: {user.name}</p>
      <p>@: {user.email}</p>
      <p>
        Address: {user.address.street} {user.address.suite}, {user.address.city}
      </p>
    </li>
  );
}

function App() {
  const [users, setUsers] = useState(null);

  const users$ = fromFetch("https://jsonplaceholder.typicode.com/users").pipe(
    mergeMap((response) => response.json()),
    map((res) => {
      console.log(res);
      return res;
    }),
    map((response) => response.map((user) => renderUser(user)))
  );
  const observer = {
    next: (value) => setUsers(value),
    error: (err) => console.log(err),
    complete: () => console.log("done")
  };

  useEffect(() => {
    const subscription = users$.subscribe(observer);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <h1>Hello mordko!</h1>
      <ul>{users}</ul>
    </>
  );
}

export default App;
