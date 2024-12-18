// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        pink: {
          DEFAULT: 'hsl(var(--pink))',
          foreground: 'hsl(var(--pink-foreground))',
        },
        polygon: {
          DEFAULT: 'hsl(var(--polygon))',
          foreground: 'hsl(var(--polygon-foreground))',
        },
      },
      fontFamily: {
        main: 'var(--font-main)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'activity-bar-move': {
          from: {
            transform: 'translate(0, 0)',
          },
          to: {
            transform: 'translate(-50%, 0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'activity-bar-move': 'activity-bar-move 50s linear infinite',
      },
      threedShadow: {
        unset: 'unset',
        none: 'none',

        sm: '4',
        base: '8',
        md: '12',
        lg: '16',

        primary: 'primary',
        secondary: 'secondary',
        muted: 'muted',
      },
      threedDropShadow: {
        unset: 'unset',
        none: 'none',

        1: 'hsl(var(--primary))',
      },
      maxLines: {
        unset: 'unset',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          // three-d shadow
          'threed-shadow': (value) => {
            if (value === 'none' || value === 'unset') {
              return {
                transform: 'unset',
                boxShadow: 'unset',
              };
            }

            if (['4', '8', '12', '16'].includes(value)) {
              const levelsNum = Number(value);

              return {
                transform: `translate(${levelsNum * 0.3}%, -${
                  levelsNum * 0.3
                }%)`,
                transform: `translate(${levelsNum}px, -${levelsNum}px)`,
                transition:
                  'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
              };
            }

            if (['primary', 'secondary', 'muted'].includes(value)) {
              const color = value;
              const boxShadowString = [...Array(8)]
                .map((_, i) => `-${i}px ${i}px hsl(var(--${color}))`)
                .join(', ');

              return {
                'box-shadow': boxShadowString,
                transition:
                  'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
              };
            }

            return {};
          },
        },
        {
          values: theme('threedShadow'),
        },
      );

      matchUtilities(
        {
          // three-d shadow
          'threed-shadow': (value) => {
            if (value === 'none' || value === 'unset') {
              return {
                transform: 'unset',
                boxShadow: 'unset',
              };
            }

            if (['4', '8', '12', '16'].includes(value)) {
              const levelsNum = Number(value);

              return {
                transform: `translate(${levelsNum * 0.3}%, -${
                  levelsNum * 0.3
                }%)`,
                transform: `translate(${levelsNum}px, -${levelsNum}px)`,
                transition:
                  'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
              };
            }

            if (['primary', 'secondary', 'muted'].includes(value)) {
              const color = value;
              const boxShadowString = [...Array(8)]
                .map((_, i) => `-${i}px ${i}px hsl(var(--${color}))`)
                .join(', ');

              return {
                'box-shadow': boxShadowString,
                transition:
                  'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
              };
            }

            return {};
          },
          'threed-drop-shadow': (value) => {
            if (value === 'none' || value === 'unset') {
              return {
                transform: 'unset',
                boxShadow: 'unset',
              };
            }

            if (['hsl(var(--primary))'].includes(value)) {
              const levelsNum = Number(value) || 2;

              const color = value;
              const filterString = [...Array(levelsNum)]
                .map((_, i) => `drop-shadow(-${i + 1}px ${i + 1}px 0 ${color})`)
                .join(' ');

              return {
                filter: filterString,
                transform: `translate(${levelsNum * 0.3}%, -${
                  levelsNum * 0.3
                }%)`,
                transform: `translate(${levelsNum}px, -${levelsNum}px)`,
                transition:
                  'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
              };
            }

            const length = value;
            const colorCode = `var(--threed-drop-shadow-color)`;

            const levelsNum = Number(length) || 2;

            const filterString = [...Array(levelsNum)]
              .map(
                (_, i) => `drop-shadow(-${i + 1}px ${i + 1}px 0 ${colorCode})`,
              )
              .join(' ');

            return {
              filter: filterString,
              transform: `translate(${levelsNum * 0.3}%, -${levelsNum * 0.3}%)`,
              transform: `translate(${levelsNum}px, -${levelsNum}px)`,
              transition:
                'transform 150ms ease-in-out, box-shadow 150ms ease-in-out',
            };
          },
        },
        {
          values: theme('threedDropShadow'),
        },
      );

      matchUtilities(
        {
          // max-lines
          'max-lines': (value) => {
            if (!value || value === 'unset') {
              return {};
            } else {
              return {
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': value, // number of lines to show
                'line-clamp': value,
                '-webkit-box-orient': 'vertical',
              };
            }
          },
        },
        {
          values: theme('maxLines'),
        },
      );
    }),
  ],
} satisfies Config;
