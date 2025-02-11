// role.model.ts
export interface Access {
  id: number;
  name: string;
}

export interface Module {
  id: number;
  name: string;
  accesses: Access[];
}

export interface Role {
  id: number;
  name: string;
  modules: Module[];
}

interface RoleResponse {
  FinalMode?: string; // "INSERT" or "UPDATE"
  Message?: string | null;
}
