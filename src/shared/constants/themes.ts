import { ColorTheme } from '@/shared/types/theme';

export const colorThemes: Array<{
  id: ColorTheme;
  name: string;
  description: string;
}> = [
  {
    id: 'default',
    name: 'Default',
    description: 'The classic easyloops theme with blue accents',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blues and teals inspired by the ocean',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural greens for a calming coding experience',
  },
];

export const getColorTheme = (id: ColorTheme) => 
  colorThemes.find(theme => theme.id === id) || colorThemes[0];