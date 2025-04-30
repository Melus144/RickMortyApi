-----------------1.RickMortyApi-----------------
Título: Hagamos las cosas a mano
Descripcion: tenemos una app en la cual el usuario quiere hacer uso de la api de rick and morty para adivinar su personaje favorito !
PLENA ATENCIÓN A COMO ESTRUCTURAN EL PROYECTO
Objetivo: utilizar tailwind, mostrar una lista de personajes en pantalla, crear un contexto para manejo de informacion entre componentes, crear a mano un hook para peticiones que se asemeje a lo que hace SWR (al menos en estructura)
ejemplo de este último:
 

import useSWR from 'swr'
function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}


1 -  Vite, React + TypeScript + Tailwind 4 - Clean Architecture


--------------------------------
Para iniciar, he creado el proyecto usando Vite con react y typescript e instalando tailwind version 4. https://tailwindcss.com/docs/installation/using-vite

He decidido hacer la estructura del proyecto lo más alineada con Clean Architecture posible, siguiendo el ejemplo de Gentleman Programming inspirado en el mismísmo Uncle Bob: https://the-amazing-gentleman-programming-book.vercel.app/es/book/Chapter08_Clean_Architecture_Front_End
Clean Architecture del proyecto:
src/
├── characters/                        # Módulo funcional: gestión de personajes
│   ├── CharacterContainer.tsx        # Componente contenedor
│   ├── components/                   # componentes relacionados con la UI del módulo
│   │   ├── CharacterList.tsx
│   │   └── CharacterCard.tsx
│   ├── application/                  # Casos de uso
│   │   └── useFetchCharacters.ts
│   ├── domain/                       # Entidades y lógica de negocio
│   │   ├── Character.ts
│   │   └── CharacterRules.ts         # (podriamos añadir lógica para "favorito", filtros, etc)
│   ├── services/                     # Comunicación con API externa
│   │   └── CharacterService.ts
│   ├── adapters/                     # Transformadores de datos, mapeo, etc.
│   │   └── CharacterAdapter.ts
│   └── index.ts                      # Barrel de exportaciones si hace falta (agrupa exports en un solo lugar para hacer imports mas limpios desde otras partes del código. recomendable si hay bastantes)
│
├── shared/                           # Reutilizable global (componentes, lógica, tipos). compartido por todos los módulos.
│   ├── components/                    #Componentes visuales reutilizables
│   │   ├── Spinner.tsx
│   │   └── ErrorBox.tsx
│   ├── hooks/                        #Hooks Reutilizables, se van a usar en varios modulos
│   │   └── useData.ts                # Hook tipo SWR
│   ├── context/
│   │   └── CharactersContext.tsx     # Contexto global compartido
│   └── types/
│       └── Result.ts                 # Tipado genérico, utilidades
│
├── App.tsx                           # Orquestador de módulos
└── main.tsx                          # Entry point / punto de entrada aplicacion

En este ejercicio, se mapea la Clean Architecture de esta manera:
Capa              | Qué es en nuestro proyecto                                |  ruta de carpeta
 Dominio          | Modelo Character, reglas tipo isFavorite, filtros         | characters/domain
 Casos de uso     | Hook useFetchCharacters, lógica para adivinar el favorito | characters/application
 Adaptadores      | Mapeo de API, Dominio, UI                             | characters/adapters
 Servicios        | Llamado real a API, fetch, headers                        | characters/services
 UI + Drivers     | Componentes React, Tailwind, rutas                        | characters/components + CharacterContainer
Los componentes globales, como Spinner, ErrorBox, o useData, viven en shared/ porque tienen alcance global. Si algo es usado solo en characters/, entonces vive ahí.
Al inicio no hace falta tener una aplicacion super dividida. Si una feature va creciendo, es recomendable implementar un módulo contenedor.
Por ejemplo, si mañana agregamos más funcionalidades de favoritos:
src/
├── favorites/
│   ├── FavoriteContainer.tsx
│   ├── components/
│   ├── application/
│   │   └── useManageFavorites.ts
│   ├── domain/
│   │   └── FavoriteCharacter.ts
│   ├── services/
│   │   └── FavoriteService.ts
│   └── adapters/
│       └── FavoriteAdapter.ts
Y no tocamos nada del módulo de personaje. Esa es una de las ventajas principales.s

Commands - New App using Bun (Clean Architecture Vite app):
npm install -g bun

Bun create vite@latest

Bun install

bun install tailwindcss@next @tailwindcss/vite@next

Invocar en index css y en vite config()

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
