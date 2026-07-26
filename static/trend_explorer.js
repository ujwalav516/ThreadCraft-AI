function searchTrends() {

    const query = document
        .getElementById("searchInput")
        .value
        .trim();

    if (query === "") {

        window.location = "/trends";

        return;

    }

    window.location =
        "/trends?q=" + encodeURIComponent(query);

}