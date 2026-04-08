import express from "express";

const app = express();
app.use(express.json());

// Estado dos usuários
const etapas = {};

// 👉 ROTA PRINCIPAL (teste no navegador)
app.get("/", (req, res) => {
  res.send("Bot imobiliário rodando 🚀");
});

// 👉 WEBHOOK
app.post("/webhook", (req, res) => {
  const numero = req.body.numero || "teste";
  const mensagem = (req.body.mensagem || "").toLowerCase();

  if (!etapas[numero]) {
    etapas[numero] = "inicio";
  }

  if (etapas[numero] === "inicio") {
    etapas[numero] = "menu";
    return res.json({
      reply: "Olá! 👋\n1️⃣ Comprar\n2️⃣ Alugar\n3️⃣ Falar com corretor"
    });
  }

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

  if (etapas[numero] === "tipo") {
    etapas[numero] = "preco";
    return res.json({
      reply: "Qual faixa de preço?\n1️⃣ até 200k\n2️⃣ 200k a 500k"
    });
  }

  if (etapas[numero] === "preco") {
    etapas[numero] = "final";
    return res.json({
      reply: "Perfeito! Vou te mostrar algumas opções 🏡"
    });
  }

  res.json({
    reply: "Desculpa, não entendi 😅"
  });
});

// 👉 PORTA CORRETA (OBRIGATÓRIO NO RENDER)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando 🚀"));
res.send("TESTE 123 🚀");
