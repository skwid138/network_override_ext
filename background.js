// Define override rules (you can add additional rules here).
const overrideRules = [
  // You can add more rules here.
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
        },
        {
          "id": 21,
          "type": "Trendspotter",
          "name": "Trendspotter Name",
          "url": "https://example.com/trendspotter",
          "description": "Trendspotter Description",
          "date_created": "2025-01-08T15:31:44.785712Z",
          "date_modified": "2025-01-08T15:31:44.792650Z"
        }
      ]),
      enabled: true
    },
    {
      id: "rule2",
      description: "All Beta Apps",
      // The regular expression is defined as a string.
      pattern: "^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/advanced-app/$",
      overrideData: JSON.stringify([
        { "id": 2, "name": "Creative Audit", "is_beta": true },
        { "id": 1, "name": "Growth Planner", "is_beta": true },
        { "id": 3, "name": "Media Mix Modeling", "is_beta": true }
      ]
      ),
      enabled: false
    },
    {
      id: "rule3",
      description: "No Beta Apps",
      // The regular expression is defined as a string.
      pattern: "^^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/advanced-app/$",
      overrideData: JSON.stringify([
        { "id": 2, "name": "Creative Audit", "is_beta": false },
        { "id": 1, "name": "Growth Planner", "is_beta": false },
        { "id": 3, "name": "Media Mix Modeling", "is_beta": false }
      ]
      ),
      enabled: false
    },
    {
      id: "rule4",
      description: "Has Benchmark Explorer",
      // The regular expression is defined as a string.
      pattern: "^^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/clients(?:/C\\d+)?/core-reports/$",
      overrideData: JSON.stringify([
        {
          "id": 996,
          "name": "Paid Media - Overview",
          "description": "A high-level, integrated view of Paid Media ad platform data; here you can filter by paid channel, ad platform, and Polaris taxonomy dimensions",
          "date_modified": "2024-12-09T18:26:31.575188Z",
          "looker_dashboard_id": "222"
        },
        {
          "id": 1446,
          "name": "Google Analytics 3 - Executive Overview",
          "description": "A channel-level view of Google Analytics 3 data, including performance by device and geo",
          "date_modified": "2025-01-07T22:48:15.287855Z",
          "looker_dashboard_id": "111"
        },
        {
          "id": 1445,
          "name": "Paid Media - Detailed Overview",
          "description": "A detailed view of integrated Paid Media ad platform data; here you can utilize Polaris taxonomy filtering to unlock additional data segmentation",
          "date_modified": "2024-12-19T18:06:39.386120Z",
          "looker_dashboard_id": "333"
        },
        {
          "id": 1368,
          "name": "Creative Insights - Meta Ads",
          "description": "A detailed overview of Meta Ad performance",
          "date_modified": "2024-12-09T18:26:33.924117Z",
          "looker_dashboard_id": "444"
        },
        {
          "id": 979,
          "name": "Paid Media - Blended Platform - Google Analytics 3",
          "description": "A blended view of Google Analytics 3 and Paid Media ad platform data",
          "date_modified": "2024-12-09T18:26:32.319875Z",
          "looker_dashboard_id": "999"
        },
        {
          "id": 1138,
          "name": "Benchmark Explorer",
          "description": "Benchmark Explorer",
          "date_modified": "2024-12-09T18:26:32.319875Z",
          "looker_dashboard_id": "000"
        }
      ]
      
      ),
      enabled: false
    },
    {
      id: "rule5",
      description: "Only Growth Planner App",
      // The regular expression is defined as a string.
      pattern: "^^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/clients(?:/C\d+)?/advanced-apps/$",
      overrideData: JSON.stringify([
        {
          "id": 3,
          "type": "Growth Planner",
          "name": "BIXB-12387 Laura Test",
          "url": "https://example.com/party",
          "description": "Growth Planner description",
          "date_created": "2024-10-23T14:00:04Z",
          "date_modified": "2024-12-12T23:47:21.872478Z"
        }
      ]),
      enabled: false
    },
    {
      id: "rule6",
      description: "Only Reef Client",
      // The regular expression is defined as a string.
      pattern: "^^https://(?:qa\\.)?api\\.polaris\\.(?:wpromote\\.com|test)/core/api/client-portal/clients/$",
      overrideData: JSON.stringify([
        {
          "id": "C00731585",
          "name": "Reef",
          "logo": "https://storage.googleapis.com/wpro-bixby2-qa/clients/C00731585/logo/Screen_Shot_2022-08-07_at_3.26.43_PM.png"
        }
      ]),
      enabled: false
    },
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
  