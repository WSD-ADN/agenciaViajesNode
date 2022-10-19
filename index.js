
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//definir puerto

db.authenticate()
    .then( () => console.log(' Base de datos conectada') )
    .catch( error => console.log(error));


const port = process.env.PORT || 4000;
// Habilidar PUG
app.set('view engine', 'pug');

// obtener el year actual
app.use((req,res,next)=>{

    
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = " Agencia de Viajes";
    next();
});

// agregar el body parser para leer datos del usuario
app.use(express.urlencoded({extended: true}));


// Definir la carpeta publica
app.use(express.static('public'));


// aGREGAR rOUTER
    app.use('/',router);

app.listen(port,()=>{
    console.log(`Servidor ${port}`)
})