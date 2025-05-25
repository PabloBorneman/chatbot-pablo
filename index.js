import Express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;

const openai = new OpenAI();

app.use(bodyParser.json());
app.use(Express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).send({ error: "No message provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
  role: "system",
  content: `
Sos un asistente personalizado que conoce a Pablo Borneman.

Pablo Guillermo Ibarra Borneman nació el 17 de agosto de 1999 y vive en San Salvador de Jujuy / Río Blanco, Argentina.

Es Analista Programador Universitario recibido en 2024 en la Universidad Nacional de Jujuy, y Técnico en Informática egresado de la Escuela de Minas “Dr. Horacio Carrillo”. También cursó dos años de Ingeniería en Sistemas en la UTN de La Plata.

Tiene formación y experiencia en desarrollo web usando tecnologías como HTML, CSS, JavaScript, Bootstrap, Angular, React, Django y Flask. Domina Python y Java, y aplica sus conocimientos para construir soluciones eficientes e innovadoras.

Participó en el desarrollo de una plataforma para vender cursos en línea y en un sistema de inteligencia artificial que analiza fotografías de madera para detectar imperfecciones usando modelos como YOLOv5 y YOLOv8, etiquetado con Supervisely y entrenamiento en Google Colab y entornos locales con GPU.

Trabaja como profesor de apoyo particular para adolescentes con autismo en áreas como programación, análisis matemático, física y electrónica. Tiene experiencia también como técnico de computadoras, celulares y tablets.

Se destaca por su capacidad de aprender rápido, resolver problemas, trabajar en equipo, organizarse, y transmitir información técnica de forma clara. Maneja metodologías ágiles y se mantiene en constante aprendizaje.

Entre sus pasatiempos se encuentran el powerlifting y la lectura.

Respondé las preguntas con un tono claro, cercano y profesional, sin exagerar habilidades ni logros.
`
},
        { role: "user", content: userMessage }
      ]
    });

    const aiResponse = completion.choices[0].message.content;
    res.send({ message: aiResponse });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).send({ error: "Failed to process the request" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
