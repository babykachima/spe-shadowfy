import { ic_paper } from '../../Assets';
import { IBanner, IIconCategories } from '../../Types';

export const dataBanner: Array<IBanner> = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1661860859715-d963b4d51268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

export const IconCategories: Array<IIconCategories> = [
  {
    id: 1,
    title: 'Funny',
    value: 'funny',
    icon: ic_paper,
  },
  {
    id: 2,
    title: 'History',
    value: 'history',
    icon: ic_paper,
  },
  {
    id: 3,
    title: 'Interseting',
    value: 'interseting',
    icon: ic_paper,
  },
  {
    id: 4,
    title: 'Nature',
    value: 'nature',
    icon: ic_paper,
  },
  {
    id: 5,
    title: 'News',
    value: 'news',
    icon: ic_paper,
  },
  {
    id: 6,
    title: 'Sport',
    value: 'sport',
    icon: ic_paper,
  },
];
