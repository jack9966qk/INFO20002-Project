function generate_checkboxes(header, position) {
    // given header (string) and a position (jQuery Object)
    // insert appropriate checkboxes before the position
    query = "pivotHeader.py?header=" + header;
    var checkboxes = "<div>";
    
    $.get(query, function(data, status) {
        for (var option in data) {
            checkboxes += "<div>";
            checkboxes += '<input type="checkbox"' + 'name="' + header + '"value="' + option + '">' + option;
            checkboxes += "</div>";
        }
        checkboxes += "</div>";
        position.before(checkboxes);
    })
}
