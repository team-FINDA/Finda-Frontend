/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        // Display
        'display-1': ['6.25rem', { lineHeight: 'auto', fontWeight: '800' }],
        'display-2': ['4.5rem', { lineHeight: 'auto', fontWeight: '800' }],
        'display-3': ['3.75rem', { lineHeight: 'auto', fontWeight: '800' }],
        // Heading
        'heading-1': ['2.5rem', { lineHeight: 'auto', fontWeight: '700' }],
        'heading-2': ['2.25rem', { lineHeight: 'auto', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: 'auto', fontWeight: '700' }],
        'heading-4': ['1.75rem', { lineHeight: 'auto', fontWeight: '600' }],
        'heading-5': ['1.5rem', { lineHeight: 'auto', fontWeight: '400' }],
        // SubHeading
        'subheading-1': ['2rem', { lineHeight: 'auto', fontWeight: '600' }],
        'subheading-2': ['1.25rem', { lineHeight: 'auto', fontWeight: '600' }],
        // Body
        'body-1': ['1rem', { lineHeight: 'auto', fontWeight: '600' }],
        'body-2': ['1rem', { lineHeight: 'auto', fontWeight: '400' }],
        'body-3': ['0.875rem', { lineHeight: 'auto', fontWeight: '600' }],
        'body-4': ['0.875rem', { lineHeight: 'auto', fontWeight: '400' }],
        // Caption
        'caption-1': ['0.75rem', { lineHeight: 'auto', fontWeight: '600' }],
        'caption-2': ['0.75rem', { lineHeight: 'auto', fontWeight: '400' }],
        'caption-3': ['0.625rem', { lineHeight: 'auto', fontWeight: '600' }],
        'caption-4': ['0.625rem', { lineHeight: 'auto', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
