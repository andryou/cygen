// (c) Andrew Y. <andryou@gmail.com>
var aytime;
aytime = '4|\||>|23w';
if (!localStorage['last']) {
	localStorage['last'] = Aes.Ctr.encrypt((new Date).getTime().toString(), 256);
}
aytime = Aes.Ctr.decrypt(localStorage['last'], 256);

if (!localStorage['reset']) {
	localStorage['reset'] = Aes.Ctr.encrypt('86400000', 256);
}
if (!localStorage['len']) {
	localStorage['len'] = Aes.Ctr.encrypt('10', 256);
}
if (localStorage['master'] === undefined || localStorage['master'] == '') {
	chrome.tabs.create({url: chrome.extension.getURL('html/options.html')});
}

localStorage['version'] = Aes.Ctr.encrypt('1.0.1.4', 256);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (sender.id != 'diloniiblgloigeffddhmjkhiijjmjpk' && sender.id != 'dhhigimmoheajpllplpfnencpjnfdneg' && sender.id != 'fpidjgafllhjgcbedlcpfcpdomeheiao' && sender.id != 'jmfkephokdjjlmlelajbgngbcmmpdbpi') {
	// make sure no other Chrome extensions get any funny ideas and try to access your encrypted data
		// && sender.id != 'dhhigimmoheajpllplpfnencpjnfdneg' && sender.id != 'fpidjgafllhjgcbedlcpfcpdomeheiao' && sender.id != 'jmfkephokdjjlmlelajbgngbcmmpdbpi'
		return;
	} else {
		if (request.action == 'getCode') {
			sendResponse({ master: localStorage['master'], stealth: localStorage['stealth'], len: localStorage['len'], last: localStorage['last'], reset: localStorage['reset'] });
		}
		return;
	}
});

function resetmaster() {
	localStorage['master'] = '';
	localStorage['stealth'] = '';
	chrome.tabs.create({url: chrome.extension.getURL('html/options.html')});
}
function lastsave() {
	aytime = '4|\||>|23w';
	localStorage['last'] = Aes.Ctr.encrypt((new Date).getTime().toString(), 256);
	aytime = Aes.Ctr.decrypt(localStorage['last'], 256);
}
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}