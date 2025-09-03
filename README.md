# Clubão do Descontão

Um aplicativo React Native/Expo para descontos e ofertas especiais.

## 🚀 Funcionalidades

- **Tela de Login/Registro**: Interface simples e intuitiva para autenticação
- **Navegação por Tabs**: Sistema de navegação com duas abas principais
- **Tela de Ofertas**: Exibição de categorias de produtos com descontos
- **Design Responsivo**: Suporte para modo claro e escuro
- **Validação de Formulários**: Verificação de campos obrigatórios

## 📱 Telas

### Tela de Autenticação (`/auth`)
- Login e registro em uma única tela
- Validação de campos obrigatórios
- Design moderno com cores temáticas
- Navegação automática após autenticação

### Tela Inicial (`/(tabs)/index`)
- Boas-vindas personalizadas
- Botão de logout
- Interface adaptada ao tema do app

### Tela de Ofertas (`/(tabs)/explore`)
- Grid de categorias com descontos
- Destaque da semana
- Cards coloridos e interativos

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **Expo Router** para navegação
- **TypeScript** para tipagem
- **React Native Reanimated** para animações
- **Expo Font** para fontes customizadas

## 🎨 Design System

### Cores Principais
- **Laranja**: `#FF6B35` (cor principal do app)
- **Azul**: `#0a7ea4` (cor de destaque)
- **Suporte a tema claro/escuro**

### Componentes
- `ThemedText`: Texto com suporte a temas
- `ThemedView`: Container com suporte a temas
- `ParallaxScrollView`: Scroll com efeito parallax
- `IconSymbol`: Ícones do sistema

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd 232-Ricardo
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npx expo start
```

## 🔧 Estrutura do Projeto

```
app/
├── _layout.tsx          # Layout principal com navegação
├── auth.tsx            # Tela de autenticação
└── (tabs)/
    ├── _layout.tsx     # Layout das tabs
    ├── index.tsx       # Tela inicial
    └── explore.tsx     # Tela de ofertas

components/
├── ThemedText.tsx      # Componente de texto temático
├── ThemedView.tsx      # Componente de view temático
└── ui/                 # Componentes de interface

constants/
└── Colors.ts          # Definição de cores

hooks/
├── useColorScheme.ts   # Hook para tema
└── useThemeColor.ts    # Hook para cores temáticas
```

## 🎯 Próximos Passos

- [ ] Implementar autenticação real (Firebase, Auth0, etc.)
- [ ] Adicionar persistência de dados
- [ ] Implementar busca de produtos
- [ ] Adicionar favoritos
- [ ] Implementar notificações push
- [ ] Adicionar testes unitários

## 📄 Licença

Este projeto está sob a licença MIT.
