# Página "link na bio" — Caio Freitas (arquivo HTML único)

## Contexto

O usuário quer uma página de links na bio do Instagram: **um único arquivo HTML** com HTML + CSS + JS juntos, sem frameworks nem bibliotecas externas (exceto Google Fonts), mobile first. O projeto atual é um template React/Vite, então a entrega será:

- o arquivo único em `public/bio.html` (servido em `/bio.html`);
- a raiz do site (`/`) passa a abrir esse arquivo, para que o preview mostre a página real.

Decisões confirmadas com o usuário: rota `/bio.html` + raiz abrindo ela; avatar pela URL pública da imagem; fonte **Poppins**.

Conteúdo permitido (nada além disso): avatar circular, nome "Caio Freitas" (sem subtítulo/descrição), 4 botões (YouTube, Twitch, GitHub, E-mail), rodapé "© 2026 Caio Freitas".

## Arquivos

- **Criar** `public/bio.html` — página completa e autocontida (HTML + CSS + JS).
- **Editar** `src/pages/Index.tsx` — reduzir a um componente que redireciona a raiz para `/bio.html` (mantém o template React e o `index.html` intactos, incluindo a script tag do `main.tsx`).

## Implementação

### 1. `public/bio.html`

**Head**
- `<!DOCTYPE html>`, `lang="pt-BR"`, `charset utf-8`.
- `viewport` com `width=device-width, initial-scale=1`.
- `<title>Caio Freitas | Links</title>`.
- `og:title` = "Caio Freitas | Links" e `og:description` = "Todos os links do Caio Freitas em um só lugar." + `og:type`/`og:image` usando a URL pública do avatar.
- Google Fonts Poppins (400/500/600) com `preconnect` + `display=swap`.

**Variáveis de cor (topo do CSS)** — tudo trocável em um só lugar:
`--bg`, `--bg-deep`, `--accent` (azul claro), `--accent-soft`, `--highlight` (laranja/amarelo), `--text`, `--text-muted`, `--btn-bg`, `--btn-border`, `--radius`.

**Fundo (ondas topográficas)**
- `<svg>` inline `position: fixed; inset: 0; z-index: 0` com `preserveAspectRatio="xMidYMid slice"`, contendo várias curvas suaves concêntricas (paths em `stroke` com tons de azul e baixa opacidade).
- Animação `drift` muito lenta (translate/scale de poucos %) no grupo do SVG, ~40s, `ease-in-out`, `infinite alternate`.
- Gradiente radial escuro por cima para dar profundidade.

**Layout**
- `main` com `max-width: 480px`, `margin: 0 auto`, padding lateral confortável, `min-height: 100dvh`, coluna centralizada.
- Avatar: círculo de ~112–120px (`border-radius: 50%`, borda fina azulada, brilho azul, sombra suave) com a imagem `https://cdn.enter.pro/resources/uid_100620147/e56427ab-090b-4f.png`, `alt="Caio Freitas"`, animação `float` contínua (sobe/desce ~6px).
- Nome em Poppins 600, tamanho responsivo (`clamp`), cor `--text`.
- Botões em lista vertical, `gap` uniforme, largura total.

**Botões** (`<a>`, ícones SVG inline à esquerda + nome)
1. YouTube → `https://www.youtube.com/@c4feziin`
2. Twitch → `https://www.twitch.tv/c4feziin`
3. GitHub → `https://github.com/freitasscaio`
4. E-mail → `mailto:contatoc4feziin@gmail.com`

- Os 3 externos: `target="_blank" rel="noopener"`.
- Estilo: fundo `--btn-bg` translúcido, borda fina `--btn-border`, cantos bem arredondados, brilho azul e sombra suave.
- Hover/`focus-visible`/active: sobe ~3px, brilho aumenta, borda/ícone ganham detalhe em `--highlight` (laranja/amarelo), ícone faz pequena balançada (`wiggle`).
- Ícones: SVG inline (24x24, `currentColor`) — YouTube, Twitch, GitHub e envelope; `aria-hidden="true"`.
- Acessibilidade: `:focus-visible` visível, `aria-label` quando necessário.

**Botão de e-mail (JS)**
- `addEventListener("click")`: tenta `navigator.clipboard.writeText("contatoc4feziin@gmail.com")`.
  - Sucesso → `e.preventDefault()` e mostra mensagem rápida "E-mail copiado!" (elemento `role="status"` com fade in/out por ~2s).
  - Falha (ou API indisponível) → não bloqueia; o `mailto:` abre normalmente.
- JS também em `DOMContentLoaded`-safe: script no fim do `<body>`.

**Animações de entrada (cascata)**
- Classes `.reveal` com `opacity: 0` + `translateY(14px)` e `animation: rise .6s ease forwards` com `animation-delay` crescente: avatar (0.05s), nome (0.18s), botões (0.30s, 0.38s, 0.46s, 0.54s), rodapé (0.7s).

**`prefers-reduced-motion: reduce`**
- Desliga `float`, `drift`, `wiggle` e a cascata: tudo visível (`opacity: 1`, `transform: none`, `animation: none`).

**Rodapé**: `<footer>© 2026 Caio Freitas</footer>`, texto pequeno e discreto.

**Comentários**: blocos curtos em português explicando cabeçalho/variáveis/ondas/botões/JS.

### 2. `src/pages/Index.tsx`

- Remover o uso de `useTranslation` e o markup atual.
- Componente mínimo: `useEffect(() => { window.location.replace("/bio.html"); }, [])` e `return null` (evita qualquer flash da tela antiga).
- Mantém `index.html`, `src/main.tsx` e o restante do template sem alterações.

## Checklist de implementação

- [x] `public/bio.html` criado com head completo: title, viewport, og:title, og:description, og:image e Google Fonts Poppins.
- [x] Bloco `:root` com todas as cores/raios em variáveis CSS comentadas no topo.
- [x] SVG de ondas topográficas em tons de azul com animação `drift` lenta e opacidade sutil.
- [x] Avatar circular usando a URL pública da imagem, com animação `float` contínua e borda/brilho azulado.
- [x] Nome "Caio Freitas" sem subtítulo, frase ou descrição em qualquer lugar da página.
- [x] Exatamente 4 botões na ordem YouTube, Twitch, GitHub, E-mail; nenhum link extra.
- [x] Os 3 links externos com `target="_blank" rel="noopener"`; e-mail com `mailto:contatoc4feziin@gmail.com`.
- [x] Cada botão com ícone SVG inline próprio à esquerda do nome.
- [x] Clique no e-mail copia o endereço e mostra "E-mail copiado!"; em falha de cópia o `mailto:` abre normalmente.
- [x] Hover/toque eleva o botão, aumenta o brilho, adiciona detalhe laranja/amarelo e balança o ícone.
- [x] Cascata de entrada (avatar → nome → botões → rodapé) com fade + subida suave.
- [x] `@media (prefers-reduced-motion: reduce)` desliga todas as animações e mantém tudo visível.
- [x] Conteúdo com `max-width: 480px` centralizado e espaçamento consistente; rodapé "© 2026 Caio Freitas".
- [x] `src/pages/Index.tsx` redireciona `/` para `/bio.html` sem importar i18n.

## Checklist de verificação

- [x] `pnpm lint` e `pnpm exec tsc --noEmit` sem erros.
- [x] `pnpm run build` conclui sem erros e `dist/bio.html` existe na saída.
- [x] `website_screenshot` em `http://localhost:8080/bio.html` no preset `mobile_390`: avatar, nome, 4 botões e rodapé visíveis, sem overflow horizontal.
- [x] `website_screenshot` em `http://localhost:8080/bio.html` no preset `desktop_1280`: conteúdo centralizado com largura máxima de 480px.
- [x] Screenshot de `http://localhost:8080/`: a raiz termina exibindo a página de links (redirect funcionando).
- [x] Verificação negativa: nenhuma seção extra (loja, formulário, contador, música, vídeo), nenhum texto além de nome/plataformas/rodapé.
- [x] Verificação de boundary: em 320px de largura os botões seguem clicáveis e o layout não quebra.
- [ ] Checagem de acessibilidade: `prefers-reduced-motion` — implementado no CSS, mas **não verificado em runtime** (a ferramenta de screenshot não emula essa preferência).
- [ ] Verificação manual do clique no botão de e-mail (copiar + aviso "E-mail copiado!") — depende de interação real no preview.
