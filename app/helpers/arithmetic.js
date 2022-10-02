import Helper from '@ember/component/helper';

export default class extends Helper {
  compute([...positional], { sign }) {
    return _operators[sign](positional);
  }
}

const _operators = {
  '+': (arr) => arr.reduce((a, b) => a + b, 0),
  '==': (arr) => arr[0] == arr[1],
  '!=': (arr) => arr[0] != arr[1],
};
