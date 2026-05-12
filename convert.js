const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'stitch_screens');
const appDir = path.join(__dirname, 'src', 'app');

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.html'));

let globalTheme = {
    colors: {},
    spacing: {},
    borderRadius: {},
    fontFamily: {},
    fontSize: {}
};

function extractTheme(html) {
    const match = html.match(/tailwind\.config\s*=\s*(\{.*?\})\s*<\/script>/s);
    if (match) {
        try {
            // Very hacky eval to get the object out of the string since it might not be pure JSON
            const configObj = eval(`(${match[1]})`);
            const theme = configObj.theme?.extend || configObj.theme;
            if (theme) {
                if (theme.colors) Object.assign(globalTheme.colors, theme.colors);
                if (theme.spacing) Object.assign(globalTheme.spacing, theme.spacing);
                if (theme.borderRadius) Object.assign(globalTheme.borderRadius, theme.borderRadius);
                if (theme.fontFamily) Object.assign(globalTheme.fontFamily, theme.fontFamily);
                if (theme.fontSize) Object.assign(globalTheme.fontSize, theme.fontSize);
            }
        } catch (e) {
            console.log("Error parsing tailwind config", e);
        }
    }
}

function htmlToJsx(html) {
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;

    // Remove scripts and styles
    bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Some inline styles can be complex, but let's just convert class to className
    let jsx = bodyContent
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
        .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')
        .replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />')
        .replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />')
        .replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />')
        .replace(/style="[^"]*"/g, '')
        .replace(/data-alt=/g, 'alt=');

    return jsx.trim();
}

const routes = {
    '1_beranda.html': '', // page.tsx
    '2_profil.html': 'profil',
    '3_struktur.html': 'struktur',
    '4_berita.html': 'berita',
    '5_data_rayon.html': 'data-rayon'
};

files.forEach(file => {
    const html = fs.readFileSync(path.join(screensDir, file), 'utf8');
    extractTheme(html);
    
    const jsx = htmlToJsx(html);
    const route = routes[file];
    
    if (route !== undefined) {
        const targetDir = path.join(appDir, route);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const componentName = file.replace('.html', '').replace(/^\d+_/, '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
        
        const tsxContent = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">\n      ${jsx}\n    </div>\n  );\n}\n`;
        
        fs.writeFileSync(path.join(targetDir, 'page.tsx'), tsxContent);
        console.log(`Generated ${path.join(targetDir, 'page.tsx')}`);
    }
});

// Generate CSS for Tailwind v4
let cssContent = `@import "tailwindcss";

@theme {
`;

// Add colors
for (const [key, value] of Object.entries(globalTheme.colors)) {
    if (typeof value === 'string') {
        cssContent += `  --color-${key}: ${value};\n`;
    }
}

// Add spacing
for (const [key, value] of Object.entries(globalTheme.spacing)) {
    cssContent += `  --spacing-${key}: ${value};\n`;
}

// Add fonts
for (const [key, value] of Object.entries(globalTheme.fontFamily)) {
    if (Array.isArray(value)) {
        cssContent += `  --font-${key}: ${value.map(v => '"' + v + '"').join(', ')};\n`;
    }
}

// Add text styles
for (const [key, value] of Object.entries(globalTheme.fontSize)) {
    if (Array.isArray(value)) {
        cssContent += `  --text-${key}: ${value[0]};\n`;
        if (value[1]) {
            if (value[1].lineHeight) cssContent += `  --text-${key}--line-height: ${value[1].lineHeight};\n`;
            if (value[1].letterSpacing) cssContent += `  --text-${key}--letter-spacing: ${value[1].letterSpacing};\n`;
            if (value[1].fontWeight) cssContent += `  --text-${key}--font-weight: ${value[1].fontWeight};\n`;
        }
    }
}

// Add border radius
for (const [key, value] of Object.entries(globalTheme.borderRadius)) {
    cssContent += `  --radius-${key === 'DEFAULT' ? 'DEFAULT' : key}: ${value};\n`;
}

cssContent += `}

/* Custom styles from Stitch */
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.hero-overlay {
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));
}

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-on-surface);
  }
}
`;

fs.writeFileSync(path.join(appDir, 'globals.css'), cssContent);
console.log('Updated globals.css with Tailwind v4 themes');
