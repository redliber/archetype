export function scaleValue(value:number, originalRange:number[], targetRange:number[]) {
    return (value - originalRange[0]) * (targetRange[1] - targetRange[0]) / (originalRange[1] - originalRange[0]) + targetRange[0];
}

export function lerp(start:number, end:number, t:number) {
    const clampedT = Math.max(0, Math.min(1, t));
    return start + (end - start) * clampedT;
  }