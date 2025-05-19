function agregarTarea() {
  const input = document.getElementById("tareaInput");
  const textoTarea = input.value.trim();

  if (textoTarea === "") return;

  const li = document.createElement("li");
  li.textContent = textoTarea;

  const boton = document.createElement("input");
  boton.type = "button";
  boton.value = "Ok";
  boton.className = "boton-ok";
  boton.onclick = function () {
    li.remove();
  };

  li.appendChild(boton);

  document.getElementById("listaTareas").appendChild(li);
  input.value = "";
}