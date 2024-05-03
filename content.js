// content.js

// Function to display an alert message
function showAlert(message) {
  const alertElement = document.createElement('div');
  alertElement.style.position = 'fixed';
  alertElement.style.top = '0';
  alertElement.style.left = '0';
  alertElement.style.width = '100%';
  alertElement.style.backgroundColor = '#FF0000';
  alertElement.style.color = '#FFFFFF';
  alertElement.style.padding = '10px';
  alertElement.style.fontFamily = 'Arial, sans-serif';
  alertElement.style.fontSize = '14px';
  alertElement.style.fontWeight = 'bold';
  alertElement.textContent = message;

  document.body.appendChild(alertElement);
}

// Event listener for messages from the background script
chrome.runtime.onMessage.addListener(function(request) {
  if (request.comparisonResult === 'new') {
    showAlert('Privacy policy has been added to this website!');
  } else if (request.comparisonResult === 'updated') {
    showAlert('Privacy policy has been updated on this website!');
  }
});
