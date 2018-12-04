import Input from '../input';

export default {
  component: Input,
  props: {
    label: 'Label',
    placeholder: 'Placeholder',
    value: ''
  },
  controllers: {
    onChange: value => ({ value })
  }
}