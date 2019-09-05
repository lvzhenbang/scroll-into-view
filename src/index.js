import ScrollTo from 'lzb-scrollto';

import defaults from '../config/defaults';
import version from '../config/version';

import inBrowser from './utils/inBrowser';

class ScrollIntoView {
  constructor(el, opt) {
    this.$el = el;
    this.options = {
      ...defaults,
      ...opt,
    };
    this.sanitizeOptions();
    this.init();

    this.version = version;
  }

  init() {
    if (!(this.$el instanceof window.Element) && (this.$el !== window)) {
      throw new Error(`element passed to scrollTo() must be either the window or a DOM element, you passed ${this.$el}!`);
    }

    const targetPosition = this.getTargetPosition();

    const scrollto = new ScrollTo(
      window,
      {
        top: targetPosition.top,
        left: targetPosition.left,
        behavior: this.options.behavior,
      },
    );
    return scrollto;
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

  getTargetPosition() {
    const clientRect = this.$el.getBoundingClientRect();
    const position = {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft,
    };

    const mixWidth = window.innerWidth - this.$el.offsetWidth;
    const mixHeight = window.innerHeight - this.$el.offsetHeight;

    if (this.options.block === 'start') {
      position.top += clientRect.top;
    }

    if (this.options.inline === 'start') {
      position.left += clientRect.left;
    }

    if (this.options.block === 'center') {
      position.top += clientRect.top - Math.floor(mixHeight / 2);
    }

    if (this.options.inline === 'center') {
      position.left += clientRect.left - Math.floor(mixWidth / 2);
    }

    if (this.options.block === 'end') {
      position.top += clientRect.top - mixHeight;
    }

    if (this.options.inline === 'end') {
      position.left += clientRect.left - mixWidth;
    }

    return position;
  }
}

if (inBrowser) {
  window.ScrollIntoView = ScrollIntoView;
  window.console.log('plugin is running browser.');
}

export default ScrollIntoView;
