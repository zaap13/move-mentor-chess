import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function useUser() {
  const { userData: user } = useContext(UserContext) ?? {};

  console.log(user.user);
  return user.user;
}
