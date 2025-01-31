document.addEventListener("DOMContentLoaded", function() {
    var rulesDiv = document.getElementById("rules");
  
    // Request the current override rules from the background script.
    chrome.runtime.sendMessage({ action: "getRules" }, function(response) {
      var rules = response.rules;
      rules.forEach(function(rule) {
        var div = document.createElement("div");
        div.className = "rule";
  
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = rule.enabled;
        checkbox.id = rule.id;
  
        checkbox.addEventListener("change", function() {
          chrome.runtime.sendMessage({
            action: "toggleRule",
            ruleId: rule.id,
            enabled: checkbox.checked
          }, function(response) {
            console.log("Updated rule: ", response);
          });
        });
  
        var label = document.createElement("label");
        label.htmlFor = rule.id;
        label.innerText = rule.description;
  
        div.appendChild(checkbox);
        div.appendChild(label);
        rulesDiv.appendChild(div);
      });
    });
  });
  