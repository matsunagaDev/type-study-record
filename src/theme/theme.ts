import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: {
          value: 'sans-serif',
        },
      },
    },
  },
});
