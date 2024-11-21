import React, { useCallback, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Switch, Tooltip } from "@nextui-org/react";
import { useUsers } from "../hook/use-users";
import { ModalConfirmation } from "./modalConfirmation";
import { useDisclosure } from "@nextui-org/modal";


const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  1: "danger",
  2: "success",
};

export const AdministrarUsuario = () => {
  const { users, loading, error, handleUpdateUser } = useUsers();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "";
  };

  const openConfirmationModal = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const confirmRoleToggle = async () => {
    if (selectedUser) {
      const newRoleId = selectedUser.role_id === 1 ? 2 : 1;
      await handleUpdateUser(selectedUser.id, { role_id: newRoleId });
      setSelectedUser(null);
      onOpenChange(false);
    }
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
            {user.role_id === 1 ? "Usuario" : "Administrador"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Toggle role">
              <Switch
                defaultSelected={(user.role_id === 2 ? true : false)}
                checked={user.role_id === 2}
                onChange={() => openConfirmationModal(user)}
              />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [openConfirmationModal]);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error Cargando usuarios: {error.message}</p>;

  return (
    <>
      <Table className="desktop-only" aria-label="User management table">
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
      <ModalConfirmation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        type="permiso"
        onConfirm={confirmRoleToggle}
        role_id={selectedUser?.role_id} />
    </>

  );
};
