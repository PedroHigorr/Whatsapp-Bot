# --- Estágio 1: Build ---
    FROM node:22-alpine AS builder

    WORKDIR /app
    
    # Copia os arquivos de dependência
    COPY package*.json ./
    
    # Instala TUDO
    RUN npm ci
    
    # Copia o código fonte
    COPY . .
    
    # Compila
    RUN npm run build
    
    # --- Estágio 2: Produção ---
    FROM node:22-alpine
    
    WORKDIR /app
    
    # 1. Copia package.json
    COPY package*.json ./
    
    # 2. Instala apenas dependências de produção (AQUI ERA O ERRO, É RUN, NÃO COPY)
    RUN npm ci --omit=dev
    
    # 3. Copia a pasta dist do estágio anterior
    COPY --from=builder /app/dist ./dist
    
    ENV NODE_ENV=production
    
    CMD ["node", "dist/main"]