// (c) Andrew Y. <andryou@gmail.com>
var bkg = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function () {
	$("#pop_options").click(function() { openTab(chrome.extension.getURL('html/options.html')); });
	$("#pop_chrome").click(function() { openTab('https://chrome.google.com/webstore/detail/cygen/diloniiblgloigeffddhmjkhiijjmjpk'); });
	chrome.extension.sendRequest({ action : "getCode" }, function(response) {
		chrome.windows.getCurrent(function(w) {
			chrome.tabs.getSelected(w.id, function(tab) {
				if (response.master == '' || (parseInt(bkg.Aes.Ctr.decrypt(response.reset, 256)) != 0 && ((new Date).getTime() - bkg.aytime) > parseInt(bkg.Aes.Ctr.decrypt(response.reset, 256)))) {
					bkg.resetmaster();
					window.close();
					return;
				}
				$("#domain").html(gp2_process_uri(tab.url, false));
				$("body").css('minwidth', (parseInt(bkg.Aes.Ctr.decrypt(response.len, 256))*8.5)+'px');
				$("#pass").css('width', (parseInt(bkg.Aes.Ctr.decrypt(response.len, 256))*8.5)+'px').val(sgp_ay(bkg.Aes.Ctr.decrypt(response.master, 256), bkg.Aes.Ctr.decrypt(response.stealth, 256), tab.url, bkg.Aes.Ctr.decrypt(response.len, 256))).select();
			});
		});
	});
});
function openTab(url) {
	chrome.tabs.create({url: url});
	window.close();
}