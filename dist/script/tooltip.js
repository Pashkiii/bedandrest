document.addEventListener("DOMContentLoaded", function(event) {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
