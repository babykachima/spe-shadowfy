import { ic_paper, ic_nature, ic_sport, ic_funny, ic_history, ic_interseting } from '../../Assets';
import { IIconCategories } from '../../Types';

export const IconCategories: Array<IIconCategories> = [
  {
    id: 1,
    title: 'Funny',
    value: 'funny',
    icon: ic_funny,
  },
  {
    id: 2,
    title: 'History',
    value: 'history',
    icon: ic_history,
  },
  {
    id: 3,
    title: 'Interseting',
    value: 'interseting',
    icon: ic_interseting,
  },
  {
    id: 4,
    title: 'Nature',
    value: 'nature',
    icon: ic_nature,
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
    icon: ic_sport,
  },
];
