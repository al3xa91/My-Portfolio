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
        text: 'Cake design started as a hobby in my free time in Spain, and it quickly became one of the things that makes me happiest. I taught myself everything, one cake at a time, and every new order was a chance to try something I hadn\'t done before.',
        photos: [
          { src: publicAsset('about/cake-1.webp'), caption: 'Mickey birthday cake & cupcakes' },
          { src: publicAsset('about/cake-2.webp'), caption: 'Bento cakes' },
          { src: publicAsset('about/cake-3.webp'), caption: 'Unicorn buttercream cake' },
          { src: publicAsset('about/cake-4.webp'), caption: 'Boss Baby birthday cake' },
        ],
      },
      {
        title: 'Window painting',
        text: 'During my lunch breaks at the LEGO Campus in Billund, I started drawing on the big windows. What began as a few doodles turned into little winter villages, Christmas trees and nutcrackers that colleagues could enjoy as they walked by.',
        photos: [
          { src: publicAsset('about/window-1.webp'), caption: 'Christmas is coming' },
          { src: publicAsset('about/window-2.webp'), caption: 'Winter village & Christmas tree' },
          { src: publicAsset('about/window-3.webp'), caption: 'Nutcrackers' },
          { src: publicAsset('about/window-4.webp'), caption: 'Nutcrackers at night' },
        ],
      },
      {
        title: 'Family',
        text: 'Family is everything to me. They are my biggest inspiration, and nothing makes me happier than spending quality time together. Whatever we do, I just love being with them.',
        photos: [
          { src: publicAsset('about/family-1.webp'), caption: 'Up, up and away' },
          { src: publicAsset('about/family-2.webp'), caption: 'A letter for Santa' },
          { src: publicAsset('about/family-3.webp'), caption: 'Family tower' },
          { src: publicAsset('about/family-4.webp'), caption: 'Christmas lights' },
        ],
      },
    ],
  },
}
