// Saves options to chrome.storage.sync.
function save_options() {
    var reloadOption = document.getElementById('reloadOption').value;
  chrome.storage.sync.set({
      currentWindow: reloadOption,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value currentWindow: 'true'
  chrome.storage.sync.get({
      currentWindow: 'true',
  }, function(items) {
      document.getElementById('reloadOption').value = items.currentWindow;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('reloadOption').addEventListener('change',
    save_options);
