import { useContext, useState } from "react";
import Context from "./Context";

export const useStore = () => {
    const [state, dispatch] = useContext(Context)
    return [state, dispatch]
}

export function useAuth() {
  const [state, dispatch] = useStore()
  const [authed, setAuthed] = useState(
    state.user._id
  );
  console.log(authed);

  // return {
  //   authed,
  //   login() {
  //     return new Promise((res) => {
  //       setAuthed(true);
  //       res();
  //     });
  //   },
    // logout() {
    //   return new Promise((res) => {
    //     setAuthed(false);
    //     res();
    //   });
    // },
  // };
}