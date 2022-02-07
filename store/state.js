export default () => ({
  loading: {
    user: false,
    form: false,
    ui: false
  },
  user: {},
  messages: [],
  users: [],
  // productsCatalogs: [
  //   {
  //     price: 250,
  //     discountBool: false,
  //     discount: '0%',
  //     title: 'Подписка: lite',
  //     time: '1 месяц',
  //     description:
  //       'Включает в себя 10 показов номеров телефона, 3 отзыва по желанию',
  //     img: './assets/lamp.jpg',
  //     id: 1
  //   },
  //   {
  //     price: 750,
  //     discountBool: false,
  //     discount: '0%',
  //     title: 'Подписка: pro',
  //     time: '3 месяца',
  //     description:
  //       'Включает в себя 40 показов номеров телефона, 5 отзыва по желанию',
  //     img: './assets/lamp.jpg',
  //     id: 2
  //   },
  //   {
  //     price: 25,
  //     oldPrice: 250,
  //     discountBool: true,
  //     discount: '90%',
  //     title: 'Скидка:Подписка: lite',
  //     time: '1 месяц',
  //     description:
  //       'Включает в себя 10 показов номеров телефона, 3 отзыва по желанию',
  //     img: './assets/lamp.jpg',
  //     id: 3
  //   },
  //   {
  //     price: 75,
  //     oldPrice: 750,
  //     discountBool: true,
  //     discount: '90%',
  //     title: 'Скидка:Подписка: pro',
  //     time: '3 месяца',
  //     description:
  //       'Включает в себя 40 показов номеров телефона, 5 отзыва по желанию',
  //     img: './assets/lamp.jpg',
  //     id: 4
  //   }
  // ],
  listData: [],
  listModers: [],
  productsModer: [],
  valideModer: [],
  categoryList: [],
  subjects: [],
  feedbacks: {},
  testSubject: {},
  teacherIdData: {},
  testSubjectFilter: {},
  teacherFilter: {},
  productsCatalogs: {},
  profileStudent: {},
  profileTeacher: {},
  listTeachers: [],
  infinitiDataToLoad: true,
  error: null,
  path: '',
  token: null,
  screams: [],
  userScreams: [],
  lastScream: null,
  quizzes: [
    {
      title: 'Какой-то опрос',
      description: 'описание опроса',
      questions: [
        {
          title: 'Вопрос 1',
          answers: ['Ответ 1', 'Answer', 'Ответ 2']
        },
        {
          title: 'Вопрос 2',
          answers: ['Ответ 1', 'Answer', 'Ответ 2']
        }
      ],
      createdAt: new Date(Date.now()).toISOString(),
      quizId: 1598603861708,
      userHandle: 'Yakov',
      visibility: 'all'
    }
  ],
  selectedScream: {},
  authUser: {},
  profileEditable: false,
  dataUserSelected: null,
  sidebarDrawer: true,
  sidebarMob: false,
  sidebarDrawerMini: false,
  hasSublist: false,
  store: {
    filter: [''],
    selectedCat: '',
    categories: [
      {
        icon: 'food',
        title: 'Еда',
        id: '01',
        parent: false
      },
      {
        icon: 'edu',
        title: 'Обучение',
        id: '02',
        parent: false
      },

      {
        icon: 'animals',
        title: 'Животные',
        id: '03',
        parent: true,
        sub: [
          {
            icon: 'dog',
            title: 'Покупка породистого животного',
            id: '03_1',
            parent: false
          },
          {
            icon: 'donkey',
            title: 'Покупка животного без породы',
            id: '03_2',
            parent: false
          },
          {
            icon: 'accessories',
            title: 'Аксессуары',
            id: '03_3',
            parent: true,
            sub: [
              {
                icon: 'box',
                title: 'Переноски',
                id: '03_3_1',
                parent: false
              },
              {
                icon: 'rack',
                title: 'Шлейки',
                id: '03_3_1',
                parent: false
              },
              {
                icon: 'paw',
                title: 'Когтеточки',
                id: '03_3_1',
                parent: false
              }
            ]
          }
        ]
      }
    ],
    products: [
      {
        title: 'Переноска для кошки',
        catIds: [
          {
            id: '03',
            icon: 'animals',
            title: 'Животные'
          },
          {
            id: '03_3',
            icon: 'accessories',
            title: 'Аксессуары'
          },
          {
            id: '03_3_1',
            icon: 'box',
            title: 'Переноски'
          }
        ],
        price: 1000,
        imgUrl: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        description:
          'Deserunt ipsum culpa laborum proident. Occaecat ea sunt do non veniam. Incididunt consectetur aliquip nostrud nisi. Mollit duis elit reprehenderit reprehenderit velit est sint minim fugiat minim esse.',
        visibility: 'all',
        createdAt: new Date(Date.now()).toISOString(),
        id: Date.now(),
        userHandle: 'jmuxeu'
      },
      {
        title: 'Торт',
        catIds: [
          {
            icon: 'food',
            id: '01',
            title: 'Еда'
          }
        ],
        price: 150,
        imgUrl: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        description:
          'Proident culpa occaecat ea adipisicing aliqua laborum ex id cillum aliquip. Aute labore ea et pariatur commodo nostrud laboris voluptate tempor eiusmod esse dolore exercitation. Id aliqua pariatur est ad laboris irure.',
        visibility: 'all',
        createdAt: new Date(Date.now()).toISOString(),
        id: Date.now(),
        userHandle: 'jmuxeu'
      }
    ]
  },
  bartsHistory: [],
  interestHistory: null
})
