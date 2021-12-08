import {
  FormatListNumberedRtl as FormatListNumberedRtlIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';

export default [
  {
    path: '/flash-cards',
    title: 'Flash Cards',
    icon: <AutoAwesomeMotionIcon />,
  },
  {
    path: '',
    title: 'Verb Tenses',
    icon: <ForumIcon />,
    disabled: true,
  },
  {
    path: '/irregular-verbs',
    title: 'Irregular Verbs',
    icon: <FormatListNumberedRtlIcon />,
    disabled: true,
  },
];
