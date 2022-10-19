
import { Testimonial } from '../models/testimoniales.js';
const guardarTestimonial = async (req, res) =>{
    //validar
    const { nombre , correo , mensaje} = req.body;

    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje:'Agrega tu nombre Sexual!'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje:'Falta tu Correo sexual'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje:'Escribe tus exp Sexuales'});
    }
    if(errores.length > 0){

        //Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();


        // mostrar vista de errores

        res.render('testimoniales',{
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //agregar base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
    
}

export{
    guardarTestimonial
}