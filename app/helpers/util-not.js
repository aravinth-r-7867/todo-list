import { helper } from '@ember/component/helper';

export function utilNot(params/*, hash*/) {
  return !params[0];
}

export default helper(utilNot);
