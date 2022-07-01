
import {router} from './Rutas/routes.js';


window.addEventListener('load', () => {
    
    // devuelve el fragmento de URL del objeto de ubicación (incluye # inicial si no está vacío)
    //carga la pagina
    router(window.location.hash );

    window.addEventListener('hashchange', () => {
    router(window.location.hash);
    
});

});
