# Pokédex Take-Home Assignment - Senior Frontend Developer

_This project showcases modern frontend development skills, emphasizing clean code, performance, and user experience. I wanted to add testing but due due to time constraint for this test, and having to add congif files and deps, chose not to write comprehensive unit test, in order to better use the time to showcase front-end, typescript, and react knowledge_

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Updates to Deps from Original

- "@types/node": "^12.0.0" upgraded to "@types/node": "^20.0.0"
- "typescript": "^4.5.2" upgraded to "typescript": "^5.3.0"

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Key Features Implemented

#### Core Requirements Met

1. **GraphQL Integration**

   - Apollo Client configured with Pokémon API
   - Custom hooks for data fetching (`useGetPokemons`, `useGetPokemon`)
   - Efficient query management and caching

2. **TypeScript Implementation**

   - Comprehensive type safety across all components
   - Custom type definitions for Pokemon data structures
   - Proper typing for props, hooks, and API responses

3. **JSS Styling System**
   - No CSS files - all styles implemented with react-jss
   - Consistent theming and responsive design
   - Hover effects and smooth transitions

#### Enhanced User Experience

4. **Interactive Pokemon List**

   - Grid layout with Pokemon cards
   - Each card displays: name, number, image, and types
   - Color-coded type badges using dynamic theming
   - Smooth hover animations with scale transforms

5. **Advanced Search Functionality**

   - Real-time client-side filtering
   - Multi-criteria search (name, number, type)
   - Case-insensitive matching
   - "No results" state handling

6. **Route-Based Modal System**
   - URL-driven modal state (`/pokemon/:id`)
   - Deep-linkable Pokemon detail views
   - Browser back/forward navigation support
   - Detailed Pokemon information display

#### Technical Highlights

7. **Performance Optimizations**

   - Memoized filtered results with `useMemo`
   - Efficient re-rendering patterns
   - Lazy loading considerations

8. **Accessibility Features**

   - Semantic HTML structure
   - Proper ARIA labels

9. **Error Handling**
   - Loading states
   - Error boundaries and fallbacks

## Design Decisions

### Component Architecture

- **Composition over inheritance**: Small, focused components
- **Custom hooks**: Business logic separated from UI components

### Styling Approach

- **Consistent design system**: Color palette based on Pokemon types
- **Responsive design**: flexible layouts
- **Smooth animations**: Enhance user experience without being distracting

### State Management

- **Local state**: useState for UI state (search input, modal state)
- **URL as state**: Modal visibility controlled by routing

### Performance Considerations

- **Memoization**: Expensive computations cached with useMemo
- **Efficient filtering**: Client-side search with optimized algorithms
- **Image optimization**: Proper loading strategies for Pokemon images

### Testing Considerations (Need to Install Deps, and setup Testing)

- Components designed for easy testing
- Clear separation of concerns
- Mockable GraphQL queries
- Testable business logic in custom hooks
