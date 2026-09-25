export type RoleScreenTarget = 'MainTabs' | 'Manager' | 'Admin' | 'SuperAdmin';

/**
 * Normalizes role string search (case-insensitive substring check)
 */
const hasMatchingRole = (roles: string[] = [], target: string): boolean => {
    if (!Array.isArray(roles)) return false;
    return roles.some(r => typeof r === 'string' && r.trim().toUpperCase().includes(target.toUpperCase()));
};

/**
 * Checks if user explicitly has Super Admin role
 */
export const isSuperAdminRole = (roles: string[] = []): boolean => {
    return hasMatchingRole(roles, 'SUPER');
};

/**
 * Checks if user explicitly has Admin role
 */
export const isAdminRole = (roles: string[] = []): boolean => {
    return hasMatchingRole(roles, 'ADMIN');
};

/**
 * Checks if user explicitly has Manager role
 */
export const isManagerRole = (roles: string[] = []): boolean => {
    return hasMatchingRole(roles, 'MANAGER');
};

/**
 * Checks if user explicitly has Employee role (or default if no roles specified)
 */
export const isEmployeeRole = (roles: string[] = []): boolean => {
    if (!roles || roles.length === 0) return true;
    return hasMatchingRole(roles, 'EMPLOYEE');
};

/**
 * Checks if user can access Admin Dashboard (Requires Admin or Super Admin role)
 */
export const canAccessAdminDashboard = (roles: string[] = []): boolean => {
    return isAdminRole(roles) || isSuperAdminRole(roles);
};

/**
 * Checks if user can access Manager Dashboard / My Team (Requires explicit Manager role)
 */
export const canAccessManagerDashboard = (roles: string[] = []): boolean => {
    return isManagerRole(roles);
};

/**
 * Checks if user can access Employee Workspace (Requires Employee or Manager role)
 */
export const canAccessEmployeeWorkspace = (roles: string[] = []): boolean => {
    if (!roles || roles.length === 0) return true;
    return isEmployeeRole(roles) || isManagerRole(roles);
};

/**
 * Checks if user is ONLY an employee (no Manager or Admin/Super Admin permissions)
 */
export const isEmployeeOnly = (roles: string[] = []): boolean => {
    return (
        !isManagerRole(roles) &&
        !isAdminRole(roles) &&
        !isSuperAdminRole(roles)
    );
};

/**
 * Returns a human-friendly primary role display name
 */
export const getPrimaryRoleDisplayName = (roles: string[] = []): string => {
    if (isSuperAdminRole(roles)) return 'Super Admin';
    if (isAdminRole(roles)) return 'Admin';
    if (isManagerRole(roles)) return 'Manager';
    if (isEmployeeRole(roles)) return 'Employee';
    if (roles && roles.length > 0) return roles[0];
    return 'Employee';
};

/**
 * Determines the initial screen route based on user roles
 */
export const getInitialRoleRoute = (roles: string[] = []): RoleScreenTarget => {
    if (canAccessAdminDashboard(roles)) {
        return 'Admin';
    }
    if (canAccessManagerDashboard(roles)) {
        return 'Manager';
    }
    return 'MainTabs';
};
