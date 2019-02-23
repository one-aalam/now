import { useState } from 'react';

const POPPER_DEFAULT_RECT = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};


const useRect = (POPPER_DEFAULT_RECT) => {
  const [ rect, setRect ] = useState(POPPER_DEFAULT_RECT);
  // Rect, imitate a DOM element's rect!
  const virtualReferenceElement = {
    getBoundingClientRect() {
      return rect;
    },
    get clientWidth() {
      return this.getBoundingClientRect().width;
    },
    get clientHeight() {
      return this.getBoundingClientRect().height;
    }
  }

  const handleTextSelection = evt => {
    const selection = document.getSelection();
    const range = selection && selection.rangeCount && selection.getRangeAt(0);
    updateRect(range)
  }

  const updateRect = (range) => {
    let rect;
    if (range) {
      rect = range.getBoundingClientRect();
    } else {
      rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      };
    }
    setRect(rect);
  }

  return [rect, setRect, handleTextSelection, virtualReferenceElement ];
}

export { POPPER_DEFAULT_RECT, useRect };