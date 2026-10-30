# Alexa Cattaneo Piazza — Portfolio

Personal portfolio built with Vue 3, Vite and Tailwind CSS 4.

## Commands

```sh
npm install      # install dependencies
npm run dev      # local dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint + eslint (auto-fixes what it can)
npm run deploy   # publish dist/ to GitHub Pages
```

## Where things live

| What | File |
| --- | --- |
| Name, bio, email, socials | `src/data/portfolio/personalInfo.js` |
| CV video, PDF, education, experience | `src/data/portfolio/cvData.js` |
| Categories, skills, category thumbnails | `src/data/portfolio/categoryData.js` |
| Projects | `src/data/portfolio/projects.js` |
| Section overline labels ("Moments, Composed"…) | `src/constants/ui.js` |
| Colours and global styles | `src/assets/main.css` |
| Images, videos, PDFs | `public/` (reference them with `publicAsset('folder/file.webp')`) |

## Adding a project

Add an object to the `projects` array in `src/data/portfolio/projects.js`.
Projects appear in array order, grouped by `category`. The `category` must match a
`name` in `categoryData.js`.

There are two kinds of project page, chosen automatically:

**Gallery / slideshow**: give the project a `caseStudy.gallery` with `images` (or
`videos`). The frame shape depends on the category (portrait for Graphic Design,
vertical for Video, landscape otherwise).

```js
{
  id: 10,
  title: 'New Posters',
  category: 'Graphic Design',
  description: 'Short card description.',
  imageUrl: publicAsset('posters/cover.webp'),
  caseStudy: {
    gallery: {
      images: [
        {
          src: publicAsset('posters/one.webp'),
          title: 'POSTER ONE',
          description: 'What it is.',
          // optional button under the description:
          externalUrl: 'https://…',
          externalLabel: 'View Brochure',
        },
      ],
    },
  },
}
```

**Written case study** (UX/UI style): give it `caseStudy.role`, `tools`, `problem`,
`outcome` and a list of `sections`. Each section has a `visual` with a `type` of
`none`, `image`, `imageLink` (image + button to `embedUrl`), `gallery`,
`galleryWide`, `paletteGrid` or `typography`. See Vegama in `projects.js` for a
complete example.

Keep images as `.webp` and around 2500px on the long edge: larger files slow the
site down without looking any sharper.
