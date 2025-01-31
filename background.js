// Define override rules (you can add additional rules here).
var overrideRules = [
    {
      id: "rule1",
      description: "Override Advanced Apps",
      // The regular expression is defined as a string.
      pattern: "^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/clients(?:/C\\d+)?/advanced-apps/$",
      overrideData: JSON.stringify([
        {
          "id": 3,
          "type": "Growth Planner",
          "name": "Growth Planner Name",
          "url": "https://example.com/0",
          "description": "Growth Planner Description",
          "date_created": "2024-10-23T14:00:04Z",
          "date_modified": "2024-12-12T23:47:21.872478Z"
        },
        {
          "id": 20,
          "type": "Creative Audit",
          "name": "Creative Audit Name",
          "url": "https://example.com/1",
          "description": "Creative Audit Description",
          "date_created": "2024-12-12T18:52:24.739038Z",
          "date_modified": "2024-12-12T23:47:28.144200Z"
        },
        {
          "id": 21,
          "type": "Media Mix Modeling",
          "name": "MMM",
          "url": "https://example.com/2",
          "description": "Media Mix Modeling Description",
          "date_created": "2025-01-08T15:31:44.785712Z",
          "date_modified": "2025-01-08T15:31:44.792650Z"
        }
      ]),
      enabled: true
    }
    // You can add more rules here.
  ];
  
  // Function to check if any enabled rule matches the current request URL.
  function checkOverride(requestDetails) {
    for (var i = 0; i < overrideRules.length; i++) {
      var rule = overrideRules[i];
      if (!rule.enabled) continue;
      var regex = new RegExp(rule.pattern);
      if (regex.test(requestDetails.url)) {
        return rule;
      }
    }
    return null;
  }
  
  // Listen to every request and check for matching override rules.
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var rule = checkOverride(details);
      if (rule) {
        // Create a data URL with the override JSON.
        var dataUrl = "data:application/json," + encodeURIComponent(rule.overrideData);
        console.log("Overriding " + details.url + " using rule " + rule.id);
        return { redirectUrl: dataUrl };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  
  // Listen for messages from the popup to update rule status.
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleRule") {
      var rule = overrideRules.find(function(r) { return r.id === request.ruleId; });
      if (rule) {
        rule.enabled = request.enabled;
        sendResponse({ status: "ok", rule: rule });
      } else {
        sendResponse({ status: "error", message: "Rule not found" });
      }
    } else if (request.action === "getRules") {
      sendResponse({ rules: overrideRules });
    }
  });
  