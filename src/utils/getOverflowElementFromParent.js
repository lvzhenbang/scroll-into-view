function hasScrollbar(el) {
  const typeArr = ['auto', 'scroll', 'overlay'];
  const computeStyle = window.getComputedStyle(el, null);

  return (
    typeArr.indexOf(computeStyle.overflowX) > -1
    || typeArr.indexOf(computeStyle.overflowY) > -1
  );
}

export default function getOverflowElementFromParent(el) {
  if (el === document.body) {
    return document.documentElement;
  }

  const parentEl = el.parentNode;
  if (parentEl === document.body) {
    return document.documentElement;
  }

  if (hasScrollbar(parentEl)) {
    return parentEl;
  }
  return getOverflowElementFromParent(parentEl);
}
