function limitTrayHeight(height, actionsIsDisplayed = false) {
  // set min height to match resize button height
  const min = 11;

  // Set max height based on whether task bar is displayed
  const max = actionsIsDisplayed ? window.innerHeight - 45 : window.innerHeight;

  // Ensure height is within range, if not get closest value
  return Math.min(Math.max(height, min), max);
}

export default limitTrayHeight;
