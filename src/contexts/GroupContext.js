import { useState, createContext } from "react";

const GroupContext = createContext();

const GroupProvider = (props) => {
  const [group, setGroup] = useState(null);
  // the state that we'll be storing the username into

  /* because we will be providing an object to the provider, it is better to put the value inside a useMemo so that the component will only re-render when there's a change in the value. */
  return (
    <GroupContext.Provider value={{ group, setGroup }}>
      {props.children}
    </GroupContext.Provider>
  );
};
export { GroupContext, GroupProvider };
