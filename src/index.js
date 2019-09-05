import ScrollTo from 'lzb-scrollto';

import defaults from '../config/defaults';
import version from '../config/version';

import getOverflowElementFromParent from './utils/getOverflowElementFromParent';
import inBrowser from './utils/inBrowser';

class ScrollIntoView {
  constructor(el, opt) {
    this.$el = el;
    this.options = {
      ...defaults,
      ...opt,
    };
    this.sanitizeOptions();
    this.arrEl = getOverflowElementFromParent(this.$el);
    this.init();

    this.version = version;
  }

  init() {
    if (!(this.$el instanceof window.Element)) {
      throw new Error(`element passed to scrollTo() must be a DOM element, you passed ${this.$el}!`);
    }

    this.arrEl.forEach(({ parent, child }) => {
      const targetPosition = this.getTargetPosition(parent, child);
      const scrollto = new ScrollTo(
        parent,
        {
          top: targetPosition.top,
          left: targetPosition.left,
          behavior: this.options.behavior,
        },
      );
      return scrollto;
    });
  }

  sanitizeOptions() {
    const typeArr = ['start', 'center', 'nearest', 'end'];

    if (!typeArr.includes(this.options.block)) {
      this.options.block = 'start';
    }

    if (!typeArr.includes(this.options.inline)) {
      this.options.inline = 'start';
    }
  }

  getTargetPosition(parent, child) {
    const clientRect = child.getBoundingClientRect();
    let parentRect = {};

    if (parent === document.documentElement) {
      parentRect.top = 0;
      parentRect.left = 0;
      parentRect.width = window.innerWidth;
      parentRect.height = window.innerHeight;
    } else {
      parentRect = parent.getBoundingClientRect();
    }
    const position = {
      top: parent.scrollTop,
      left: parent.scrollLeft,
    };

    const mixWidth = parent.clientWidth - child.offsetWidth;
    const mixHeight = parent.clientHeight - child.offsetHeight;

    if (this.options.block === 'start') {
      position.top += clientRect.top - parentRect.top;
    }

    if (this.options.inline === 'start') {
      position.left += clientRect.left - parentRect.left;
    }

    if (this.options.block === 'center') {
      position.top += clientRect.top - parentRect.top - Math.floor(mixHeight / 2);
    }

    if (this.options.inline === 'center') {
      position.left += clientRect.left - parentRect.left - Math.floor(mixWidth / 2);
    }

    if (this.options.block === 'end') {
      position.top += clientRect.top - parentRect.top - mixHeight;
    }

    if (this.options.inline === 'end') {
      position.left += clientRect.left - parentRect.left - mixWidth;
    }

    return position;
  }
}

if (inBrowser) {
  window.ScrollIntoView = ScrollIntoView;
  window.console.log('plugin is running browser.');
}

export default ScrollIntoView;
