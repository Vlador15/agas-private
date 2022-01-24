/**
 *
 * Written by vlad on 19/11/2020
 */

import studentProfile from '~/assets/lang/ru/studentProfile'
import auth from '~/assets/lang/ru/auth.js'
import barting from '~/assets/lang/ru/barting.js'
import board from '~/assets/lang/ru/board.js'
import breadcrumbs from '~/assets/lang/ru/breadcrumbs.js'
import citiesIsr from '~/assets/lang/ru/cities_isr.js'
import profile from '~/assets/lang/ru/profile.js'
import scream from '~/assets/lang/ru/scream.js'
import learningModule from '~/assets/lang/ru/learningModule'
import teacherProfile from '~/assets/lang/ru/teacherProfile'
import student from '~/assets/lang/ru/student'
import chat from '~/assets/lang/ru/chat'
import catalogs from '~/assets/lang/ru/catalogs.js'

export default {
  studentProfile,
  student,
  auth,
  chat,
  catalogs,
  barting,
  board,
  teacherProfile,
  learningModule,
  breadcrumbs,
  profile,
  scream,
  notFound: 'Не найдено',
  pay: 'Купить',
  notifications: 'Уведомления',
  noNotifications: 'У вас нет новых уведомлений',
  hello: 'Привет',
  text_search: 'Введите текст для поиска',
  search: 'Поиск',
  main_nav_links: [
    {
      title: 'Публикации',
      icon: 'mdi-newspaper-variant-multiple-outline',
      link: '/ru',
      home: true
    },
    { title: 'Профиль', icon: 'mdi-account-outline', link: '/ru/profile' },
    { title: 'Бартинг', icon: 'mdi-bitcoin', link: '/ru/barting' },
    {
      title: 'Доска объявлений',
      icon: 'mdi-clipboard-text',
      link: '/ru/board'
    },
    { title: 'Учебный модуль', icon: 'mdi-book', link: '/ru/learningModule' },
    { title: 'Подписки', icon: 'mdi-bank', link: '/ru/catalogs/catalogs' },
    { title: 'Сообщения', icon: 'mdi-chat', link: '/ru/messager/dialogs' }
  ],
  learningModule_categories: [
    {
      name: 'Кабинет учащегося',
      routing: '/ru/learningModule/student',
      key: 'student'
    },
    {
      name: 'Кабинет преподавателя',
      routing: '/ru/learningModule/teacher',
      key: 'teacher'
    }
    // { name: 'База знаний', routing: '/ru/learningModule/base', key: 'base' }
  ],
  main_categories: [
    { name: 'Животные', routing: '/ru/board/pets', key: 'pets' },
    { name: 'Еда', routing: 'food', key: 'food' },
    { name: 'Обучение ', routing: 'education', key: 'education' },
    { name: 'Дом и сад', routing: 'house-n-garden', key: 'house-n-garden' },
    {
      name: 'Медицина и эстетика',
      routing: 'med-n-aesthetics',
      key: 'med-n-aesthetics'
    },
    { name: 'Транспорт', routing: 'transport', key: 'transport' },
    {
      name: 'Отдых и развлечения',
      routing: 'entertainment',
      key: 'entertainment'
    },
    {
      name: 'Услуги специалистов',
      routing: 'spec-services',
      key: 'spec_services'
    },
    { name: 'Недвижимость', routing: 'real-estate', key: 'real-estate' },
    { name: 'Одежда', routing: 'clothing', key: 'clothing' },
    { name: 'Мебель', routing: 'furniture', key: 'furniture' },
    { name: 'Ремонт и уборка', routing: 'clean-repare', key: 'clean-repare' },
    { name: 'Спорт', routing: 'sport', key: 'sport' },
    { name: 'Эзотерика', routing: 'esoterics', key: 'esoterics' },
    { name: 'Коллекционирование', routing: 'collecting', key: 'collecting' },
    { name: 'Бизнес', routing: 'business', key: 'business' }
  ],
  filters: 'Фильтр',
  deal_type: 'Тип предложения',
  deal_type_opts: {
    sale: 'Продажа',
    buying: 'Покупка (ищу)',
    passing: 'Передача',
    found: 'Найдены',
    delayed: 'Передержка',
    adoption: 'Пансион',
    mating: 'Вязка'
  },
  animal_type: 'Тип животного',
  animal_types: {
    cats: 'Кошки',
    dogs: 'Собаки',
    birds: 'Птицы',
    fishes: 'Рыбы',
    other: 'Другие'
  },
  breed: 'Порода',
  breeds_cats: {
    siam: 'Сиамские',
    himalaya: 'Гималайские',
    ragdoll: 'Рэгдолл',
    mainecoon: 'Мэйн Кун',
    scottish: 'Шотландские',
    persian: 'Персидские',
    british: 'Британские',
    sphinx: 'Сфинксы',
    burma: 'Бирма',
    angora: 'Ангора',
    siberian: 'Сибирский',
    breedless: 'Без породный'
  },
  gender: 'Пол',
  genders_pets: {
    male: 'Самец',
    female: 'Самка'
  },
  countries: {
    isr: 'Израиль'
  },
  cities_isr: citiesIsr,
  pets_title: 'Заголовок',
  age: 'Возраст',
  country: 'Страна',
  apply: 'Применить',
  clear_ft: 'Очистить',
  category: 'Категория',
  description: 'Описание',
  price: 'Цена',
  price_from: 'От',
  price_to: 'До',
  delivery_conditions: 'Условия доставки',
  allow_comments: 'Разрешить коментарии',
  phone_num: 'Номер телефона',
  publish: 'Опубликовать',
  dropzone: {
    upload_images: 'Загрузить фотографии',
    erase: 'УДАЛИТЬ',
    wrong_format: 'Даннный тип файла не поддерживается и будет проигнорирован',
    max_img_limit: 'Вы достигли максимально разрешенное количество фотографий',
    max_file_size: 'Размер файла не должен превышать',
    mb: 'Мб.'
  },
  notspecified: 'Не указано',
  cancel: 'Отмена'
}
