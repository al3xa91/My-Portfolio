import { publicAsset } from './shared.js'

/**
 * About Me page content.
 * Photos go in: public/about/
 * Text in [square brackets] is a placeholder — replace it with your own words.
 * To add more photos to a group, copy a line in its `photos` list.
 */
export const aboutData = {
  portrait: {
    src: publicAsset('about/portrait.webp'),
    alt: 'Portrait of Alexa Cattaneo Piazza',
  },

  intro: 'Designer with a hospitality heart.',

  story: [
    'I\'m a multimedia designer based in Billund, Denmark, currently studying Multimedia Design at SEA – Syddansk Erhvervsakademi.',
    'My path into design didn\'t start in a studio. I studied Tourism Management in Las Palmas de Gran Canaria and spent years working with people, most recently in a Michelin-starred restaurant and as a barista for the LEGO Group. Those jobs taught me to read what people need before they ask, and that is exactly how I approach design today.',
    'I enjoy working across disciplines: researching users, shaping interfaces in Figma, designing print and illustration, editing video and building websites in Vue. For me, every project is a story, and my job is to tell it clearly and beautifully.',
  ],

  personal: {
    title: 'Outside of work',
    text: 'Long before I opened Figma, I was designing with sugar, paint and a lot of patience. These are the things, and the people, that fill my life away from the screen.',
    groups: [
      {
        title: 'Cake design',
        text: '[A sentence about your cake designing: how you started, what you loved making, how long you did it.]',
        photos: [
          { src: publicAsset('about/cake-1.webp'), caption: '[Cake caption 1]' },
          { src: publicAsset('about/cake-2.webp'), caption: '[Cake caption 2]' },
          { src: publicAsset('about/cake-3.webp'), caption: '[Cake caption 3]' },
        ],
      },
      {
        title: 'Window painting',
        text: '[A sentence about your window painting: where you paint, for which occasions, what you enjoy about it.]',
        photos: [
          { src: publicAsset('about/window-1.webp'), caption: '[Window caption 1]' },
          { src: publicAsset('about/window-2.webp'), caption: '[Window caption 2]' },
          { src: publicAsset('about/window-3.webp'), caption: '[Window caption 3]' },
        ],
      },
      {
        title: 'Family',
        text: '[A sentence about your family and what they mean to you.]',
        photos: [
          { src: publicAsset('about/family-1.webp'), caption: '[Family caption 1]' },
          { src: publicAsset('about/family-2.webp'), caption: '[Family caption 2]' },
          { src: publicAsset('about/family-3.webp'), caption: '[Family caption 3]' },
        ],
      },
    ],
  },
}
