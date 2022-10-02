import { helper } from '@ember/component/helper';

export function utilOr(params) {
  return params.some((a) => a);
}

export default helper(utilOr);
