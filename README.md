# react-page-curl

A beautiful page curl effect component for React with theme toggle support. Perfect for adding a playful dark/light mode toggle to your website.

## Installation

```bash
npm install react-page-curl
```

## Usage

```tsx
import { PageCurl } from 'react-page-curl';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
      <PageCurl
        size={72}
        isDarkMode={isDarkMode}
        onClick={() => setIsDarkMode(!isDarkMode)}
        lightModeColor="#1c1917"
        darkModeColor="#ffffff"
      />
      {/* Your app content */}
    </div>
  );
}
```

### With next-themes (Next.js)

```tsx
import { PageCurl } from 'react-page-curl';
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <PageCurl
      size={72}
      isDarkMode={resolvedTheme === 'dark'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      lightModeColor="hsl(24 9.8% 10%)"
      darkModeColor="hsl(0 0% 100%)"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `72` | Width of the curl in pixels |
| `lightModeColor` | `string` | `"#1c1917"` | Color shown in corner when in light mode |
| `darkModeColor` | `string` | `"#ffffff"` | Color shown in corner when in dark mode |
| `isDarkMode` | `boolean` | `false` | Whether current theme is dark mode |
| `onClick` | `() => void` | `undefined` | Callback when curl corner is clicked |
| `hoverScale` | `number` | `1.15` | Scale factor on hover (1.15 = 115%) |
| `transitionDuration` | `number` | `150` | Transition duration in milliseconds |
| `shadow` | `string` | `"drop-shadow(-4px -2px 10px rgba(0,0,0,0.5))"` | Custom shadow CSS filter |
| `className` | `string` | `""` | Additional className for container |

## How It Works

The component renders a page curl effect in the top-left corner of your page. The corner behind the curl shows the "opposite" theme color - dark when in light mode, light when in dark mode. This creates a visual hint that clicking will reveal the other theme.

Features:
- 🎨 Customizable colors for both themes
- 🖱️ Hover effect with configurable scale
- 📱 Works with any React app
- ⚡ Zero configuration - just install and use
- 🎯 Click detection only on the visible curl area
- 📦 Image bundled inline - no assets to manage

## License

MIT © Jack Consenstein
