import express from "express";

const app = express();
app.use(express.json());

// Aqui guardamos o estado de cada usuário
const etapas = {};

app.post("/webhook", (req, res) => {
  const numero = req.body.numero || "teste";
  const mensagem = (req.body.mensagem || "").toLowerCase();

  // Se for a primeira vez
  if (!etapas[numero]) {
    etapas[numero] = "inicio";
  }

  // ETAPA INICIAL
  if (etapas[numero] === "inicio") {
    etapas[numero] = "menu";
    return res.json({
      reply: "Olá! 👋\n1️⃣ Comprar\n2️⃣ Alugar\n3️⃣ Falar com corretor"
    });
  }

  // MENU
  if (etapas[numero] === "menu") {
    if (mensagem.includes("1")) {
      etapas[numero] = "tipo";
      return res.json({
        reply: "Ótimo! Qual tipo?\n1️⃣ Casa\n2️⃣ Apartamento"
      });
    }

    if (mensagem.includes("2")) {
      return res.json({
        reply: "Temos ótimas opções de aluguel! 😊"
      });
    }
  }

  // TIPO DE IMÓVEL
  if (etapas[numero] === "tipo") {
    etapas[numero] = "preco";
    return res.json({
      reply: "Qual faixa de preço?\n1️⃣ até 200k\n2️⃣ 200k a 500k"
    });
  }

  // PREÇO
  if (etapas[numero] === "preco") {
    etapas[numero] = "final";
    return res.json({
      reply: "Perfeito! Vou te mostrar algumas opções 🏡"
    });
  }

  // FALLBACK
  res.json({
    reply: "Desculpa, não entendi 😅"
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

