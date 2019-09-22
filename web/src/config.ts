const Config = {
  API_BASE_URL: 'http://lms.vision3.fr/api/v2/',
  MEDIA_BASE_URL: 'http://lms.vision3.fr/',
  UNITS_BASE_URL: 'http://lms.vision3.fr:3001/',
  LANGUAGES: {
    'fr': { text:'Français', icon:'/flags/fr.png' },
    'en': { text:'English', icon:'/flags/gb.png' },
  } as {[id: string]: { text: string, icon: string }},
};

export default Config;
