import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import XHR from 'i18next-xhr-backend';
// import Messager from './services/Messager';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    // resources: {
    //   en: {
    //     translations: {
    //       loginPage_pleaseLogin: 'Please login',
    //       loginPage_login: "Login",
    //       loginPage_password: 'Password',
    //       loginPage_code: 'Code',
    //       loginPage_rememberMe: "Remember me",
    //       loginPage_loginBtn: "Login",
    //     }
    //   },
    //   fr: {
    //     translations: {
    //       loginPage_pleaseLogin: 'Veuillez vous connecter',
    //       loginPage_login: "Identifiant",
    //       loginPage_password: 'Mot de passe',
    //       loginPage_code: 'Code',
    //       loginPage_rememberMe: "Se souvenir de moi",
    //       loginPage_loginBtn: "Connexion",
    //     }
    //   }
    // },
    fallbackLng: 'en',
    debug: true,

    // // have a common namespace used around the full app
    // ns: ["translations"],
    // defaultNS: "translations",

    // keySeparator: false, // we use content as keys

    // interpolation: {
    //   escapeValue: false
    // }
  });

// Messager.addReceiver('onLanguage', language => {
//   i18n.changeLanguage(language);
// });

export default i18n;
