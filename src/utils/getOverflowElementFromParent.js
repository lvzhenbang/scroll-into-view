function hasScrollbar(el) {
  const typeArr = ['auto', 'scroll', 'overlay'];
  const computeStyle = window.getComputedStyle(el, null);

  return (
    typeArr.indexOf(computeStyle.overflowX) > -1
    || typeArr.indexOf(computeStyle.overflowY) > -1
  );
}

export default function getOverflowElementFromParent(element, fixed) {
  const overflowArr = [];
  let childEl = element;

  const getOverflowObj = (el) => {
    const parentEl = el.parentNode;

    if (childEl === document.body || parentEl === document.body) {
      overflowArr.unshift({
        parent: document.documentElement,
        child: childEl,
      });
      return overflowArr;
    }

    if (hasScrollbar(parentEl)) {
      overflowArr.unshift({
        parent: parentEl,
        child: childEl,
      });
      if (fixed) return overflowArr;
      childEl = parentEl;
    }

    return getOverflowObj(parentEl);
  };

  return getOverflowObj(element);
}
