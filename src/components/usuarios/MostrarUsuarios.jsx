import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'; 
import { editUser } from '../../services/controllerServices';
import Modal from 'react-bootstrap/Modal';

function UserDetailModal() {
  const [show, setShow] = useState(true);
  const { register, handleSubmit } = useForm();

  const handleClose = () => setShow(false);

  const onSubmit = (data) => {
    console.log(data.id); 
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}> 
          <Form.Group className='mb-3'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type='text' placeholder='Apellido' {...register("apellido", { required: true })}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' placeholder='Nombre' {...register("nombre",{ required: true })}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>DNI</Form.Label>
            <Form.Control type='text' placeholder='DNI' {...register("dni",{ required: true })}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type='text' {...register("telefono")}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select {...register("rol")}>
              <option>Seleccionar</option>
              <option value="admin">Admin</option>
              <option value="consulta">Consulta</option>
              <option value="vendedor">Vendedor</option>
              <option value="gerente">Gerente</option>
              <option value="atencion_cliente">Atención al cliente</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Estoy de acuerdo con las políticas de la empresa" 
              {...register("acuerdo", { required: true })}/>
          </Form.Group>
          <Button variant="primary" type="submit">Guardar Cambios</Button> 
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailModal;
