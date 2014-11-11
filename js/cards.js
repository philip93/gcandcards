
function insertGuardians(options) {
    var id = options.id;
    var name = options.name;
    var stars = options.stars;
    var attr = options.attr;
    var place = options.place;
    var border = options.border;
    var shape = options.shape;
    var skill = options.skill;

    id = typeof(id) == 'undefined' ? null : id;
    name = typeof(name) == 'undefined' ? null : name;
    stars = typeof(stars) == 'undefined' ? null : stars;
    attr = typeof(attr) == 'undefined' ? null : attr;
    place = typeof(place) == 'undefined' ? null : place;
    border = typeof(border) == 'undefined' ? null : border;
    shape = typeof(shape) == 'undefined' ? null : shape;
    skill = typeof(skill) == 'undefined' ? null : skill;

    var selector = id == null && name == null && stars == null && attr == null && place == null && border == null && shape == null && skill == null ? Selector.none : Selector.all;
    if (id != null)
        selector = Selector.and(selector, Selector.id(id));
    if (name != null)
        selector = Selector.and(selector, Selector.name(name));
    if (stars != null)
        selector = Selector.and(selector, Selector.stars(stars));
    if (attr != null)
        selector = Selector.and(selector, Selector.attribute(attr));
    if (place != null)
        selector = Selector.and(selector, Selector.place(place));
    if (border != null)
        selector = Selector.and(selector, Selector.border(border));
    if (shape != null)
        selector = Selector.and(selector, Selector.shape(shape));
    if (skill != null)
        selector = Selector.and(selector, Selector.skill(skill));
    var gs = Selector.select(selector);

    gs.sort(Sorting.id).reverse();

    $("#cardtable").html("");

    var t = $("<table></table").addClass("guardians");
    $(t).append($("<tr></tr>").html("<th width='50px'>ID</th><th width='100px'>Name</th><th width='120px'>Image</th><th width='60px'>Avatar</th><th width='200px'>Description</th><th width='80px'>Event</th><th width='80px'>Border</th><th width='120px'>Stars</th><th width='100px'>Place</th><th width='60px'>Shape</th><th width='70px'>Attribute</th><th width='50px'>HP</th><th width='50px'>MP</th><th width='50px'>ATK</th><th width='50px'>DEF</th><th width='50px'>AGI</th><th width='50px'>WIS</th><th width='250px'>Skills</th><th width='250px'>Recommends</th><th width='250px'>Rebirth Recommends</th><th width='300px'>Note</th>"));
    for (var i = 0; i < gs.length; i++) {
        var g = gs[i];
        $(t).append(
          $("<tr></tr>")
            .append($("<td></td>").html(g.id))
            .append($("<td></td>").append(Card.mkextlnk(g))
            )
            .append($("<td></td>").append(
                $("<a href='index.html?id=" + g.id + "' class='gclink'></a>").html(g.getImage(100))
              )
            )
            .append($("<td></td>").html(g.getAvatar(50)))
            .append($("<td></td>").html(g.description))
            .append($("<td></td>").html(g.event.name))
            .append($("<td></td>").html(g.border.name))
            .append($("<td></td>").html(g.getStarsImage()))
            .append($("<td></td>").html(g.place.name))
            .append($("<td></td>").html(g.shape.getImage(50)))
            .append($("<td></td>").html(g.attribute.getImage()))
            .append($("<td></td>").html(g.hp))
            .append($("<td></td>").html(g.mp))
            .append($("<td></td>").html(g.atk))
            .append($("<td></td>").html(g.def))
            .append($("<td></td>").html(g.agi))
            .append($("<td></td>").html(g.wis))
            .append($("<td></td>").html(Skill.toString(g.skills, "<br/>")))
            .append($("<td></td>").html(Skill.toString(g.recommends, "<br/>")))
            .append($("<td></td>").html(Skill.toString(g.recommendsrb, "<br/>")))
            .append($("<td></td>").html(Card.notes[g.id]))
        )
    }
    $("#cardtable")
        .append(t)
        .append("<br/>")
        .append("<span>Number of cards: " + gs.length + "</span>");

    $('body').scrollTop(0);
}

function getCustomOptions() {
    var options = {
        id: new Array(),
        stars: new Array(),
        place: new Array(),
        attr: new Array(),
        border: new Array(),
        shape: new Array(),
        skill: new Array()        
    };
    
    var data = new Array(
        {name: "id", id: "id_selector"},
        {name: "stars", id: "stars_selector"},
        {name: "place", id: "place_selector"},
        {name: "attr", id: "attr_selector"},
        {name: "border", id: "border_selector"},
        {name: "shape", id: "shape_selector"},
        {name: "skill", id: "skill_selector"}
    );
    
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        $("#" + d.id).find("input:checkbox").each(function() {
            var v = $(this).val();
            if ($(this).is(":checked") && typeof v != 'undefined' && v != null && v != "")
                options[d.name].push(v);
        });
    }

    for (var key in options) {
        var value = options[key];
        if (value.length == "")
            options[key] = null;
        else
            options[key] = value.join(",");
    }
    
    return options;
}

function insertCustomOptions(target) {
    var stars = List.seq(1, 6);
    var getid = function(x) {
        return x.id;
    };
    var queries = new Array(
        {name: "id", ignore: 0},
        {name: "stars", ignore: stars.length},
        {name: "place", ignore: Place.all.length},
        {name: "attr", ignore: Attribute.all.length},
        {name: "border", ignore: Border.all.length},
        {name: "shape", ignore: Shape.all.length},
        {name: "skill", ignore: Skill.all.length}
    );

    $(target).append(
        "<p class='header'>ID</p>" +
        "<p><textarea id='id_selector' rows='3' cols ='30'></textarea></p>" +
        "<p class='header'>Stars</p>" +
        "<p id='stars_selector'></p>" +
        "<p class='header'>Encounter</p>" +
        "<p id='place_selector'></p>" +
        "<p class='header'>Attribute</p>" +
        "<p id='attr_selector'></p>" +
        "<p class='header'>Border</p>" +
        "<p id='border_selector'></p>" +
        "<p class='header'>Shape</p>" +
        "<p id='shape_selector'></p>" +
        "<p class='header'>Skill</p>" +
        "<p id='skill_selector'></p>" +
        "<br/>" +
        "<button id='custom_search'>Search</button>"
    );
    
    $("#custom_search")
        .button()
        .click(function() {
            var options = getCustomOptions();
            insertGuardians(options);
        });
        
    var data = new Array(
        { id: "stars_selector", src: stars,
          value: function(x) {return x; }, content: function(x) {
            return List.map(
                    function(x) {return "<img width='16px' src='images/rare_star" + image_ext + "' />";}, 
                    List.seq(0, x)
                  ).join("");
        }},
        { id: "place_selector", src: Place.all,
          value: function(x) {return x.id; }, content: function(x) {return x.name; }},
        { id: "attr_selector", src: Attribute.all,
          value: function(x) {return x.id; }, content: function(x) {return x.getImage() + " " + x.name; }},
        { id: "border_selector", src: Border.all,
          value: function(x) {return x.id; }, content: function(x) {return x.name; }},
        { id: "shape_selector", src: Shape.all,
          value: function(x) {return x.id; }, content: function(x) {return x.getImage(24); }},
        { id: "skill_selector", src: Skill.all,
          value: function(x) {return x.id; }, content: function(x) {return x.name + " (" + x.description + ")"; }}
    );

    for (var i = 0; i < data.length; i++) { 
        var d = data[i];
        $("#" + d.id).each((function(d) {
            return function() {
                $(this).append(
                    $("<label></label>").append(
                        $("<input type='checkbox' value='' checked />")
                            .change(function() {
                                var that = this;
                                var selected = $(this).is(':checked');
                                $("#" + d.id).find("input:checkbox").each(function() {
                                    if (that == this)
                                        return;
                                    $(this).prop('checked', selected);
                                })
                            })
                    )
                    .append(" Select/deselect all")
                ).append("<br/>");
                for (var j = 0; j < d.src.length; j++) {
                    $(this).append(
                        $("<label></label>")
                            .append($("<input type='checkbox' value='" + d.value(d.src[j]) + "' checked />"))
                            .append(" " + d.content(d.src[j]))
                    ).append("<br/>");
                }
            }
        })(d));
    }
}

function cards_init() {
    var args = getURLVars();
    var id = args["id"];
    var name = args["name"];
    var stars = args["stars"];
    var attr = args["attr"];
    var place = args["place"];
    var border = args["border"];
    var shape = args["shape"]
    var skill = args["skill"];

    var data = new Array(
        { id: "by_stars", name: "stars", source: List.seq(1, 6), 
          value: function(x) { return x; },
          description: function(x) {
                return List.map(
                    function(x) {return "<img width='16px' src='images/rare_star" + image_ext + "' />";}, 
                    List.seq(0, x)
                    ).join("");
          } },
        { id: "by_place", name: "place", source: Place.all, 
          value: function(x) { return x.id; },
          description: function(x) { return x.name; } },
        { id: "by_attr", name: "attr", source: Attribute.all, 
          value: function(x) { return x.id; },
          description: function(x) { return x.getImage(16) + " " + x.name; } },
        { id: "by_border", name: "border", source: Border.all, 
          value: function(x) { return x.id; },
          description: function(x) { return x.name; } },
        { id: "by_shape", name: "shape", source: Shape.all, 
          value: function(x) { return x.id; },
          description: function(x) { return x.getImage(32); } },
        { id: "by_skill", name: "skill", source: Skill.all, 
          value: function(x) { return x.id; },
          description: function(x) { return x.name + " (" + x.description + ")"; } }
    );

    var lang = locale.getLanguage() == LANG_JP ? "lang=jp&" : "";
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        for (var j = 0; j < d.source.length; j++) {
            $("#" + d.id).append(
                $("<li></li>").append(
                    $("<a href='javascript:insertGuardians({" + d.name + ": " + d.value(d.source[j]) + "});'></a>").append(d.description(d.source[j]))
                ).append(
                    "<a href='?" + lang + d.name + "=" + d.value(d.source[j]) + "' target='_blank'><img src='images/external-link.png' /></a>"
                )
            );
        }
    }

    $("#filters").accordion({
        collapsible: true,
        heightStyle: "content"
    });
    
    insertCustomOptions($("#custom_selector"));
    
    Nav.appendLanguageSuffix();
    Nav.updateComparisonNumber();
    Nav.disable('nav_cards');
    
    insertGuardians({
      id: id,
      name: name,
      stars: stars,
      attr: attr,
      place: place,
      border: border,
      shape: shape,
      skill: skill
    });
}
