const {
  TICKET_PERMISSION,
  CHECK_IN_PERMISSION,
  REPORT_PERMISSION,
} = require("./permission");

export const USER = {
  name: "user",
  permissions: [TICKET_PERMISSION, CHECK_IN_PERMISSION],
};

export const ADMIN = {
  name: "admin",
  permissions: [TICKET_PERMISSION, CHECK_IN_PERMISSION, REPORT_PERMISSION],
};
export const ROLES = [USER, ADMIN];
