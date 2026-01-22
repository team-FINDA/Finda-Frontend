import '@emotion/react';
import type { Theme as AppTheme } from './theme';

declare module '@emotion/react' {
  interface Theme extends AppTheme {}
}
