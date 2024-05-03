// background.js

// Function to compare privacy policies
function comparePrivacyPolicies(currentPolicy, storedPolicy) {
  // Compare the current privacy policy with the stored one
  if (currentPolicy === storedPolicy) {
    return 'unchanged';
  } else if (storedPolicy === '') {
    return 'new';
  } else {
    return 'updated';
  }
}

// Function to handle website visits
function handleWebsiteVisit(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    // Get the current privacy policy from the webpage
    chrome.tabs.executeScript(tabId, { code: 'document.querySelector("meta[name=\'privacy-policy\']").content' }, function(result) {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving privacy policy:', chrome.runtime.lastError);
        return;
      }

      const currentPrivacyPolicy = result[0] || '';

      // Retrieve the stored privacy policy for this website
      chrome.storage.local.get(tab.url, function(data) {
        const storedPrivacyPolicy = data[tab.url] || '';

        // Compare the privacy policies
        const comparisonResult = comparePrivacyPolicies(currentPrivacyPolicy, storedPrivacyPolicy);

        // Store the current privacy policy for future comparisons
        chrome.storage.local.set({ [tab.url]: currentPrivacyPolicy }, function() {
          if (chrome.runtime.lastError) {
            console.error('Error storing privacy policy:', chrome.runtime.lastError);
            return;
          }

          // Send a message to the content script with the comparison result
          chrome.tabs.sendMessage(tabId, { comparisonResult });
        });
      });
    });
  }
}

// Event listener for website visits
chrome.tabs.onUpdated.addListener(handleWebsiteVisit);
