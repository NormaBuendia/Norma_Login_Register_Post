//import { getAnalytics } from './firebase.js'
import{
  //conexion de base de datos
  getFirestore,
    //documentos, selecciono un solo documento
    doc,
    // crear una coleccion de datos
    collection,
    //añadir documentos
    //con addDoc se genera el id de cada post
    addDoc,
    // obtener documentos
    getDocs,
    //obetener tarea una unica tarea
    getDoc,
    //cuando los datos cambien
    onSnapshot,
    // borrar doc
    deleteDoc,
    //actualizar un doc
    updateDoc,
    arrayRemove,
    arrayUnion,
    
    } 
    //from "./configuFirebase.js" 
    from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { auth } from "./firebase.js";
//  conexion a la base de datos db base de datos conexion a firestore
//importo metodos de firestore
    const db = getFirestore();
  // guardo los datos en firebase
    export const saveTask = (title,description) => {
     let userName;
      // si el usuario se registró sin google (es decir no se guardó su displayName)
      
      if (auth.currentUser.displayName === null) {
         // al momento de crear el post
        // su nombre será el email.
        userName = auth.currentUser.email;
      } else {
        //usuario registrado con google
     userName = auth.currentUser.displayName;
       }
       // quiero añadir un documento que utiliza la collecion de post que utiliza el db
      addDoc(collection(db, 'post'), {
      // voy a guardar un objeto que va a tener los siguiente valores
      title, 
      description, 
      userName,
      userId:auth.currentUser.uid,
      like:[],
      numberLike:0,
      date:Date(Date.now()),
      
    })
    }
    //  querySnapShop trae los datos en tiempo real, pero contienen mas cosa, y solo queremos los docs
  //traer los datos de firestore


  //obtener documentos (get Docs) de la coleccion post, a traves
      export const getTasks = () => getDocs(collection(db, 'post'))
   
      // creo la funcion, que necesito un id para buscar una unica coleccion de
   //tarea getDoc, como es una unica tarea utilizo doc, con la conexion db, dentro de post
   // y busco el id
    export const getTask = id => getDoc(doc(db, 'post', id))
   
    // se le llama On porque es un evento
    //cuando se obtengan tareas
    // cuando se ejecuten tu vas a estar haciendo una consulta a la base de datos  de 'post'
    //y la funcion que vas a ejecutar aqui te la van a pasar, la funcion callback 
    //recibo como parametro una funcion callback
    export const onGetTasks = (callback) => onSnapshot(collection(db, 'post'), callback)
   

    //para borrar necesito el id, y con deleteDoc, quiero borrar solo un dato, con doc
    // el doc recibe los parametros, db que es la conexion, la coleccion 'post'
    // y al final lo que quiero eliminar
    export const deleteTask = id => deleteDoc(doc(db, 'post', id))
   
    // creo la funcion, y le paso 2 parametros, el id de lo que quiero actualizar
    // y los nuevos campos (newContent), con updateDoc actualizo, un documento, desde la conexion de la
    // base de datos en la coleccion de 'post' con el id que quiero, pero luego le paso a updateDoc los nuevos campos
    // que son los cambios a editar
    export const editTask = (id, newContent) => 
    updateDoc(doc(db,'post', id), newContent)

// dar like
export const likePost = async (id, userId)=>{
  const postRef = doc(db,'post',id);
  const docLike = await getDoc(postRef);
  const dataLike = docLike.data();
  
 console.log(dataLike);
  const likesCount = dataLike.numberLike;
  if((dataLike.like).includes(userId)){
   await updateDoc(postRef,{
like:arrayRemove(userId),
numberLike: likesCount  -1,
   });
  }else{
    await updateDoc(postRef,{
     like:arrayUnion(userId),
     numberLike: likesCount  +1,
    });
  };
 }
