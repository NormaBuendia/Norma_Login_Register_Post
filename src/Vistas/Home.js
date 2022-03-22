import { authGoogle } from '../Rutas/firebase.js';

export const Home = () => {
    window.location.hash = '/home';
    const divHome = document.createElement("div");
    
    divHome.className = 'div';
    divHome.innerHTML = ` 
    <div class="container">
    <div class="bg-screen">
      <div class="bg-screen-content">
      
          <form class="login">
              <h2>Bienvenidos!</h2>
                <div class="login-field">
                    <i class="login-icon fas fa-user"></i>
                    <input type="text"  class="login-input" placeholder="Email" required>
                </div>
                <div class="login-field">
                  <i class="login-icon fas fa-lock"></i>
                  <input type="password" name="pasword" id = "password" class="login-input" placeholder="Password" required>
                  
                </div>
                <button class="login-submit">
                <a  href="#/muro">Login</a>
                <i class="button-icon fas fa-chevron-right"></i>
              </button>
              <div class="containerResetPassword"><h3 id="resetPassword" class="resetPassword"> ¿Has olvidado tu contraseña?</h3></div>
              <button class="login-submit">
                  <a href="#/register">Registrarse</a>
                  <i class="button-icon fas fa-chevron-right"></i>
                </button>

                <!--POPUP -->
            <div class ="overlay" id="overlay">

            
                <div class ="forgotPopUp" id="forgotPopUp">
                      <div class ="close-forgotPopUp" id="close-forgotPopUp"><a href="#" class="fas fa-house-user fa-1x"></a>
                        </div>
                          <div class = "forgotText" id="forgotText">
                            <h3>OLVIDASTE TU CONTRASEÑA</h3>
                            <h4>Enviaremos un email a tu correo para recuperar contraseña</h4>
                          </div>
                      <div class="login-input">
                        <label for ="ingresa tu email">Ingresa tu email</label>
                          <input type="ingresa tu email" placeholder="ingresa tu email" 
                            name ="ingresa tu email" id="ingresa tu email">
                            <button class="login-submit">
                            <a href="#/register">Registrarse</a>
                            <a href="#" class="fas fa-chevron-right"></a>
                            </button>      
                      </div>
              </div>


              
            </div>

            </form>
          <div class="social-login">
              <h3>Registrarse con</h3>
              <div class="social-icons">
              
                <a href="#" class="social-icon fab fa-instagram"></a>
                <a href="#" class="social-icon fab fa-facebook"></a>
                <i href="#" id="google" class="social-icon fab fa-google"></i>
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
  `
  divHome.querySelector('#google').addEventListener('click', () => {
   
  authGoogle();
      
      });
  divHome.querySelector('#resetPassword').addEventListener('click', () => {
  const overlay = document.querySelector(".overlay");
  //se busca y selecciona el elemento con clase overlay
  const forgotPopUp = document.querySelector(".forgotPopUp");
  //se selecciona el elemento con id
  const button = document.getElementById("ingresa tu email");
  // se busca selecciona al elemento con la clase
  const close = document.querySelector(".close-forgotPopUp");
  
    forgotPopUp.style.display = "block";
    overlay.style.display = "block";
    close.style.display = "block";
    // se crea el evento cuando el boton hace click
    button.addEventListener('click', () => {
      forgotPopUp.style.display = "none";
      overlay.style.display = "none";
  });
  close.addEventListener('click', () => {

    overlay.style.display = "none";
    forgotPopUp.style.display = "none";
  });

});


  return divHome;

};


         