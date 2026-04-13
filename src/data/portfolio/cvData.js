import { publicAsset } from './shared.js'

export const cvData = {
  videoUrl: publicAsset('videos/cv-video.mp4'),
  resumeUrl: publicAsset('documents/alexa-cattaneo-piazza-cv.pdf'),
  resumeDownloadName: 'Alexa-Cattaneo-Piazza-CV.pdf',
  tagline: 'Bridging the gap between motion and design.',
  education: [
    { school: 'SEA-Syddansk Erhvervsakademi', degree: 'Multimedia Design', year: '2025-2027' },
    { school: 'Universidad de Las Palmas de Gran Canaria', degree: 'Tourism Management', year: '2017-2018' },
  ],
  experience: [
    { company: 'Compass Group for Lego Group', role: 'Barista', year: '2023-Present' },
    { company: 'MeMu Michelin Star Restaurant', role: 'Waitress', year: '2023-2023' },
  ],
}