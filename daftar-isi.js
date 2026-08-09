<script>
function loadtoc(json) {
    var feed = json.feed;
    var entries = feed.entry;
    var html = '';
    var categories = {};
    
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var publishedDate = new Date(entry.published.$t);
        
        var url = '#';
        for (var j = 0; j < entry.link.length; j++) {
            if (entry.link[j].rel === 'alternate') {
                url = entry.link[j].href;
                break;
            }
        }
        
        var now = new Date();
        var diffTime = now - publishedDate;
        var diffDays = diffTime / (1000 * 60 * 60 * 24);
        var isNew = diffDays <= 7;
        
        var cat = 'Uncategorized';
        if (entry.category) {
            cat = entry.category[0].term;
        }
        
        if (!categories[cat]) {
            categories[cat] = [];
        }
        categories[cat].push({title: title, url: url, isNew: isNew});
    }
    
    for (var cat in categories) {
        html += '<b class="labl"><a href="/search/label/' + encodeURIComponent(cat) + '">' + cat + '</a></b>';
        html += '<ol class="postname">';
        for (var k = 0; k < categories[cat].length; k++) {
            var post = categories[cat][k];
            html += '<li><a href="' + post.url + '">' + post.title + '</a>';
            if (post.isNew) {
                html += ' - <span class="new">New!</span>';
            }
            html += '</li>';
        }
        html += '</ol>';
    }
    
    document.getElementById('toc-content').innerHTML = html;
}
</script>
<script src="/feeds/posts/default?max-results=9999&amp;alt=json-in-script&amp;callback=loadtoc"></script>
