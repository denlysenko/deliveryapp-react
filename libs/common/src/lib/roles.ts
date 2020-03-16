export enum Roles {
  CLIENT = 1,
  MANAGER,
  ADMIN
}

export const roleNames = {
  [Roles.CLIENT]: 'Client',
  [Roles.MANAGER]: 'Manager',
  [Roles.ADMIN]: 'Admin'
};
