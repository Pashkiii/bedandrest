document.addEventListener('DOMContentLoaded', function() {
    function replaceLinkInField(el = null) {
        if (!el) {
            return;
        }

        const val = el.innerText;
        el.innerText = `${location.origin}${val[0] === '/' ? '' : '/'}${val}`;
    }

    function updateLinks() {
        const apartmentFormEl = document.querySelector('#apartment');
        if (!apartmentFormEl) {
            return;
        }

        replaceLinkInField(apartmentFormEl.querySelector('#map-point-value'));
        replaceLinkInField(apartmentFormEl.querySelector('#wifi-link-value'));
    }

    updateLinks();
});
