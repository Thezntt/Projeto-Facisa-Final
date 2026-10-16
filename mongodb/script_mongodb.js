// ============================================================================
// PROJETO FASE 1, FASE 2 E MONGODB
// INTEGRANTES DO GRUPO:
// - Tony Anderson Ferreira Tomaz
// ============================================================================
db = db.getSiblingDB("loja_projeto_db");

// Limpa as coleções para garantir execução limpa
db.categorias.drop();
db.produtos.drop();

// ============================================================================
// ENTIDADE 1: CATEGORIAS
// ============================================================================

print("\n=== 1. insertOne ===");
printjson(db.categorias.insertOne({
  nome: "Periféricos",
  setor: "Hardware",
  ativa: true,
  prioridade: 1,
  descontoPadrao: 10
}));

print("\n=== 2. insertMany ===");
printjson(db.categorias.insertMany([
  { nome: "Monitores", setor: "Vídeo", ativa: true, prioridade: 2, descontoPadrao: 5 },
  { nome: "Cadeiras Gamer", setor: "Móveis", ativa: true, prioridade: 3 },
  { nome: "Placas de Vídeo", setor: "Hardware", ativa: true, prioridade: 1, descontoPadrao: 15 },
  { nome: "Cabos e Adaptadores", setor: "Acessórios", ativa: false, prioridade: 5 }
]));

print("\n=== 3. find() - todas as categorias ===");
printjson(db.categorias.find().toArray());

print('\n=== 4. find({atributo: "valor"}) - setor Hardware ===');
printjson(db.categorias.find({ setor: "Hardware" }).toArray());

print("\n=== 5. updateOne - Monitores ===");
printjson(db.categorias.updateOne(
  { nome: "Monitores" },
  { $set: { descontoPadrao: 12, prioridade: 1 } }
));

print("\n=== 6. deleteOne - Cabos e Adaptadores ===");
printjson(db.categorias.deleteOne({ nome: "Cabos e Adaptadores" }));

print("\n=== 7. $eq - prioridade igual a 1 ===");
printjson(db.categorias.find({ prioridade: { $eq: 1 } }).toArray());

print('\n=== 8. $ne - setor diferente de "Móveis" ===');
printjson(db.categorias.find({ setor: { $ne: "Móveis" } }).toArray());

print("\n=== 9. $exists - possuem descontoPadrao ===");
printjson(db.categorias.find({ descontoPadrao: { $exists: true } }).toArray());

// ============================================================================
// ENTIDADE 2: PRODUTOS
// ============================================================================

db.produtos.insertOne({
  nome: "Teclado Mecânico RGB",
  preco: 350.00,
  estoque: 25,
  categoriaNome: "Periféricos",
  garantiaMeses: 12
});

db.produtos.insertMany([
  { nome: "Mouse Gamer Wireless", preco: 220.00, estoque: 40, categoriaNome: "Periféricos", garantiaMeses: 12 },
  { nome: "Monitor 27 Pol 144Hz", preco: 1450.00, estoque: 8, categoriaNome: "Monitores", garantiaMeses: 24 },
  { nome: "Placa de Vídeo RTX 4060", preco: 2300.00, estoque: 5, categoriaNome: "Placas de Vídeo", garantiaMeses: 36 },
  { nome: "Cadeira Ergonômica Pro", preco: 980.00, estoque: 12, categoriaNome: "Cadeiras Gamer" },
  { nome: "Headset Surround 7.1", preco: 420.00, estoque: 0, categoriaNome: "Periféricos", garantiaMeses: 6 }
]);

print("\n=== 10 e 12. $gt e $lt - preço entre 300 e 1500 ===");
printjson(db.produtos.find({ preco: { $gt: 300.00, $lt: 1500.00 } }).toArray());

print("\n=== 11 e 13. $gte e $lte - estoque entre 10 e 40 ===");
printjson(db.produtos.find({ estoque: { $gte: 10, $lte: 40 } }).toArray());

print("\n=== 14. $in - Monitores ou Placas de Vídeo ===");
printjson(db.produtos.find({ categoriaNome: { $in: ["Monitores", "Placas de Vídeo"] } }).toArray());

print("\n=== 15. $nin - fora de Periféricos e Móveis ===");
printjson(db.produtos.find({ categoriaNome: { $nin: ["Periféricos", "Móveis"] } }).toArray());

print("\n=== 16. $or - preço > 2000 OU estoque = 0 ===");
printjson(db.produtos.find({
  $or: [
    { preco: { $gt: 2000.00 } },
    { estoque: { $eq: 0 } }
  ]
}).toArray());

print("\n=== 17. $and - Periféricos E com garantia cadastrada ===");
printjson(db.produtos.find({
  $and: [
    { categoriaNome: { $eq: "Periféricos" } },
    { garantiaMeses: { $exists: true } }
  ]
}).toArray());
