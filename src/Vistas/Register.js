import { newRegister } from '../Rutas/firebase.js';
export const register = () => {
    window.location.hash = '/register';
    const divRegister = document.createElement('div');
    divRegister.className = 'div';
    divRegister.innerHTML= ` 
    <div class="container">
      <div class="bg-screen">
        <div class="bg-screen-content">
            <div class='logOut-container'>
              <a  id="logOut" href="#" class="logOut fas fa-house-user fa-1x"> Salir </a>
            </div>
            <form class="login">
              <h2>Registrarse</h2>
                <div class="">
                  <spam class="login_displayNone" id="registerEmailInUse">Este correo ya se encuentra en uso</spam>
                  <spam class="login_displayNone" id="missinEmail">Ingresa un correo</spam>
                  <spam class="login_displayNone" id="loginEmailNull">Este correo no es válido</spam>
                </div>
                <div class="login-field">
                  <i class="login-icon fas fa-user"></i>
                  <input type="text" id="userName" class="login-input " placeholder="userName" required>
                </div>
                <div class="login-field">
                  <i class="login-icon fas fa-envelope"></i>
                  <input type="email" id ="email"class="login-input" placeholder="Email" required>
                </div>
                <div class="login-field">
                  <i class="login-icon fas fa-lock"></i>
                  <!-- <span class="iconEye fas fa-unlock" id="passwordLogin"></span> -->
                  <input type="password" id ="password"class="login-input" placeholder="Password" required>
                </div>
                <button class="login-submit">
                  <a href="" id ="register">Registrarse</a>
                  <i class="button-icon fas fa-chevron-right"></i>
                </button>
            </form>
            <div class="social-login">
              <div class="social-icons">
                <a href="#" class="social-icon fab fa-instagram"></a>
                <a href="#" class="social-icon fab fa-facebook"></a>
                <a href="#" class="social-icon fab fa-google"></a>
              </div>
            </div>
        </div>
        <div class="screen-background">
            <span class="screen-bg
            screen-bg3"></span>
            <span class="screen-bg
            screen-bg2"></span>
            <span class="screen-bg
            screen-bg1"></span>
        </div>
      </div>
    </div>
    `;
    // se busca el el id register, se le agrega el evento , cuando hace click lo primero que va a 
    //hacer es recibir este objeto e
    divRegister.querySelector('#register').addEventListener('click', (e) => {
      // lo primero que va a hacer es cancelar el evento por defecto
      // que es refrescar la pagina, que el formulario no va apoder refresac
      //la pagina y voy a poder continuar con el codigo que continua
      e.preventDefault(); 
    const userName = document.querySelector('#userName').value;  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    console.log(userName)
    
    newRegister( email, password,userName); 
    });


  return divRegister;
  

};
