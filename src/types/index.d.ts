import { UserInterface } from "../api/components/auth/interfaces";

// extend express User type
declare global {
  namespace Express {
    interface User extends UserInterface {}
  }
}
