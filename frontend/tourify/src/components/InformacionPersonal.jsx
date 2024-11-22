import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { useAuth } from '../context/AuthContext';  // Asegúrate de que el contexto esté importado

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "EMAIL", uid: "email" },
];

const statusColorMap = {
  "Admin": "success",
  "User": "warning",
};

export const InformacionPersonal = () => {
  // Obtenemos el userInfo desde el contexto de autenticación
  const { userInfo } = useAuth();

  // Verificamos si el usuario está logueado
  if (!userInfo) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="desktop-only" style={{ flex: 1, padding: "20px" }}>
      <Table aria-label="Tabla de información del usuario">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "role" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={[userInfo]}>
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "name" ? (
                    `${user.first_name} ${user.last_name}`
                  ) : columnKey === "role" ? (
                    <Chip color={statusColorMap[user.role_id === 2 ? "Admin" : "User"]} size="sm" variant="flat">
                      {user.role_id === 2 ? "Administrador" : "Usuario Normal"}
                    </Chip>
                  ) : (
                    user[columnKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InformacionPersonal;