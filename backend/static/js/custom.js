/* Global custom JavaScript
	 - Initializes Bootstrap UI helpers (tooltips/popovers)
	 - Enforces ASCII-digit-only input for telephone fields
	 - Provides a small bootstrap-based toast helper
*/

document.addEventListener('DOMContentLoaded', function () {
	// Initialize Bootstrap tooltips
	if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		tooltipTriggerList.forEach(function (el) { new bootstrap.Tooltip(el); });
	}

	// Initialize Bootstrap popovers
	if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
		var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
		popoverTriggerList.forEach(function (el) { new bootstrap.Popover(el); });
	}

	// Enforce ASCII digits (0-9) on specific inputs
	function enforceAsciiDigitsOnInput(el) {
		if (!el) return;

		el.addEventListener('keydown', function (e) {
			var allowedKeys = ['Backspace','Tab','Enter','Escape','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
			if (allowedKeys.indexOf(e.key) !== -1) return;
			if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x')) return;
			// Allow only ASCII digits
			if (/^[0-9]$/.test(e.key)) return;
			e.preventDefault();
		});

		// Sanitize pasted content to digits only
		el.addEventListener('paste', function (e) {
			e.preventDefault();
			var text = (e.clipboardData || window.clipboardData).getData('text') || '';
			var digits = text.replace(/[^0-9]/g, '');
			var start = el.selectionStart || 0;
			var end = el.selectionEnd || 0;
			var newVal = el.value.slice(0, start) + digits + el.value.slice(end);
			el.value = newVal;
			var pos = start + digits.length;
			try { el.setSelectionRange(pos, pos); } catch (err) {}
			el.dispatchEvent(new Event('input', {bubbles: true}));
		});

		// Input event: remove any non-ASCII digits (covers some mobile keyboard behaviors)
		el.addEventListener('input', function () {
			var cleaned = el.value.replace(/[^0-9]/g, '');
			if (cleaned !== el.value) {
				var pos = el.selectionStart || el.value.length;
				el.value = cleaned;
				try { el.setSelectionRange(pos-1, pos-1); } catch (err) {}
			}
		});
	}

	// Attach enforcement to relevant inputs
	var asciiInputs = document.querySelectorAll('input[type="tel"], input[data-ascii-digits], .mobile-number-input');
	asciiInputs.forEach(function (el) { enforceAsciiDigitsOnInput(el); });

	// Global toast helper using Bootstrap Toast if available
	window.showGlobalToast = function (message, opts) {
		opts = opts || {};
		var delay = opts.delay || 4000;
		var container = document.getElementById('global-toast-container');
		if (!container) {
			container = document.createElement('div');
			container.id = 'global-toast-container';
			container.setAttribute('aria-live', 'polite');
			container.setAttribute('aria-atomic', 'true');
			document.body.appendChild(container);
		}

		var toastEl = document.createElement('div');
		toastEl.className = 'toast align-items-center text-bg-light border-0 mb-2';
		toastEl.setAttribute('role', 'status');
		toastEl.setAttribute('aria-live', 'polite');
		toastEl.setAttribute('aria-atomic', 'true');
		toastEl.innerHTML = '<div class="d-flex"><div class="toast-body">' + (message || '') + '</div>' +
			'<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>';
		container.appendChild(toastEl);

		if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
			var t = new bootstrap.Toast(toastEl, { delay: delay });
			t.show();
			toastEl.addEventListener('hidden.bs.toast', function () { toastEl.remove(); });
		} else {
			setTimeout(function () { toastEl.remove(); }, delay);
		}
	};

});

        