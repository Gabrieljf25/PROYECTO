let resultados = [];

function evaluar() {
  const form = document.getElementById("quizForm");
  const respuestas = new FormData(form);
  resultados = [];

  for (let i = 1; i <= 4; i++) {
    const res = respuestas.get("q" + i);
    resultados.push(res ? parseInt(res) : 0);
  }

  const total = resultados.reduce((a, b) => a + b, 0);
  document.getElementById("resultado").textContent = `Tu puntaje emocional es: ${total}/8`;

  mostrarGrafico(resultados);
}

function mostrarGrafico(puntos) {
  const ctx = document.getElementById("grafico").getContext("2d");
  if (window.miGrafico) {
    window.miGrafico.destroy();
  }

  window.miGrafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Estado de ánimo", "Color favorito", "Socialización", "Autoconocimiento"],
      datasets: [{
        label: "Puntos",
        data: puntos,
        backgroundColor: ["#27ae60", "#3498db", "#9b59b6", "#e67e22"]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 2
        }
      }
    }
  });
}

async function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Resultado del Formulario Personal", 20, 20);

  const preguntas = [
    "Estado de ánimo",
    "Color favorito",
    "Socialización",
    "Autoconocimiento"
  ];

  resultados.forEach((val, idx) => {
    doc.text(`${preguntas[idx]}: ${val} punto(s)`, 20, 30 + idx * 10);
  });

  const total = resultados.reduce((a, b) => a + b, 0);
  doc.text(`Puntaje total: ${total}/8`, 20, 80);

  doc.save("formulario_personal.pdf");
}
