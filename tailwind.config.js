/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue',
    './error.vue',
    './formkit.theme.ts'
  ],
  darkMode: 'media',
  // darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    fontSize: {
      // xs: 12px → 15.6px | lh: 1em → 1em
      "xs": ["clamp(0.75rem, 0.6717rem + 0.3913vi, 0.975rem)", "1em"],
      // sm: 14px → 18.2px | lh: 1.25em → 1.25em
      "sm": ["clamp(0.875rem, 0.7837rem + 0.4565vi, 1.1375rem)", "1.25em"],
      // base: 16px → 20.8px | lh: 1.5em → 1.5em
      "base": ["clamp(1rem, 0.8957rem + 0.5217vi, 1.3rem)", "1.5em"],
      // lg: 18px → 23.4px | lh: 1.75em → 1.75em
      "lg": ["clamp(1.125rem, 1.0076rem + 0.5870vi, 1.4625rem)", "1.75em"],
      // xl: 20px → 26px | lh: 1.75em → 1.75em
      "xl": ["clamp(1.25rem, 1.1196rem + 0.6522vi, 1.625rem)", "1.75em"],
      // 2xl: 24px → 31.2px | lh: 2em → 2em
      "2xl": ["clamp(1.5rem, 1.3435rem + 0.7826vi, 1.95rem)", "2em"],
      // 3xl: 30px → 39px | lh: 2.25em → 2.25em
      "3xl": ["clamp(1.875rem, 1.6793rem + 0.9783vi, 2.4375rem)", "2.25em"],
      // 4xl: 36px → 46.8px | lh: 2.5em → 2.5em
      "4xl": ["clamp(2.25rem, 2.0152rem + 1.1739vi, 2.925rem)", "2.5em"],
      // 5xl: 48px → 62.4px | lh: 1em → 1em
      "5xl": ["clamp(3rem, 2.6870rem + 1.5652vi, 3.9rem)", "1em"],
      // 6xl: 60px → 78px | lh: 1em → 1em
      "6xl": ["clamp(3.75rem, 3.3587rem + 1.9565vi, 4.875rem)", "1em"],
      // 7xl: 72px → 93.6px | lh: 1em → 1em
      "7xl": ["clamp(4.5rem, 4.0304rem + 2.3478vi, 5.85rem)", "1em"],
      // 8xl: 96px → 124.8px | lh: 1em → 1em
      "8xl": ["clamp(6rem, 5.3739rem + 3.1304vi, 7.8rem)", "1em"],
      // 9xl: 128px → 166.4px | lh: 1em → 1em
      "9xl": ["clamp(8rem, 7.1652rem + 4.1739vi, 10.4rem)", "1em"],
    },
    spacing: {
      // 0: 0px → 0px
      "0": "0rem",
      // 0.5: 2px → 2.6px
      "0.5": "clamp(0.125rem, 0.1175rem + 0.0375vi, 0.1625rem)",
      // 1: 4px → 5.2px
      "1": "clamp(0.25rem, 0.2350rem + 0.0750vi, 0.325rem)",
      // 1.5: 6px → 7.8px
      "1.5": "clamp(0.375rem, 0.3525rem + 0.1125vi, 0.4875rem)",
      // 2: 8px → 10.4px
      "2": "clamp(0.5rem, 0.4700rem + 0.1500vi, 0.65rem)",
      // 2.5: 10px → 13px
      "2.5": "clamp(0.625rem, 0.5875rem + 0.1875vi, 0.8125rem)",
      // 3: 12px → 15.6px
      "3": "clamp(0.75rem, 0.7050rem + 0.2250vi, 0.975rem)",
      // 3.5: 14px → 18.2px
      "3.5": "clamp(0.875rem, 0.8225rem + 0.2625vi, 1.1375rem)",
      // 4: 16px → 20.8px
      "4": "clamp(1rem, 0.9400rem + 0.3000vi, 1.3rem)",
      // 5: 20px → 26px
      "5": "clamp(1.25rem, 1.1750rem + 0.3750vi, 1.625rem)",
      // 6: 24px → 31.2px
      "6": "clamp(1.5rem, 1.4100rem + 0.4500vi, 1.95rem)",
      // 7: 28px → 36.4px
      "7": "clamp(1.75rem, 1.6450rem + 0.5250vi, 2.275rem)",
      // 8: 32px → 41.6px
      "8": "clamp(2rem, 1.8800rem + 0.6000vi, 2.6rem)",
      // 9: 36px → 46.8px
      "9": "clamp(2.25rem, 2.1150rem + 0.6750vi, 2.925rem)",
      // 10: 40px → 52px
      "10": "clamp(2.5rem, 2.3500rem + 0.7500vi, 3.25rem)",
      // 11: 44px → 57.2px
      "11": "clamp(2.75rem, 2.5850rem + 0.8250vi, 3.575rem)",
      // 12: 48px → 62.4px
      "12": "clamp(3rem, 2.8200rem + 0.9000vi, 3.9rem)",
      // 14: 56px → 72.8px
      "14": "clamp(3.5rem, 3.2900rem + 1.0500vi, 4.55rem)",
      // 16: 64px → 83.2px
      "16": "clamp(4rem, 3.7600rem + 1.2000vi, 5.2rem)",
      // 20: 80px → 104px
      "20": "clamp(5rem, 4.7000rem + 1.5000vi, 6.5rem)",
      // 24: 96px → 124.8px
      "24": "clamp(6rem, 5.6400rem + 1.8000vi, 7.8rem)",
      // 28: 112px → 145.6px
      "28": "clamp(7rem, 6.5800rem + 2.1000vi, 9.1rem)",
      // 32: 128px → 166.4px
      "32": "clamp(8rem, 7.5200rem + 2.4000vi, 10.4rem)",
      // 36: 144px → 187.2px
      "36": "clamp(9rem, 8.4600rem + 2.7000vi, 11.7rem)",
      // 40: 160px → 208px
      "40": "clamp(10rem, 9.4000rem + 3.0000vi, 13rem)",
      // 44: 176px → 228.8px
      "44": "clamp(11rem, 10.3400rem + 3.3000vi, 14.3rem)",
      // 48: 192px → 249.6px
      "48": "clamp(12rem, 11.2800rem + 3.6000vi, 15.6rem)",
      // 52: 208px → 270.4px
      "52": "clamp(13rem, 12.2200rem + 3.9000vi, 16.9rem)",
      // 56: 224px → 291.2px
      "56": "clamp(14rem, 13.1600rem + 4.2000vi, 18.2rem)",
      // 60: 240px → 312px
      "60": "clamp(15rem, 14.1000rem + 4.5000vi, 19.5rem)",
      // 64: 256px → 332.8px
      "64": "clamp(16rem, 15.0400rem + 4.8000vi, 20.8rem)",
      // 72: 288px → 374.4px
      "72": "clamp(18rem, 16.9200rem + 5.4000vi, 23.4rem)",
      // 80: 320px → 416px
      "80": "clamp(20rem, 18.8000rem + 6.0000vi, 26rem)",
      // 96: 384px → 499.2px
      "96": "clamp(24rem, 22.5600rem + 7.2000vi, 31.2rem)",
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        title: ["Josefin Sans", "sans-serif"],
      },
      spacing: {
        basic: '1.5rem'
      }
    }
  },
  plugins: []
}

