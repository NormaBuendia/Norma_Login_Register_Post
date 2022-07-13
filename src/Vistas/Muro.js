
import { auth, logOut} from "../Rutas/firebase.js";
import { saveTask, deleteTask, editTask, likePost} from "../Rutas/firestore.js"
import { getTasks, onGetTasks, getTask} from "../Rutas/firestore.js"



export const muro = () => {
// devuelve el fragmento de URL del objeto de ubicación (incluye # inicial si no está vacío)
  window.location.hash = '/muro';
  //crea un elemento HTML con un tag name DIV
 const divMuro = document.createElement('div');
 let id = '';
  divMuro.className = 'div';
  //imprimimos el html
  divMuro.innerHTML= `
  <div class="container">
    <div class="bg-screen">
        <div class='logOut-container'>
          <a  id="logOut" href="#" class="logOut fas fa-house-user fa-1x"> Salir 
          </a>
        </div>
        <div class='post-open-container'>
          <button class='btn post-open' id='post-open' type='button'> ¿Quieres postear? </button>
        </div> 
        <div class="form-container hidden" id="form-container">
          
         <form class='post-form 'id="post-form">
           <h2 class='title-muro'> QUE VAS A HACER HOY!</h2>
              <label for="title" class="login-muro"> Actividad </label>
                <input type="text" name="title" id="title" placeholder="Coloca una Tarea">
              <label for="content" class="login-muro"> Contenido </label>
                <textarea name="content" id="content" cols="30" rows="3" placeholder="Escribe un contenido"></textarea>
                <button id="btn-form" class="btn-form">Enviar</button>
         </form>
        
        </div>
        <div id="task-container" class="task-container"></div>
        </div>
  </div>
    
`
//seleccionamos el div con el task container
// cada vez que se recorra un dato, voy a generar una especie de
// interfaz y voy a colocarlo dentro del task container

  const taskContainer = divMuro.querySelector('#task-container')
  const form = divMuro.querySelector('#post-form')
  // una variable editStatus que va a estar al inicio en false y que cambie
  // luego a true.. es el estado de editar
  let editStatus = false;
  
  divMuro.querySelector('#post-open').addEventListener('click', (e)=> {
    e.preventDefault()
    console.log('alo')
    divMuro.querySelector('#form-container').classList.toggle("hidden");
    // window.scrollTo({ top: 0, behavior: 'smooth' }) 
  })
  divMuro.querySelector('#logOut').addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
  });
  
  // lo declaro un string vacio para que luego se llene
  
  //window.addEventListener('DOMContentLoaded', () =>{
   //para iniciar ,si divmuro no es igual a vacio, 
 if (divMuro != ''){
     
      // voy a recorrer uno a uno los datos
      // OnGetTasks, que es tiempo real
      // y este es el callback, cuando exista un cambio yo necesito mandarte los 
      //nuevos datos
     onGetTasks((post)=> {
       console.log('hello')
       // un string vacio, cada vez que se recorra voy a estar añadiendo
       // cada vez que se recorra voy a estar agregandole contenido
         // una constante con un string vacio 
       let html = ''
          // cada vez que se recorra un dato voy a colocar dentro de el task container voy a colocarle un string vacio
          taskContainer.innerHTML = '' 
         // voy a recorrer uno a uno esos datos
          post.forEach(doc => {
            //una variable donde se van a guardar los datos de doc
            // doc.data es el objeto que tiene description y title
            //doc.data()va trasformar los datos de firebase en un objeto
              const postData = doc.data();
       // le voy a agregar un html
               html += `
              <div class="post">
                  <p>Bienvenidx<br><span></span></p>
                  <p class='user-name'>${postData.userName} publicó: </p>
                  <h3 id='title'> ${postData.title} </h3>
                  <p id='description'> ${postData.description} </p>
                <div class='btn-delete-edit'>
                  <button class="btn-delete"  data-id="${doc.id}"> Delete </button>
                  <button class="btn-edit" data-id="${doc.id}"> Edit </button>
                </div>
                <div class="likes"> 
                  <button  class="btn-like" value=${doc.id}>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm4.186 10.74L12 16.926L7.814 12.74a2.745 2.745 0 0 1 0-3.907a2.745 2.745 0 0 1 3.906 0l.28.279l.279-.279a2.745 2.745 0 0 1 3.906 0a2.745 2.745 0 0 1 .001 3.907z"/></svg> 
                  </button>
                  <span id="like-count" class="like-count">${postData.numberLike}Me gusta</span> 
                </div>
              </div>
               `
          })
  // voy a colocar los datos  en taskcontainer
         taskContainer.innerHTML = html
         
         // creo una constante de todos los botones delete, y selecciono con
         //query SelectorAll dentro de divmuro, con la clase btn delete
         const buttonsDelete =  divMuro.querySelectorAll('.btn-delete');
         // vamos a empezar a recorrerlos todos los botones
         buttonsDelete.forEach( btn => {
             // y por cada boton le agregamosun addEventListener y escuchamos el evento click

               btn.addEventListener('click', (e) => {
      //para eliminar necesito el id de cada post para poder eliminarlo
      //de la base de datos 
               console.log('chau')
               //propiedad dentro de html data-id (agrego el dato que quiero id), despues pueden crear
               // una variable dentro de html
               // entre $ {}, que es una concatenacion y se coloca doc.id
                //el id esta dentro de target, dentro de dataset,y luego id
               //
                id= e.target.dataset.id
                const closeConfirm = confirm('Desea borrar este post?')
                if( closeConfirm === true){
                    // exporto la funcion y le doy el id
                    deleteTask(id)
                    alert('se borro tu post')
                }else{
                    alert('post no eliminado')
                }
                  
                  
              })
          })

          const postBtn = divMuro.querySelector('#btn-form');
          // creo una lista de botones edit, seleciono todos los botones edit
          const buttonsEdit =  divMuro.querySelectorAll('.btn-edit');
         // voy a empezar a recorrer cada uno de los botones
          buttonsEdit.forEach( btn => {
              //por cada boton voy a añadir un addEventListener,
              // se de un click en los botones quiero extraer el evento
              btn.addEventListener('click', async (e) => {
               // con esto puedo colocar el scroll arriba cuando edito 
                // window.scrollTo({ top: 0, behavior: 'smooth' }) 
                 // con la funcion toggle escondo el boton
              divMuro.querySelector('#form-container').classList.toggle('hidden')
                //importo getTask, y le paso el e.target.dataset.id
                  // esto va a hacer una consulta a firestore y va a traernos
                  // un documento
                  const doc = await getTask(e.target.dataset.id)
                  // se guarda en una constante la data a editar, que es un objeto
                  const task = doc.data();
              // form (que contiene todo el form) selecciono el id 'title'
              //.value
                  form.querySelector('#title').value = task.title // task.title es lo contiene doc adentro
                  form.querySelector('#content').value = task.description
  // cuando de un click a editar adicionalmente a editar en los campos de edit, vamos a 
  // cambiar el  edit status a true para saber si se esta editando.
  // para saber si esta guardando
  // la variable editStatus esta en true vamos a poder actualizar 
                  editStatus = true;
                  // se declara el id, que esta dentro de target, dentro de dataset
                  id = e.target.dataset.id;
           // si editStatus es true,
                  //editStatus=true
        // en form vas a selecionar el boton y vamos a cambiarle su texto y va ser igual a Actualizar
                      
                      postBtn.innerText = 'Actualizar'
                               
              });
          })
//dar like
    const btnLike = taskContainer.querySelectorAll('.btn-like');
    // console.log(btnLike);
    btnLike.forEach((like) => {
    // console.log(btnLike)
    like.addEventListener('click', () => {
      
     //id = e.target.dataset.id;
    console.log('hola')
    const userId =auth.currentUser.uid;
    //const idLike = e.target.dataset.id;
    likePost(like.value, userId);
    // console.log(id);
    });
});
      });
  
     
 } 
  
  form.addEventListener('submit', (e) =>{
      e.preventDefault()
  
      //const title = form.querySelector('#title').value
      //const content = form.querySelector('#description').value
    const title = divMuro.querySelector('#title').value
   const description = divMuro.querySelector('#content').value
   const postBtn = divMuro.querySelector('#btn-form');
   window.scrollTo({ top: 0, behavior: 'smooth' }) 
   // sino estas editando
      if(!editStatus){
          //entonces quiero que guardes
          saveTask (title,description);
          // pero si
      }else{
          //estas editando actualiza
          editTask(
              id,
              {
              title,
              description,
              }
          )
          //regresa despues a false
          editStatus = false;
      }
      // resetea el form
      form.reset()
      // cambia el boton a enviar  
      postBtn.innerText = 'Enviar'
      
      
  
  } )


 return divMuro;
 };







