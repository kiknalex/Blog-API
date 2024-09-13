import {$Enums} from "@prisma/client";

export type UserWithoutPassword = {
  // User model with omited password
  id: number;
  username: string;
  role: $Enums.Role;
};
