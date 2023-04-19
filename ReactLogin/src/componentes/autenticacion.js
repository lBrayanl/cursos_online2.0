import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function AuthenticatedContent() {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token de acceso almacenado
    if (token) {
      // Si el token está presente, enviar una solicitud al servidor para verificar su validez
      fetch("/api/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // Si el token es válido, establecer el estado de autenticación como verdadero
            setAuthenticated(true);
          } else {
            // Si el token no es válido, redirigir al usuario a la página de inicio de sesión
            history.push("/login");
          }
        })
        .catch((error) => {
          console.error(error);
          // Si hay un error al verificar el token, redirigir al usuario a la página de inicio de sesión
          history.push("/login");
        });
    } else {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      history.push("/login");
    }
  }, []);

  if (authenticated) {
    // Mostrar el contenido autenticado
    return <div>Contenido autenticado</div>;
  } else {
    // Mostrar un mensaje de carga mientras se verifica la información de autenticación
    return <div>Cargando...</div>;
  }
}