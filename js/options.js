// (c) Andrew Y. <andryou@gmail.com>
/*
var synctimer;
var storageapi = false;
if (typeof chrome.storage !== 'undefined') {
	storageapi = true;
}
*/
var bkg = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function () {
	if (parseInt(bkg.Aes.Ctr.decrypt(localStorage['reset'], 256)) != 0 && ((new Date).getTime() - bkg.aytime) > parseInt(bkg.Aes.Ctr.decrypt(localStorage['reset'], 256))) {
		localStorage['master'] = '';
		localStorage['stealth'] = '';
	}
	if (localStorage['master'] === undefined || localStorage['master'] == '') {
		alert('Please (re-)input a master password (and salt phrase).\r\nMake it long and diverse (use letters, numbers, and symbols), but remember it! (e.g. h4!!o@nd|23w)');
		$("#master").focus();
	}
	if (localStorage['master']) $("#master").val(bkg.Aes.Ctr.decrypt(localStorage['master'], 256));
	if (localStorage['stealth']) $("#stealth").val(bkg.Aes.Ctr.decrypt(localStorage['stealth'], 256));
	if (localStorage['len']) $("#len").val(bkg.Aes.Ctr.decrypt(localStorage['len'], 256));
	if (localStorage['reset']) $("#reset").val(bkg.Aes.Ctr.decrypt(localStorage['reset'], 256));
	$("#close").click(function() {
		bkg.lastsave();
		saveElement('master');
		saveElement('stealth');
		saveElement('len');
		saveElement('reset');
		closeOptions();
	});
});
function closeOptions() {
	window.open('', '_self', '');window.close();
}
function saveElement(id) {
	if ($("#"+id).val()) {
		localStorage[id] = bkg.Aes.Ctr.encrypt($("#"+id).val().toString(), 256);
	} else {
		localStorage[id] = '';
	}
}
/*
function freshSync(mode, force) {
	if (storageapi) {
		window.clearTimeout(synctimer);
		var settingssync = {};
		var simplesettings = '';
		if (force) {
			for (k in localStorage) {
					simplesettings += k+"|"+localStorage[k]+"~";
				}
			}
			simplesettings = simplesettings.slice(0,-1);
			settingssync['sgp_settings'] = simplesettings;
			var milliseconds = (new Date).getTime();
			localStorage['lastSync'] = milliseconds;
			settingssync['lastSync'] = milliseconds;
			chrome.storage.sync.set(settingssync, function() {
				if (chrome.extension.lastError){
					alert(chrome.extension.lastError.message);
				} else {
					// success
				}
			});
		} else {
			synctimer = window.setTimeout(function() { syncQueue() }, 30000);
		}
		return true;
	} else {
		return false;
	}
}
function syncQueue() {
	freshSync(0, true);
}

if (storageapi) {
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		if (typeof changes['lastSync'] !== 'undefined') {
			if (changes['lastSync'].newValue != localStorage['lastSync']) {
				importSync(changes, 1);
			}
		}
	});
	importSyncHandle(0);
}
function importSyncHandle(mode) {
	if (storageapi) {
		chrome.storage.sync.get(null, function(changes) {
			if (typeof changes['lastSync'] !== 'undefined' && typeof changes['sgp_settings'] !== 'undefined') {
				if (confirm("Cygen has detected that you have settings synced on your Google account!\r\n\r\nClick on 'OK' if you want to import the settings from your Google Account.")) {
					importSync(changes, 2);
					return true;
				}
			} else {
				if (confirm("It appears you haven't synced your settings to your Google account yet.\r\n\r\nCygen is about to sync your current settings to your Google account.\r\n\r\nClick on 'OK' if you want to continue.\r\n\r\nIf not, click 'Cancel', and on the other device with your preferred settings, update Cygen and click on OK when you are presented with this message.")) {
					freshSync(0, true);
					return true;
				}
			}
		});
	} else {
		alert('Your current version of Google Chrome does not support settings syncing. Please try updating your Chrome version and try again.');
		return false;
	}
}
function importSync(changes, mode) {
	for (key in changes) {
		if (key == 'sgp_settings') {
			if (mode == '1') var settings = changes[key].newValue.split("~");
			else if (mode == '2') var settings = changes[key].split("~");
			if (settings.length > 0) {
				$.each(settings, function(i, v) {
					if ($.trim(v) != "") {
						settingentry = $.trim(v).split("|");
						if ($.trim(settingentry[1]) != '') {
							localStorage[$.trim(settingentry[0])] = $.trim(settingentry[1]);
						}
					}
				});
			}
		}
	}
	listsSync(mode);
}
*/