import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template'; // No I18N

function iconLoader(positional, named) {
  return htmlSafe(
    `<svg class="icon ${named.class}" style="fill:currentColor"><use xlink:href='/images/bootstrap-icons.svg#${named.icon}'></use></svg>`
  );
}

export default helper(iconLoader);
