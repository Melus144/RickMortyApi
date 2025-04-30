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
Para iniciar, he creado el proyecto usando Vite con react y typescript e instalando tailwind version 4. Esta nueva version es más rápida pero no expone el binario directamente de forma tradicional, lo que puede dar problemas durante la instalacion. https://tailwindcss.com/docs/installation/using-vite

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
│   ├── hooks/                        
