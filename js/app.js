document.addEventListener("DOMContentLoaded", function () {
    const email = {
        email:"",
        //Ccopia:"", //!
        asunto:"",
        mensaje:""

    }

    //todo 1) Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector(`#formulario button[type="submit"]`);
    const btnReset = document.querySelector(`#formulario button[type="reset"]`);
    const spinner = document.querySelector("#spinner");
    const inputConCopia= document.querySelector("#CCEmail"); //!

          //todo 2) Agregar eventos a los imput
          inputEmail.addEventListener("input", validar);
          inputAsunto.addEventListener("input", validar);  
          inputMensaje.addEventListener("input", validar); 
          inputConCopia.addEventListener("input", validacion);//!
          formulario.addEventListener("submit", enviarEmail);
          btnReset.addEventListener("click", function (e){ 
            e.preventDefault();
            resetFormulario();
          })

          //todo 3) Crear funciones
          function enviarEmail (e) { 
            e.preventDefault();
            spinner.classList.add("flex");
            spinner.classList.remove("hidden");
            
            setTimeout(() => {
              spinner.classList.remove("flex");
              spinner.classList.add("hidden");
              resetFormulario();

              //? Crear alerta de mensaje enviado
              const alertaExito = document.createElement("P");
              alertaExito.classList.add("bg-green-500","text-white","p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
              alertaExito.textContent = "Mensaje enviado correctamente";
              formulario.appendChild(alertaExito);

              setTimeout(() => {
                alertaExito.remove();
              }, 3000);
            
            }, 3000);
          }
          
          function validar(e) {
            if(e.target.value.trim() === "") {
                mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
                email[e.target.name] = "",
                comprobarEmail();
                return;
            } 
              if(e.target.id === "email" && !validarEmail(e.target.value)){
                mostrarAlerta("El email no es valido", e.target.parentElement);
                email[e.target.name] = "",
                comprobarEmail();
                return;
              }
              limpiarAlerta(e.target.parentElement);
              //? Asignar valores al objeto
              email[e.target.name] = e.target.value.trim().toLowerCase();
              console.log(email);

              //? Comprobar el objeto email
              comprobarEmail ();
             
          };

          function mostrarAlerta (mensaje, referencia){
              limpiarAlerta(referencia);
              //? Generar alerta en HTML
              const error = document.createElement("P");
                    error.textContent = mensaje;
                    error.classList.add("bg-red-600", "text-white", "p-2","text-center", "font-bold");

              //? Inyectar el error al formulario
              referencia.appendChild(error);
          }

          function limpiarAlerta(referencia) {
            const alerta = referencia.querySelector(".bg-red-600");
              if(alerta) {
                  alerta.remove();
              }
          }

          function validarEmail (email) {
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //Todo Esto es una expresion regular para emails
            const resultado = regex.test(email);
            console.log(resultado);
            return resultado;
          }

          function comprobarEmail () {
            if(Object.values(email).includes("")) {
              btnSubmit.classList.add("opacity-50");
              btnSubmit.disabled = true;
              return
            } 
              btnSubmit.classList.remove("opacity-50");
              btnSubmit.disabled = false;
            
          }

          function resetFormulario () {
            //Reiniciar el objeto
            email.email ="";
            //email.Ccopia="";
            email.asunto ="";
            email.mensaje ="";
            formulario.reset();
            comprobarEmail();
          }
        });
        //TODO <<<<<< AQUI EMPIEZA OTRO CODIGO ASIGNADO PARA EL CC Email >>>>>>

        function validacion (e) {
          if(e.target.value.trim() === "" ) {
            alertaCC(`El campo ${e.target.id} solamente acepta correo`, e.target.parentElement);
            return;
          
          }

          if(e.target.id === "CCEmail" && !validarCCemail(e.target.value)){//!lllll
              alertaCC("El email no es valido", e.target.parentElement);
              email[e.target.name] = "",
               validarCCemail();
                return;
              }
          if(!validarCCemail(e.target.value.trim())){
              alertaCC(`El email es valido`, e.target.parentElement)
                return;
              }
              limpiandoCCEmail (e.target.parentElement);
            };

        function alertaCC(correo, referencia2) {
          const eliminaAlerta = referencia2.querySelector(".bg-red-600");
          limpiandoCCEmail(referencia2);

          const alerta = document.createElement("P");
                alerta.textContent = correo;
                alerta.classList.add("bg-red-600", "text-white","p-2", "text-center","font-bold")
                referencia2.appendChild(alerta);
        };

        function limpiandoCCEmail(referencia2) {
            const eliminaAlerta = referencia2.querySelector(".bg-red-600");
            if(eliminaAlerta) {
              eliminaAlerta.remove();
            }
          };
        
          function validarCCemail (email2) {
            const regex2 = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //Todo Esto es una expresion regular para emails
            const resultado2 = regex2.test(email2);
            console.log(resultado2);
            return resultado2;
          };




        
