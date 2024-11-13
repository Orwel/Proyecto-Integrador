import React, { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Switch, Tooltip } from "@nextui-org/react";
import { useUsers } from "../hook/use-users";


const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  1: "success",  // rol 1
  2: "warning",  // rol 2
};

export const AdministrarUsuario = () => {
  const { users, loading, error, handleUpdateUser } = useUsers();

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "";
  };

  const handleRoleToggle = async (user) => {
    const newRoleId = user.role_id === 1 ? 2 : 1;  // Cambiar rol entre 1 y 2
    await handleUpdateUser(user.id, { role_id: newRoleId });
  };

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <span className="avatar">{getInitials(user.first_name)}</span>
            <span className="user-name">{user.first_name} {user.last_name}</span>
          </div>
        );
      case "role":
        return (
          <Chip color={statusColorMap[user.role_id]} size="sm" variant="flat">
            {user.role_id === 1 ? "Admin" : "User"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Toggle role">
              <Switch
                checked={user.role_id === 2}
                onChange={() => handleRoleToggle(user)}
              />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleRoleToggle]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <Table aria-label="User management table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
