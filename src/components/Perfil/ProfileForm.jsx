import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';
import { useSelector } from 'react-redux';

function ProfileForm() {
  const user = useSelector((state) => state.client?.client);
  const defaultProfileImage = 'https://cdn-icons-png.flaticon.com/128/1946/1946392.png';

  const [photo, setPhoto] = useState(user?.photo || defaultProfileImage);
  const [userCranes, setUserCranes] = useState([]);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto ? URL.createObjectURL(selectedPhoto) : defaultProfileImage);
  };

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3000/userCranes/${user.id}`)
        .then((response) => {
          setUserCranes(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener las grúas del usuario:', error);
        });
    }
  }, [user?.id]);

  return (
    <section className='section-perfil'>
      <div className="profile-editor">
        <div className="prteProfile1">
          <div className="tituloEditar">
            <h2>Editar perfil</h2>
          </div>

          <div className="containerFotoProfile">
            <img className="profile-photo" src={photo} alt="Perfil" />
            <div className="option-cambiar">
              <label className='labelCambiarfoto' htmlFor="photo">Cambiar foto</label>
              <input className='input-cambiar' type="file" name="photo" id="photo" onChange={handlePhotoChange} />
            </div>
          </div>

          <div className="infoProfile">
            <div className="form-group">
              <label className='labelUser' htmlFor="user">Usuario:</label>
              <input
                className='input-user'
                type="text"
                name="user"
                id="user"
                value={user?.user ?? "undefined"}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className='labelPhone' htmlFor="phone">Teléfono:</label>
              <input
                className='input-phoneNumber'
                type="text"
                name="phone"
                id="phone"
                value={user?.phone ?? "undefined"}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className='labelCorreo' htmlFor="email">Correo-e:</label>
              <input
                className='input-email'
                type="email"
                id="email"
                value={user?.email ?? "undefined"}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="user-cranes">
          <h3>Grúas Publicadas:</h3>
          <div className="gruas-list">
            {userCranes.map((grua) => (
              <div key={grua.id} className="grua-card">
                <h4>{grua.marca}</h4>
                <p>Modelo: {grua.modelo}</p>
                <p>Capacidad: {grua.capacidad}</p>
                <p>Ubicación: {grua.ubicacion}</p>
                {/* Otros detalles de la grúa si es necesario */}
              </div>
            ))}
          </div>
        </div>

        <div className="botonProfile">
          <button className='botonEnviar'>Enviar</button>
        </div>
      </div>
    </section>
  );
}

export default ProfileForm;
