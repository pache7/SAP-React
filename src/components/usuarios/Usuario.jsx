import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const PerfilUsuario = ({ user_name , user_apellido,user_telefono,user_email,userRol}) => { 
  const [avatars, setAvatars] = useState([]);
  const [datos,setDatos] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`https://api.dicebear.com/8.x/personas/svg?seed=${user_name}`);
        const avatarUrl = response.config.url;
        setAvatars([{ username: user_name, avatarUrl }]); 
        setDatos([{nombre: user_name, apellido:user_apellido, telefono:user_telefono, email:user_email, rol: userRol}])
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    if (user_name) { 
      fetchAvatars();
    }
  }, [user_name],[user_apellido],[user_telefono],[user_email],[userRol]);

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      
        {avatars.map((avatar, index) => (
          <div key={index}>
            <img src={avatar.avatarUrl} alt={avatar.username} style={{width:'300px',height:'300px'}} />

          </div>
        ))}
         <div>
            <br />
            <h2> Datos del Usuario </h2>
            <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                {datos.map((dato, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dato.nombre}</td>
                    <td>{dato.apellido}</td>
                    <td>{dato.telefono}</td>
                    <td>{dato.email}</td>
                    <td>{dato.rol}</td>
                </tr>
                ))}
            </tbody>
            </Table>
            </div>
   
    </div>
  );
};

export default PerfilUsuario;
