document.addEventListener("DOMContentLoaded", function () {
    const loadingOverlay = document.getElementById('loading-overlay');
    const dataTableElement = document.getElementById('data-table');

    function loadData() {
        fetch('DRSGME_Broker_Guides_Translations.json')
            .then(response => response.json())
            .then(data => {
                const headers = Object.keys(data[0]);
                const columns = headers.map((header, index) => ({
                    data: header,
                    title: header.replace(/([A-Z])/g, ' $1').trim(),
                }));
                $(document).ready(function () {
                    var table = $('#data-table').DataTable({
                        data: data,
                        columns: columns,
                        dom: '<"top"Bf>rt<"bottom"lip><"clear">',
                        buttons: ['colvis'],
                        stateSave: true,
                        autoWidth: false
                    });
                    loadingOverlay.classList.add('hidden');
                    dataTableElement.classList.remove('hidden');
                });
            })
            .catch(error => {
                console.error('Error loading the data:', error);
                loadingOverlay.classList.add('hidden');
            });
    }
    loadData();
});
