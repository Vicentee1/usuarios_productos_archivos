var ruta=require("express").Router();
var subirArchivo=require("../middlewares/subirArchivo");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/",async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar",{usuarios});
  
});

ruta.get("/nuevousuario",async(req,res)=>{
    res.render("usuarios/nuevo");

});

ruta.post("/nuevousuario",subirArchivo(),async(req, res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});

ruta.get("/editar/:id",subirArchivo(),async(req, res)=>{
    var user=await buscarPorID(req.params.id);
    res.render("usuarios/modificar",{user});

});

ruta.post("/editar",subirArchivo(),async(req,res)=>{
    var usuario=await buscarPorID(req.body.id);
    if(req.file){
        req.body.foto=req.file.originalname;
    }else{
        req.body.foto=req.usuario.foto;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/");
});

ruta.get("/borrar/:id", async(req,res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/");

});

module.exports=ruta;