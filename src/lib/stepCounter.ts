export function getDisplayedStep(index: number, totalFrames: number): number {
  if (totalFrames <= 0 || index < 0) return 0;

  // Do not increment on the terminal "result" frame.
  if (totalFrames > 1 && index === totalFrames - 1) {
    return Math.max(0, index - 1);
  }

  return index;
}
