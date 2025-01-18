document.addEventListener("DOMContentLoaded", function(event) {
	(function instructionCollapse() {
		const btn = document.getElementById('wifi-collapse-instruction-btn');
		const block = document.getElementById('wifi-collapse-instruction-block');
		if (!btn || !block) return;
		const collapse = () => {
			const SHOW = '--show';
			if (block.classList.contains(SHOW)) {
				block.classList.remove(SHOW);
			} else {
				block.classList.add(SHOW);
			}
		};
		btn.addEventListener('click', collapse);
	})();

	(function copyWifiPassword(){
		const btn = document.getElementById('wifi-copy-btn');
		if (!btn) return;
		const copyPassword = async () => {
			const password = (document.getElementById('wifi-password')?.value || '').toString().trim();
			await navigator.clipboard.writeText(password);
		};
		btn.addEventListener('click', copyPassword);
	})();
});