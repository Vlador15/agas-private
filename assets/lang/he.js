/**
 *
 * Written by vlad on 19/11/2020
 */
import studentProfile from '~/assets/lang/he/studentProfile'
import auth from '~/assets/lang/he/auth.js'
import barting from '~/assets/lang/he/barting.js'
import board from '~/assets/lang/he/board.js'
import breadcrumbs from '~/assets/lang/he/breadcrumbs.js'
import citiesIsr from '~/assets/lang/he/cities_isr.js'
import profile from '~/assets/lang/he/profile.js'
import scream from '~/assets/lang/he/scream.js'
import learningModule from '~/assets/lang/he/learningModule'
import teacherProfile from '~/assets/lang/he/teacherProfile'
import chat from '~/assets/lang/he/chat'
import catalogs from '~/assets/lang/he/catalogs'

export default {
  learningModule,
  teacherProfile,
  studentProfile,
  auth,
  barting,
  board,
  chat,
  catalogs,
  breadcrumbs,
  profile,
  scream,
  notFound: 'לא נמצא',
  pay: 'רכישה',
  notifications: 'התראות',
  noNotifications: 'אין לך התראות חדשות',
  hello: 'שלום',
  text_search: 'הקלד טקסט חיפוש',
  search: 'חיפוש',
  main_nav_links: [
    {
      title: 'כתבות',
      icon: 'mdi-newspaper-variant-multiple-outline',
      link: '/'
    },
    { title: 'פרופיל', icon: 'mdi-account-outline', link: '/profile' },
    { title: 'בארטינג', icon: 'mdi-bitcoin', link: '/barting' },
    // { title: 'לוח מודעות', icon: 'mdi-clipboard-text', link: '/board' },
    { title: 'לימודים', icon: 'mdi-book', link: '/learningModule' },
    { title: 'מנויים', icon: 'mdi-bank', link: '/catalogs/catalogs' },
    { title: 'הודעות', icon: 'mdi-chat', link: '/messager/dialogs' }
  ],
  learningModule_categories: [
    {
      name: 'פריפיל סטודנט',
      routing: '/learningModule/student',
      key: 'student'
    },
    {
      name: 'פרופיל מורה',
      routing: '/learningModule/teacher',
      key: 'teacher'
    }
    // { name: 'ספרייה', routing: '/learningModule/base', key: 'base' }
  ],
  main_categories: [
    { name: 'חיות מחמד', routing: '/board/pets', key: 'pets' },
    { name: 'אוכל', routing: 'food', key: 'food' },
    { name: 'השכלה', routing: 'education', key: 'education' },
    { name: 'לבית ולגן', routing: 'house-n-garden', key: 'house-n-garden' },
    {
      name: 'רפואה ואסתטיקה',
      routing: 'med-n-aesthetics',
      key: 'med-n-aesthetics'
    },
    { name: 'רכב', routing: 'transport', key: 'transport' },
    { name: 'בידור ונופש', routing: 'entertainment', key: 'entertainment' },
    { name: 'שירותים קצועיים', routing: 'spec-services', key: 'spec-services' },
    { name: 'נדל״ן', routing: 'real-estate', key: 'real_estate' },
    { name: 'הלבשה', routing: 'clothing', key: 'clothing' },
    { name: 'ריהוט', routing: 'furniture', key: 'furniture' },
    { name: 'שיפוץ וניקיון', routing: 'clean-repare', key: 'clean-repare' },
    { name: 'ספורט', routing: 'sports', key: 'sport' },
    { name: 'אזוטריקה', routing: 'esoterics', key: 'esoterics' },
    { name: 'אספנות', routing: 'collecting', key: 'collecting' },
    { name: 'עסק', routing: 'business', key: 'business' }
  ],
  filters: 'סנן תוצעות',
  deal_type: 'סוג העסקה',
  deal_type_opts: {
    sale: 'מכירה',
    buying: 'קניה',
    passing: 'מסירה',
    found: 'מציאות',
    delayed: 'בית זמני',
    adoption: 'פנסיון',
    mating: 'זיווג'
  },
  animal_type: 'סוג החייה',
  animal_types: {
    cats: 'חתולים',
    dogs: 'כלבים',
    birds: 'ציפורים',
    fishes: 'דגים',
    other: 'אחר'
  },
  breed: 'גזע',
  breeds_cats: {
    siam: 'סיאמי',
    himalaya: 'הימאלאי',
    ragdoll: 'רגנדול',
    mainecoon: 'מיין קון',
    scottish: 'סקוטי',
    persian: 'פרסי',
    british: 'בריטי',
    sphinx: 'ספינקס',
    burma: 'בירמה',
    angora: 'אנגורי',
    siberian: 'סיבירי',
    breedless: 'לא גזעי'
  },
  gender: 'מין',
  genders_pets: {
    male: 'זכר',
    female: 'נקבה'
  },
  countries: {
    isr: 'ישראל'
  },
  cities_isr: citiesIsr,
  pets_title: 'Title',
  age: 'גיל',
  country: 'מדיניה',
  apply: 'סנן תוצאות',
  clear_ft: 'נקה',
  category: 'קטגוריה',
  description: 'פירוט',
  price: 'מחיר',
  price_from: 'From',
  price_to: 'To',
  delivery_conditions: 'תנאי המשלוח',
  allow_comments: 'אפשר תגובות',
  phone_num: 'מספר טלפון',
  publish: 'פרסם',
  dropzone: {
    upload_images: 'הוסף תמונות',
    erase: 'מחק',
    wrong_format: 'קובץ זה הינו מסוג לא נתמך',
    max_img_limit: 'כמות התמונות המותרת נוצלה',
    max_file_size: 'משקל תמונה המותר לא צריך להיות גדול מ-',
    mb: 'מגאבייט'
  },
  notspecified: 'Not specified',
  cancel: 'לבטל'
}
