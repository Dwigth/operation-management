import { UserRoles } from '@operation-management/database';

export function matchRoles(roles: string[], userRoles: UserRoles[]) {
  const userRolesArr = userRoles.flatMap((usrRole) => usrRole.role.name);
  const role = roles.filter((r) => userRolesArr.includes(r));
  if (role && role.length > 0) return true;
  return false;
}
