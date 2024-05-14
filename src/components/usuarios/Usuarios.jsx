import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, editUser } from '../../services/controllerServices';
import { useUserStore } from '../../store/userStore';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UsuariosRegistrados = () => {
  const [editedUser, setEditedUser] = useState(null);
  const { users, setUserList } = useUserStore();
  const MySwal = withReactContent(Swal);


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getAllUsers();
        setUserList(usuariosData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const showConfirmation = (id) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        handleDeleteUser(id);
        MySwal.fire(
          'Eliminado',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);

      const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(updatedUsuarios);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditButtonClick = (usuario) => {
    setEditedUser(usuario);
    MySwal.fire({
      title: 'Editar Usuario',
      html: (
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" defaultValue={usuario.nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" name="apellido" defaultValue={usuario.apellido} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" defaultValue={usuario.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>telefono</Form.Label>
            <Form.Control type="text" name="telefono" defaultValue={usuario.telefono} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Select>
              <option>Seleccionar</option>
              <option value="admin">Admin</option>
              <option value="consulta">Consulta</option>
              <option value="vendedor">Vendedor</option>
              <option value="gerente">Gerente</option>
              <option value="atencion_cliente">Atención al cliente</option>
            </Form.Select>
          </Form.Group>
        </Form>
      ),
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        handleEditUser(usuario);
      }
    });
  };

  const handleEditUser = async (editedUser) => {
    try {
      if (!editedUser) {
        throw new Error('No se ha seleccionado ningún usuario para editar.');
      }

      await editUser(editedUser.id, editedUser);
      MySwal.fire(
        'Guardado',
        'Los cambios han sido guardados correctamente.',
        'success'
      );
    } catch (error) {
      console.error('Error editing user:', error);
      MySwal.fire(
        'Error',
        'No se pudieron guardar los cambios. Por favor, inténtalo de nuevo.',
        'error'
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            {users.some(usuario => usuario.rol === 'admin') && (
              <th>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              {usuario.rol === 'admin' && (
                <td></td>
              )}
              {usuario.rol !== 'admin' && (
                <td>
                  <button onClick={() => handleEditButtonClick(usuario)} className="btn btn-secondary">Editar</button>
                  <button onClick={() => showConfirmation(usuario.id)} className="btn btn-danger">Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  
};

export default UsuariosRegistrados;
