/**
 *
 * Written by vlad on 19/11/2020
 */
import auth from '~/assets/lang/en/auth.js'
import barting from '~/assets/lang/en/barting.js'
import board from '~/assets/lang/en/board.js'
import breadcrumbs from '~/assets/lang/en/breadcrumbs.js'
import citiesIsr from '~/assets/lang/en/cities_isr.js'
import profile from '~/assets/lang/en/profile.js'
import scream from '~/assets/lang/en/scream.js'

export default {
  auth,
  barting,
  board,
  breadcrumbs,
  profile,
  scream,
  notFound: 'Not found',
  pay: 'To pay',
  notifications: 'Notifications',
  noNotifications: 'You have no new notifications',
  hello: 'Hello',
  text_search: 'Type to search',
  search: 'Search',
  main_nav_links: [
    {
      title: 'Publications',
      icon: 'mdi-newspaper-variant-multiple-outline',
      link: '/en',
      home: true
    },
    { title: 'Profile', icon: 'mdi-account-outline', link: '/en/profile' },
    { title: 'Barting', icon: 'mdi-bitcoin', link: '/en/barting' },
    { title: 'Board', icon: 'mdi-clipboard-text', link: '/en/board' },
    { title: 'Subscriptions', icon: 'mdi-bank', link: '/en/catalogs/catalogs' }
  ],
  main_categories: [
    { name: 'Pets', routing: '/en/board/pets', key: 'pets' },
    { name: 'Food', routing: 'food', key: 'food' },
    { name: 'Education ', routing: 'education', key: 'education' },
    {
      name: 'House and Garden',
      routing: 'house-n-garden',
      key: 'house-n-garden'
    },
    {
      name: 'Medicine & Aesthetics',
      routing: 'med-n-aesthetics',
      key: 'med-n-aesthetics'
    },
    { name: 'Transport', routing: 'transport', key: 'transport' },
    { name: 'Entertainment', routing: 'entertainment', key: 'entertainment' },
    {
      name: 'Special services',
      routing: 'spec-services',
      key: 'spec-services'
    },
    { name: 'Real Estate', routing: 'real-estate', key: 'real-estate' },
    { name: 'Clothing', routing: 'clothing', key: 'clothing' },
    { name: 'Furniture', routing: 'furniture', key: 'furniture' },
    {
      name: 'Cleaning and Repairs',
      routing: 'clean-repare',
      key: 'clean-repare'
    },
    { name: 'Sports', routing: 'sports', key: 'sport' },
    { name: 'Esoterics', routing: 'esoterics', key: 'esoterics' },
    { name: 'Collecting', routing: 'collecting', key: 'collecting' },
    { name: 'Business', routing: 'business', key: 'business' }
  ],
  filters: 'Filter',
  deal_type: 'Deal Type',
  deal_type_opts: {
    sale: 'Sale',
    buying: 'Want to buy',
    passing: 'Passing',
    found: 'Found',
    delayed: 'Delayed',
    adoption: 'Adoption',
    mating: 'Mating'
  },
  animal_type: 'Animal Type',
  animal_types: {
    cats: 'Cats',
    dogs: 'Dogs',
    birds: 'Birds',
    fishes: 'Fishes',
    other: 'Other'
  },
  breed: 'Breed',
  breeds_cats: {
    siam: 'Siam',
    himalaya: 'Himalayan',
    ragdoll: 'Ragdoll',
    mainecoon: 'Maine Coon',
    scottish: 'Scottish',
    persian: 'Persian',
    british: 'British',
    sphinx: 'Sphinx',
    burma: 'Burma',
    angora: 'Angora',
    siberian: 'Siberian',
    breedless: 'Breedless'
  },
  gender: 'Gender',
  genders_pets: {
    male: 'Male',
    female: 'Female'
  },
  countries: {
    isr: 'Israel'
  },
  cities_isr: citiesIsr,
  pets_title: 'Title',
  age: 'Age',
  country: 'Country',
  apply: 'Apply',
  clear_ft: 'Clear Filters',
  category: 'Category',
  description: 'Description',
  price: 'Price',
  price_from: 'From',
  price_to: 'To',
  delivery_conditions: 'Delivery conditions',
  allow_comments: 'Allow comments',
  phone_num: 'Phone number',
  publish: 'Publish',
  dropzone: {
    upload_images: 'Upload Images',
    erase: 'DELETE',
    wrong_format: 'Unsupported image type, file will be ignored',
    max_img_limit: 'You have reached maximum allowed images amount',
    max_file_size: 'Maximal allowed file size should not exceed ',
    mb: 'Mb'
  },
  notspecified: 'Not specified',
  cancel: 'Cancel'
}
