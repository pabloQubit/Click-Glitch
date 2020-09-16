module.exports = {

  packagerConfig: {
    name: 'ClickGlitch',
    executableName: 'ClickGlitch',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Pablo Henrique',
        copyright: 'Freeware',
        description: 'AutoClicker macro, fast cps, controlled delay',
        exe: 'ClickGlitch',
        iconUrl: './assets/package_icon.jpg',
        setupExe: 'setup',
        setupIcon: './assets/install_icon.png',
        version: '0.0.1',
      },
    },

    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Pablo Skubert',
          homepage: 'https://www.facebook.com/pablo6102',
          description: 'The most powerful autoclick tool avaliable.',
          genericName: 'Automatization Tool',
          icon: './assets/package_icon.jpg',
          name: 'ClickGlitch',
          priority: 'optional',
          productDescription: 'Multithread autoclicker, personalize how much cores do you wanna use to perform clicks, select down delay and up delay of mouse button!',
          productName: 'Click Glitch',
          version: process.env.VERSION,
          depends: ['libx11-dev', 'libxtst-dev', 'libpng++-dev'],
        },
      },
    },
  ],
};
