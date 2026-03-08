---
title: Serverless Blog Engine
description: Um mecanismo de blog extremamente rápido construído com Nuxt Content e implantado no Cloudflare Workers.
tags: ["Nuxt Content", "Cloudflare", "Performance"]
date: 2023-12-10
---

## Visão Geral do Projeto

Este projeto explora os limites das aplicações web estáticas e serverless. Aproveitando o Nuxt Content e a rede Edge da Cloudflare, o motor entrega conteúdo com tempos de resposta abaixo de 100ms em todo o mundo.

## Técnicas de Otimização

- **Edge Caching:** Invalidação de cache inteligente usando Cloudflare KV.
- **Otimização de Imagem:** Conversão e redimensionamento WebP automatizados.
- **JS Mínimo:** Focado na entrega de CSS crítico e hidratação diferida.

## Conclusão

O resultado é uma experiência de blog amigável para o desenvolvedor que não sacrifica as pontuações do Lighthouse ou o engajamento do usuário.
