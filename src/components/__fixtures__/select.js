import Select from '../select';

export default {
  component: Select,
  name: 'Select',
  props: {
    options: ['matchable', 'options'],
    initialOptions: ['initial', 'options'],
    placeholder: 'Placeholder',
  },
  controllers: {
    onChange: value => ({value})
  }
};