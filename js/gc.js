
var localsite = "";
var remotesite = "http://gccards.web.fc2.com/";
var sitebase = localsite;
var selfcheck = false;
var image_ext = ".jpg";

/**
 * General purpose functions.
 */
var List = {
    fold_left: function(f, x, l) {
        if (l.length == 0)
            return x;
        else
            return List.fold_left(f, f(x, l[0]), l.slice(1));
    },
    map: function(f, l) {
        if (l.length == 0)
            return l;
        else {
            var res = List.map(f, l.slice(1));
            res.unshift(f(l[0]));
            return res;
        }
    },
    clear: function(l) {
        while(l.length > 0)
            l.pop();
    },
    seq: function(x, y) {
        var res = new Array();
        for (var i = x; i < y; i++)
            res.push(i);
        return res;
    },
    mem: function(x, l) {
        for (var k in l) {
            var v = l[k];
            if (x == v)
                return true;
        }
        return false;
    },
    iter: function(f, l) {
        for (var i = 0; i < l.length; i++)
            f(l[i]);
    },
    exists: function(f, l) {
        for (var i = 0; i < l.length; i++)
            if (f(l[i]))
                return true;
        return false;
    },
    flatten: function(l) {
        var res = [];
        for (var i = 0; i < l.length; i++)
            res = res.concat(l[i]);
        return res;
    }
}

Array.prototype.remove = function(v) { 
    var idx = this.indexOf(v);
    this.splice(idx == -1 ? this.length : idx, 1); 
}

function getStarsText(stars) {
    var str = "<span class='stars" + stars + "'>";
    for (var i = 0; i < stars; i++)
        str += "★";
    str += "</span>";
    return str;
}

/** Apply buff/debuff skills. */
function applySkills(skills, status) {
    var hp = 0;
    var mp = 0;
    var atk = 0;
    var def = 0;
    var agi = 0;
    var wis = 0;
        
    for (var i = 0; i < skills.length; i++) {
        var s = skills[i];
        if (s.hp != 0)
            hp += s.hp;
        if (s.mp != 0)
            mp += s.mp;
        if (s.atk != 0)
            atk += s.atk;
        if (s.def != 0)
            def += s.def;
        if (s.agi != 0)
            agi += s.agi;
        if (s.wis != 0)
            wis += s.wis;
    }
    status.hp = Math.floor(status.hp * (1 + hp));
    status.mp = Math.floor(status.mp * (1 + mp));
    status.atk = Math.floor(status.atk * (1 + atk));
    status.def = Math.floor(status.def * (1 + def));
    status.agi = Math.floor(status.agi * (1 + agi));
    status.wis = Math.floor(status.wis * (1 + wis));
}



/** ======================================== Places ======================================== */
var Place = (function() {
    /** 
     * Place: ID, Aliases 
     * The ID will be used as the index in locale.places.
     */
    var data = new Array (
        new Array(0, new Array("plains")),           // Berneside Plains
        //new Array(1, new Array("plains_night")),     // Berneside Plains (Night)
        new Array(1, new Array("volcano")),          // Glaverow Volcanic Zone
        //new Array(3, new Array("volcano_night")),    // Glaverow Volcanic Zone (Night)
        new Array(2, new Array("snowfield")),        // Storm Reach Snowfield
        //new Array(5, new Array("snowfield_night")),  // Storm Reach Snowfield (Night)
        new Array(3, new Array("desert")),           // Deadmoon Desert
        //new Array(7, new Array("desert_night")),     // Deadmoon Desert (Night)
        new Array(4, new Array("ocean")),            // Cerulean Deep
        //new Array(9, new Array("ocean_night")),      // Cerulean Deep (Night)
        //new Array(12, new Array("golbez")),          // Grab-a-Golbez Campaign
		new Array(5, new Array("invitation")),      // Invitation Bonus
        new Array(6, new Array("coliseum")),        // Coliseum Rewards
        new Array(7, new Array("fp")),              // Friend Points
        new Array(8, new Array("trials")),          // Hall of Trials
        //new Array(15, new Array("trials2")),         // Hall of Trials II
        //new Array(6, new Array("gold_slime")),      // Special Gold Present
        new Array(9, new Array("others")),          // Other Bonus
        //new Array(18, new Array("quests")),          // Quests
        //new Array(19, new Array("login")),           // Login Rewards
        new Array(10, new Array("grounds")),         // All Hunting Grounds
		new Array(11, new Array("deadman"))			//Deadman's cross-over
        //new Array(21, new Array("crimson_keep")),    // Crimson Keep
        //new Array(22, new Array("black_snow")),      // 聖夜に舞い散る黒い雪
        //new Array(23, new Array("zeus"))             // ゼウス星雲
    );

    var places = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var place = {
            id: d[0],
            name: locale.places[d[0]],
            mklnk: function() {
                return "<a href='cards.html?place=" + this.id + "'>" + this.name + "</a>";
            }
        };
        places.all[i] = place;
        for (var j = 0; j < d[1].length; j++) {
            var alias = d[1][j];
            places[alias] = place;
        }
    }

    return places;
})();
/** ======================================== End of Places ======================================== */



/** ======================================== Events ======================================== */
var Event = (function() {
    /** 
     * Event: ID, Aliases 
     * The ID will be used as the index in locale.events.
     */
    var data = new Array (
        new Array(0,  new Array("none")),              // None
        new Array(1,  new Array("ff4")),               // FFIV
        new Array(2,  new Array("ff5")),               // FFV
        new Array(3,  new Array("dragon")),            // Wild Dragon Hunter
        new Array(4,  new Array("bahamut")),           // Bahamut's Descent
        new Array(5,  new Array("gilgamesh")),         // Epic of Gilgamesh
        new Array(6,  new Array("trials")),            // Hall of Trials
        new Array(7,  new Array("pixie")),             // Rainbow Pixie Event
        new Array(8,  new Array("serpents")),          // Sevenstone Serpents Event
        new Array(9,  new Array("weapons")),           // Seven Deadly Weapons Event
        new Array(10, new Array("slime")),             // Mass Slime Panic
        new Array(11, new Array("trials2")),           // Hall of Trials II
        new Array(12, new Array("gold_slime")),        // Gold Slime
        new Array(13, new Array("dengeki")),           // Dengeki Game Appli
        new Array(14, new Array("okaeri")),            // Okaeri
        new Array(15, new Array("famitsu")),           // Famitsu App Bonus
        new Array(16, new Array("chess")),             // Chess Guardians
        new Array(17, new Array("ff11")),              // FFXI 10 Years
        new Array(18, new Array("bugbear")),           // Bugbear's Nightmare
        new Array(19, new Array("kingdom_conquest2")), // Kingdom Conquest II
        new Array(20, new Array("fisherman")),         // Fisherman's Cup
        new Array(21, new Array("summer")),            // Summer Hunt
        new Array(22, new Array("stinging")),          // On Stinging Tides
        new Array(23, new Array("ff14")),              // Final Fantasy XIV
        new Array(24, new Array("tgs2012")),           // Tokyo Game Show 2012
        new Array(25, new Array("graeae")),            // Graeae
        new Array(26, new Array("tgs2013")),           // Tokyo Game Show 2013
        new Array(27, new Array("sweet_nightmare")),   // Sweet Nightmare
        new Array(28, new Array("iphone_cover")),
        new Array(29, new Array("pink_slime")),
        new Array(30, new Array("ff13")),              // Lightning Returns FFXIII
        new Array(31, new Array("crimson_keep")),      // Crimson Keep
        new Array(32, new Array("chocobo_eater")),     // Chocobo Eater
        new Array(33, new Array("black_snow")),        // 聖夜に舞い散る黒い雪
        new Array(34, new Array("famitsu10")),         // ファミ通App vol.10 購入特典
        new Array(35, new Array("ffx_x2_hd_remaster")),     // FINAL FANTASY X | X-2 HD Remaster 購入特典
        new Array(36, new Array("famitsu12")),          // ファミ通App vol.12 購入特典
		new Array(37, new Array("holidayhunt")),			//Christmas 2013
		new Array(38, new Array("deadman"))				//Deadman's cross
    );

    var events = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var event = {
            id: d[0],
            name: locale.events[d[0]]
        };
        events.all[i] = event;
        for (var j = 0; j < d[1].length; j++) {
            var alias = d[1][j];
            events[alias] = event;
        }
    }

    return events;
})();
/** ======================================== End of Events ======================================== */



/** ======================================== Borders ======================================== */
var Border = (function() {
    /** 
     * Border: ID, Aliases 
     * The ID will be used as the index in locale.borders.
     */
    var data = new Array (
        new Array(0, new Array("none")),     // None
        new Array(1, new Array("lesser")),   // Lesser
        new Array(2, new Array("great")),    // Great
        new Array(3, new Array("mighty")),   // Mighty
        new Array(4, new Array("almighty"))  // Almighty
    );

    var borders = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var border = {
            id: d[0],
            name: locale.borders[d[0]]
        };
        borders.all[i] = border;
        for (var j = 0; j < d[1].length; j++) {
            var alias = d[1][j];
            borders[alias] = border;
        }
    }

    return borders;
})();
/** ======================================== End of Borders ======================================== */




/** ======================================== Attributes ======================================== */
var Attribute = (function() {
    /**
     * Attribute: ID, Aliases, Criticals, Weaks
     * The ID will be used as the index in locale.attributes.
     */
    var data = new Array (
        new Array(0, new Array("fire"),      new Array(4,  6),  new Array(0,  1,  8)), // Fire
        new Array(1, new Array("water"),     new Array(0,  7),  new Array(1,  3,  5)), // Water
        new Array(2, new Array("earth"),     new Array(3,  5),  new Array(2,  4,  9)), // Earth
        new Array(3, new Array("lightning"), new Array(1,  7),  new Array(2,  3,  8)), // Lightning
        new Array(4, new Array("wind"),      new Array(2,  9),  new Array(0,  4,  6)), // Wind
        new Array(5, new Array("poison"),    new Array(1,  9),  new Array(2,  5,  6)), // Poison
        new Array(6, new Array("death"),     new Array(4,  5),  new Array(0,  6,  7)), // Death
        new Array(7, new Array("mecha"),     new Array(6,  8),  new Array(1,  3,  7)), // Mecha
        new Array(8, new Array("light"),     new Array(0,  3),  new Array(7,  8,  9)), // Light
        new Array(9, new Array("darkness"),  new Array(2,  8),  new Array(4,  5,  9)), // Darkness
        new Array(10, new Array("none"),     new Array(), new Array())                 // None
    );

    var attributes = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var attr = {
            id: d[0],
            name: locale.attributes[d[0]],
            criticals: d[2],
            weaks: d[3],
            /* Returne true if this attribute has strength over the specified attribute. */
            isCriticalTo: function (e) {
                for (var i = 0; i < this.criticals.length; i++) {
                    if (this.criticals[i] == e.id)
                        return true;
                }
                return false;
            },
            /* Returne true if this attribute is blocked by the specified attribute. */
            isBlockedBy: function(e) {
                for (var i = 0; i < this.weaks.length; i++) {
                    if (this.weaks[i] == e.id)
                        return true;
                }
                return false;
            },
            getImage: function() {
                width = typeof(width) == 'undefined' ? 20 : width;
                return "<img width='" + width + "px' src='images/attributes/" + this.id + image_ext + "' />";
            },
            getCriticalTo: function() {
                var res = new Array();
                for (var i = 0; i < attributes.all.length; i++) {
                    var attr = attributes.all[i];
                    if (this.isCriticalTo(attr))
                        res.push(attr);
                }
                return res;
            },
            getBlockedBy: function() {
                var res = new Array();
                for (var i = 0; i < attributes.all.length; i++) {
                    var attr = attributes.all[i];
                    if (this.isBlockedBy(attr))
                        res.push(attr);
                }
                return res;
            },
            /* Returns the attributes that have strength over this one. */
            getCriticalBy: function() {
                var res = new Array();
                for (var i = 0; i < attributes.all.length; i++) {
                    var attr = attributes.all[i];
                    if (attr.isCriticalTo(this))
                        res.push(attr);
                }
                return res;
            },
            /* Returns the attributes that are blocked by this one. */
            getBlocks: function() {
                var res = new Array();
                for (var i = 0; i < attributes.all.length; i++) {
                    var attr = attributes.all[i];
                    if (attr.isBlockedBy(this))
                        res.push(attr);
                }
                return res;
            }
        };
        attributes.all[i] = attr;
        for (var j = 0; j < d[1].length; j++) {
            var alias = d[1][j];
            attributes[alias] = attr;
        }
    }

    return attributes;
})();
/** ======================================== End of Attributes ======================================== */



/** ======================================== Types ======================================== */
var Type = (function() {
    /*
     * Type: ID Name Shortname Aliases HP MP ATK DEF AGI WIS RebirthType NormalType
     */
    var data = new Array (
        new Array(0, locale.types[0],   "C", new Array("cool"),           1,    1,    1,    1,    1,    1,  8, -1), // Cool
        new Array(1, locale.types[1],   "O", new Array("chaotic"),      1.1,    1,    1,    1,    1,  0.9,  9, -1), // Chaotic
        new Array(2, locale.types[2],   "X", new Array("sexy"),         0.9,  1.1,    1,    1,    1,    1, 10, -1), // Sexy
        new Array(3, locale.types[3],   "P", new Array("powerful"),       1,    1,  1.1,    1,  0.9,    1, 11, -1), // Powerful
        new Array(4, locale.types[4],   "R", new Array("brave"),          1,  0.9,    1,  1.1,    1,    1, 12, -1), // Brave
        new Array(5, locale.types[5],   "F", new Array("fast"),           1,    1,    1,  0.9,  1.1,    1, 13, -1), // Fast
        new Array(6, locale.types[6],   "I", new Array("intelligent"),    1,    1,  0.9,    1,    1,  1.1, 14, -1), // Intelligent
        new Array(7, locale.types[7],   "A", new Array("ace"),          1.1,  1.1,  1.1,  1.1,  1.1,  1.1, 15, -1), // Ace
        new Array(8, locale.types[8],   "C", new Array("coolr"),          1,    1,    1,    1,    1,    1, -1,  0), // Cool
        new Array(9, locale.types[9],   "D", new Array("bold"),        1.15,    1,    1,    1,    1, 0.85, -1,  1), // Bold
        new Array(10, locale.types[10], "E", new Array("erotic"),      0.85, 1.15,    1,    1,    1,    1, -1,  2), // Erotic
        new Array(11, locale.types[11], "B", new Array("berserk"),        1,    1, 1.15,    1, 0.85,    1, -1,  3), // Berserk
        new Array(12, locale.types[12], "T", new Array("stalwart"),       1, 0.85,    1, 1.15,    1,    1, -1,  4), // Stalwart
        new Array(13, locale.types[13], "S", new Array("sonic"),          1,    1,    1, 0.85, 1.15,    1, -1,  5), // Sonic
        new Array(14, locale.types[14], "W", new Array("wise"),           1,    1, 0.85,    1,    1, 1.15, -1,  6), // Wise
        new Array(15, locale.types[15], "A", new Array("acer"),         1.1,  1.1,  1.1,  1.1,  1.1,  1.1, -1,  7)  // Ace
    );
    var hete_types = new Array(
        new Array(16, locale.types[16], "O", new Array("chaoticr"),     1.1,    1,    1,    1,    1,  0.9, -1, 1), // ChaoticR
        new Array(17, locale.types[17], "X", new Array("sexyr"),        0.9,  1.1,    1,    1,    1,    1, -1, 2),  // SexyR
        new Array(18, locale.types[18], "P", new Array("powerfulr"),      1,    1,  1.1,    1,  0.9,    1, -1, 3),  // PowerfulR
        new Array(19, locale.types[19], "R", new Array("braver"),         1,  0.9,    1,  1.1,    1,    1, -1, 4),  // BraveR
        new Array(20, locale.types[20], "F", new Array("fastr"),          1,    1,    1,  0.9,  1.1,    1, -1, 5),  // FastR
        new Array(21, locale.types[21], "I", new Array("intelligentr"),   1,    1,  0.9,    1,    1,  1.1, -1, 6)   // IntelligentR
    );
    if (getCookie(COOKIE_LOAD_HETEROGENEOUS_TYPES, "") == "true")
        data = data.concat(hete_types);

    var types = {
        all: new Array()
    };
    var types_map = {};
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var type = {
            id: d[0],
            name: d[1],
            shortname: d[2],
            hp: d[4],
            mp: d[5],
            atk: d[6],
            def: d[7],
            agi: d[8],
            wis: d[9],
            rb: d[10],
            norm: d[11],
            getRebirthType: function() {
                if (this.rb == -1)
                    return null;
                else
                    return types.all[this.rb];
            },
            getNormalType: function() {
                if (this.norm == -1)
                    return null;
                else
                    return types.all[this.norm];
            },
            isRebirthType: function() {
                return this.getRebirthType() == null;
            }
        };
        types.all[i] = type;
        types_map[type.id] = type;
        for (var j = 0; j < d[3].length; j++) {
            var alias = d[3][j];
            types[alias] = type;
        }
    }

    types.get = function(id) {
            return id in types_map ? types_map[id] : null;
    };

    return types;
})();
/** ======================================== End of Types ======================================== */



/** ======================================== Skills ======================================== */
var Skill = (function() {
    /*
     * Skill: ID Type Aliases Cost(HP) Cost(MP) Stone HP MP ATK DEF AGI WIS Attribute Level
     * Type: 0 = attack, 1 = buff/debuff, 2 = others
     */
    var data = new Array (
        new Array(0, 0, "slash1",       0,     150, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 1), // Slash
        new Array(1, 0, "slash2",       0,     300, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 2), // Cross Slash
        new Array(2, 0, "slash3",       0,     600, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 3), // Hard Slash
        new Array(3, 0, "slash4",       0,    1200, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 4), // Thousand Slash
        new Array(4, 0, "physical1",    0,     150, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 1), // Hard Blow
        new Array(5, 0, "physical2",    0,     300, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 2), // Heavy Blow
        new Array(6, 0, "physical3",    0,     600, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 3), // Double Impact
        new Array(7, 0, "physical4",    0,    1200, 1, 0, 0, 0, 0, 0, 0, Attribute.none, 4), // Storm Impact
        new Array(8, 0, "fire1",        0,     150, 1, 0, 0, 0, 0, 0, 0, Attribute.fire, 1), // Burning Beat (Fire +1)
        new Array(9, 0, "fire2",        0,     300, 1, 0, 0, 0, 0, 0, 0, Attribute.fire, 2), // Burning Strike (Fire +2)
        new Array(10, 0, "fire3",       0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.fire, 3),    // Explosion (Fire +3)
        new Array(11, 0, "fire4",       0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.fire, 4),    // Meteor Storm (Fire +4)
        // new Array(12, 0, "fire4x",      0, 1400, 1, 0, 0, 0, 0, 0, 0, Attribute.fire, 5),    // Meteor Swarm (Fire +4x)
        new Array(12, 0, "water1",      0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.water, 1), // Aqua Splash
        new Array(13, 0, "water2",      0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.water, 2), // Aqua Shot
        new Array(14, 0, "water3",      0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.water, 3), // Aqua Burst
        new Array(15, 0, "water4",      0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.water, 4), // Maelstrom
        new Array(16, 0, "earth1",      0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.earth, 1), // Ice Needle
        new Array(17, 0, "earth2",      0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.earth, 2), // Ice Spike
        new Array(18, 0, "earth3",      0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.earth, 3), // Rock Bite
        new Array(19, 0, "earth4",      0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.earth, 4), // Earthquake
        new Array(20, 0, "lightning1",  0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.lightning, 1), // Thunderbolt
        new Array(21, 0, "lightning2",  0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.lightning, 2), // Thunder Strike
        new Array(22, 0, "lightning3",  0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.lightning, 3), // Call Lightning
        new Array(23, 0, "lightning4",  0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.lightning, 4), // Chain Lightning
        new Array(24, 0, "wind1",       0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.wind, 1), // Wind Cutter
        new Array(25, 0, "wind2",       0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.wind, 2), // Wind Edge
        new Array(26, 0, "wind3",       0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.wind, 3), // Whirlwind
        new Array(27, 0, "wind4",       0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.wind, 4), // Tornado
        new Array(28, 0, "poison1",     0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.poison, 1), // Poison Bubble
        new Array(29, 0, "poison2",     0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.poison, 2), // Poison Mist
        new Array(30, 0, "poison3",     0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.poison, 3), // Poison Field
        new Array(31, 0, "poison4",     0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.poison, 4), // Venom Riot
        new Array(32, 0, "death1",      0,  150, 0, 0, 0, 0, 0, 0, 0, Attribute.death, 1), // Gaze of Death
        new Array(33, 0, "death2",      0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.death, 2), // Touch of Death
        new Array(34, 0, "death3",      0,  600, 0, 0, 0, 0, 0, 0, 0, Attribute.death, 3), // Embrace of Death
        new Array(35, 0, "death4",      0, 1200, 0, 0, 0, 0, 0, 0, 0, Attribute.death, 4), // Kiss of Death
        new Array(36, 0, "light1",      0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.light, 1), // Holy Light
        new Array(37, 0, "light2",      0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.light, 2), // Shine Smite
        new Array(38, 0, "light3",      0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.light, 3), // Shine Burst
        new Array(39, 0, "light4",      0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.light, 4), // Vanish
        new Array(40, 0, "darkness1",   0,  150, 1, 0, 0, 0, 0, 0, 0, Attribute.darkness, 1), // Darkness
        new Array(41, 0, "darkness2",   0,  300, 1, 0, 0, 0, 0, 0, 0, Attribute.darkness, 2), // Dark Pain
        new Array(42, 0, "darkness3",   0,  600, 1, 0, 0, 0, 0, 0, 0, Attribute.darkness, 3), // Dark Psalm
        new Array(43, 0, "darkness4",   0, 1200, 1, 0, 0, 0, 0, 0, 0, Attribute.darkness, 4), // Nightmare
        new Array(44, 1, "atk10",       0,  100, 0, 0, 0,  0.1, 0, 0, 0, Attribute.none, 0), // Might
        new Array(45, 1, "atk20",       0,  200, 0, 0, 0,  0.2, 0, 0, 0, Attribute.none, 0), // Greater Might
        new Array(46, 1, "atk25",       0,  locale.getLanguage() == LANG_JP ? 600 : 400, 0, 0, 0, 0.25, 0, 0, 0, Attribute.none, 0), // Fount of Strength
        new Array(47, 1, "def10",       0,  100, 0, 0, 0, 0,  0.1, 0, 0, Attribute.none, 0), // Protect
        new Array(48, 1, "def20",       0,  200, 0, 0, 0, 0,  0.2, 0, 0, Attribute.none, 0), // Greater Protect
        new Array(49, 1, "def25",       0,  locale.getLanguage() == LANG_JP ? 600 : 400, 0, 0, 0, 0, 0.25, 0, 0, Attribute.none, 0), // Stoic Stance
        new Array(50, 1, "def40",       0,  1000, 0, 0, 0, 0, 0.4, 0, 0, Attribute.none, 0), // Ultimate Guard
        new Array(51, 1, "agi10",       0,  100, 0, 0, 0, 0, 0,  0.1, 0, Attribute.none, 0), // Haste
        new Array(52, 1, "agi20",       0,  200, 0, 0, 0, 0, 0,  0.2, 0, Attribute.none, 0), // Greater Haste
        new Array(53, 1, "agi25",       0,  locale.getLanguage() == LANG_JP ? 600 : 400, 0, 0, 0, 0, 0, 0.25, 0, Attribute.none, 0), // Quickstride
        new Array(54, 1, "wis10",       0,  100, 0, 0, 0, 0, 0, 0,  0.1, Attribute.none, 0), // Cunning
        new Array(55, 1, "wis20",       0,  200, 0, 0, 0, 0, 0, 0,  0.2, Attribute.none, 0), // Greater Cunning
        new Array(56, 1, "wis25",       0,  locale.getLanguage() == LANG_JP ? 600 : 400, 0, 0, 0, 0, 0, 0, 0.25, Attribute.none, 0), // Mental Geyser
        new Array(57, 1, "atkdef10",    0,  400, 0, 0, 0, 0.1, 0.1,   0,   0, Attribute.none, 0), // Ursince Aspect
        new Array(58, 1, "atkagi10",    0,  400, 0, 0, 0, 0.1,   0, 0.1,   0, Attribute.none, 0), // Feline Aspect
        new Array(59, 1, "atkwis10",    0,  400, 0, 0, 0, 0.1,   0,   0, 0.1, Attribute.none, 0), // Simian Aspect
        new Array(60, 1, "defagi10",    0,  400, 0, 0, 0,   0, 0.1, 0.1,   0, Attribute.none, 0), // Avian Aspect
        new Array(61, 1, "defwis10",    0,  400, 0, 0, 0,   0, 0.1,   0, 0.1, Attribute.none, 0), // Chelonian Aspect
        new Array(62, 1, "agiwis10",    0,  400, 0, 0, 0,   0,   0, 0.1, 0.1, Attribute.none, 0), // Vulpine Aspect
        new Array(63, 1, "datk20",      0,  150, 0, 0, 0, -0.2,    0,    0,    0, Attribute.none, 0), // Weakness
        new Array(64, 1, "ddef20",      0,  150, 0, 0, 0,    0, -0.2,    0,    0, Attribute.none, 0), // Lower Defense
        new Array(65, 1, "dagi20",      0,  150, 0, 0, 0,    0,    0, -0.2,    0, Attribute.none, 0), // Slow
        new Array(66, 1, "dagi40",      0, 1000, 0, 0, 0,    0,    0, -0.4,    0, Attribute.none, 0), // Gravity Wave
        new Array(67, 1, "dwis20",      0,  150, 0, 0, 0,    0,    0,    0, -0.2, Attribute.none, 0), // Mind Blast
        new Array(68, 1, "dwis40",      0, 1000, 0, 0, 0,    0,    0,    0, -0.4, Attribute.none, 0), // Psychic Blast
        new Array(69, 2, "heal",        0,  100, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Heal
        new Array(70, 2, "majorheal",   0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Greater Heal
        new Array(71, 2, "life",        0,  450, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Life Drain
        new Array(72, 2, "mana",        0,   20, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Energy Drain
        new Array(73, 2, "ls",          0,    1, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Last Stand
        new Array(74, 2, "sd",          0,    0, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Self-destruct
        new Array(75, 2, "qs",          0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Quick Strike
        new Array(76, 2, "revival",     0,    1, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Revival
        new Array(77, 2, new Array("ep", "pulse"),        0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Ethereal Pulse
        new Array(78, 0, new Array("gs", "smash"),        0, 1200, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Gigant Smash
        new Array(79, 2, "ds",                            0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Deft Step
        new Array(80, 2, "sap",                           0,  600, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0), // Sap
        new Array(81, 2, new Array("fb", "multiblock"),   0,  600, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // Full Barrier (Attribute resistance)
        new Array(82, 2, new Array("mr", "mindbreak"),    0,  600, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // Mind Rift (Confusion)
        new Array(83, 2, new Array("dr", "counter"),      0,  300, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // Deadly Reflex (Counterattack)
        new Array(84, 0, "mecha4",                        0, 1200, 0, 0, 0, 0, 0, 0, 0, Attribute.mecha, 4),     // Phantom Gear (Mecha + 4)
        new Array(85, 0, new Array("bg", "soulslash"), 1000,    0, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // Blood Gambit
        new Array(86, 2, "curse",                         0,    0, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // Mana Martyr (Deals MP damage on death)
        new Array(87, 1, "datk40",                        0, 1000, 0, 0, 0, -0.4, 0, 0, 0, Attribute.none, 0),   // ハードプレッシャー (敵攻撃-40%)
        new Array(88, 2, "cd",                            0, 1400, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // クラッシュドレイン (HP吸収大)
        new Array(89, 2, new Array("pa", "poisonattack"), 0,    0, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0),      // ポイズンアタック (継続ダメージ)
        new Array(90, 2, "sleep",                         0,    0, 0, 0, 0, 0, 0, 0, 0, Attribute.none, 0)       // ディープスリープ (行動不能)
    );

    var skills = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var skill = {
            id: d[0],
            type: d[1],
            name: locale.skills[d[0]][0],
            description: locale.skills[d[0]][1],
            hp_cost: d[3],
            cost: d[4],
            stone: d[5],
            hp: d[6],
            mp: d[7],
            atk: d[8],
            def: d[9],
            agi: d[10],
            wis: d[11],
            attribute: d[12],
            level: d[13],
            isBuff: function() {
                return this.hp > 0 || this.mp > 0 || this.atk > 0 || this.def > 0 || this.agi > 0 || this.wis > 0;
            },
            isDebuff: function() {
                return this.hp < 0 || this.mp < 0 || this.atk < 0 || this.def < 0 || this.agi < 0 || this.wis < 0;
            },
            isPhysical: function() {
                return this.attribute == Attribute.none && this.level > 0;
            },
            isElemental: function() {
                return this.attribute != Attribute.none && this.level > 0;
            },
            isDeath: function() {
                return this == Skill.death1 || this == Skill.death2 || this == Skill.death3 || this == Skill.death4;
            }
        };
        skills.all[i] = skill;
        
        var aliases = d[2];
        if (typeof aliases == 'string')
            aliases = new Array(aliases);
        for (var j = 0; j < aliases.length; j++)
            skills[aliases[j]] = skill;
    }

    skills.get = (function() {
        var skills_map = {};
        for (var i = 0; i < skills.all.length; i++)
            skills_map[skills.all[i].id] = skills.all[i];
        return function(id) {
            return id in skills_map ? skills_map[id] : null;
        };
    })();
    skills.toString = function(skills, delim) {
        if (skills.length == 0)
            return "";
        var s = skills[0].name + " (" + skills[0].description + ")";
        for (var i = 1; i < skills.length; i++)
            s += delim + skills[i].name + " (" + skills[i].description + ")";
        return s;
    };
    /* Skills that have stones. */
    skills.getLearnableSkills = (function() {
        var stone_skills = new Array();
        for (var i = 0; i < skills.all.length; i++) {
            if (skills.all[i].stone == 1)
                stone_skills.push(skills.all[i]);
        }
        return function() {
            return stone_skills;
        };
    })();

    return skills;
})();
/** ======================================== End of Skills ======================================== */



/** ======================================== Shapes ======================================== */
var Shape = (function() {
    /*
     * Shape: ID Name Aliases
     */
    var data = new Array (
        new Array(0, "Slime",                 new Array("slime")),
        new Array(1, "Floating Orbs",         new Array("orbs", "circular")),
        new Array(2, "Humanoid",              new Array("humanoid")),
        new Array(3, "Giant",                 new Array("giant")),
        new Array(4, "Bird",                  new Array("bird", "avian")),
        new Array(5, "Wolf",                  new Array("wolf", "canine")),
        new Array(6, "Dragon",                new Array("dragon")),
        new Array(7, "Female",                new Array("female")),
        new Array(8, "Beast",                 new Array("beast")),
        new Array(9, "Shark",                 new Array("shark")),
        new Array(10, "Mermaid",              new Array("mermaid")),
        new Array(11, "Merman",               new Array("merman")),
        new Array(12, "Serpent",              new Array("serpent")),
        new Array(13, "Jellyfish",            new Array("jellyfish")),
        new Array(14, "Pumpkin-head",         new Array("pumpkinhead")),
        new Array(15, "Pumpkin",              new Array("pumpkin")),
        new Array(16, "Cactus",    		      new Array("cactus")),
        new Array(17, "zorbs",                new Array("zorbs")),
        new Array(18, "zdragon",              new Array("zdragon")),
        new Array(19, "zhumanoid",            new Array("zhumanoid")),
        new Array(20, "zfemale",              new Array("zfemale")),
        new Array(21, "zhorse",               new Array("zhorse")),
        new Array(101, "Large Floating Orbs", new Array("lorbs")),
        new Array(103, "Large Giant",         new Array("lgiant")),
        new Array(104, "Large Bird",          new Array("lbird")),
        new Array(105, "Large Wolf",          new Array("lwolf")),
        new Array(106, "Large Dragon",        new Array("ldragon")),
        new Array(-1, "None",                 new Array("none"))
    );
    var shapes = {
        all: new Array()
    };
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var shape = {
            id: d[0],
            name: d[1],
            getImage: function(width) {
                width = typeof(width) == 'undefined' ? 100 : width;
                if (this.id == -1)
                    return "";
                else
                    return "<img width='" + width + "px' src='images/shapes/" + this.id + image_ext + "' />";
            }
        };
        shapes.all[i] = shape;
        for (var j = 0; j < d[2].length; j++) {
            var alias = d[2][j];
            shapes[alias] = shape;
        }
    }
    return shapes;
})();
/** ======================================== End of Shapes ======================================== */




/** ======================================== Cards ======================================== */
var Card = (function() {
    /*
     * Guardian:
     *   ID Name Description Event Border Stars Place Place2 Prototype Shape Attribute HP MP ATK DEF AGI WIS 
     *   Skills Recommends RecommendsRB
     * Note: Place2 may be an array
     */

    /** Skills learnt at what levels. */
    var skill_levels = new Array(
        new Array(1, 15, 30),
        new Array(1, 15, 30, 40),
        new Array(1, 15, 30, 40, 50),
        new Array(1, 15, 30, 40, 50, 60),
        new Array(1, 15, 30, 40, 50, 70)
    );
    var max_levels = new Array(40, 45, 50, 55, 60);
    var rebirth_levels = new Array(40, 45, 50, 60, 70);

    /** A map from a card ID to its restricted types. */
    var limitation = {};

    /** A map from a card ID to the card. */
    var cmap = {};

    /** A map from a card ID to its notes. */
    var notes = {};

    var parse = function(d) {
        if (selfcheck && d.length != 20)
            console.log("Missing some data of card: " + d);
        var learns = new Object();
        for (var j = 0; j < d[17].length; j++)
            learns[skill_levels[d[5] - 1][j]] = d[17][j];
        var card = {
            id: d[0],
            name: d[1],
            description: d[2],
            level: 1,                          /* Current level */
            max: max_levels[d[5] - 1],         /* Max level */
            rbmax: rebirth_levels[d[5] - 1],   /* Max level after rebirth */
            stoned: false,                     /* Fully stoned? */
            type: Type.cool,                   /* Current type */
            event: d[3],
            border: d[4],
            stars: d[5],
            place: d[6],
            place2: d[7],
            proto: d[8],
            shape: d[9],
            attribute: d[10],
            hp: d[11],   /* HP at level 1 */
            mp: d[12],  /* MP at level 1 */
            atk: d[13], /* ATK at level 1 */
            def: d[14], /* DEF at level 1 */
            agi: d[15], /* AGI at level 1 */
            wis: d[16], /* WIS at level 1 */
            skills: d[17],         /* All skills that can be learned */
            recommends: d[18],     /* Recommended skills */
            recommendsrb: d[19],   /* Recommended skills after rebirth */
            learns: learns,        /* All skills with the learnt level. */
            cskills: d[18],        /* Current skills */
            canRebirth: function() { 
                return this.stars > 3 && 
                    this.id != "30019" &&  /* Gold Slime */
                    this.id != "40085" &&  /* Godvessel Vimana */
                    this.id != "40233" &&  /* Prismatic Slime */
                    this.id != "40271";    /* Black Slime */    
            },
            getMaxLevel: function() { 
                /* Special cases for silver slime and gold slime. */
                if (this.id == "20024" || this.id == "30019" || this.id == "40233" || this.id == "40271")
                    return 1;
                else
                    return this.type.isRebirthType() ? this.rbmax : this.max; 
            },
            getLargeImageLink: function() {
                return sitebase + "images/" + locale.getLanguage() + "/guardians/card" + this.id + ".png";
            },
            getImage: function(width) {
                width = typeof(width) == 'undefined' ? 100 : width;
                return "<img width='" + width + "px' src='" + sitebase + "images/" + locale.getLanguage() + "/guardians/card" + this.id + image_ext + "' />";
            },
            getLink: function(with_type) {
                with_type = typeof with_type == 'undefined' || with_type == null ? false : with_type;
                return "?" + locale.getURLArgs("id=" + this.id + (with_type ? "&type=" + this.type.id : ""));
            },
            getAvatar: function(width) {
                width = typeof(width) == 'undefined' ? 100 : width;
                return "<img width='" + width + "px' src='" + sitebase + "images/" + locale.getLanguage() + "/avatars/card_thu" + this.id + image_ext + "' />";
            },
            getBattleImage: function(width) {
                width = typeof(width) == 'undefined' ? 128 : width;
                return "<img width='" + width + "px' src='" + sitebase + "images/" + locale.getLanguage() + "/battle/battle_" + this.id + image_ext + "' />";
            },
            getStarsImage: function(width) {
                width = typeof(width) == 'undefined' ? 20 : width;
                s = "";
                for (var j = 0; j < this.stars; j++)
                    s += "<img width='" + width + "px' src='images/rare_star" + image_ext + "' />";
                return s;
            },
            isLimited: function() {
                return this.border != Border.none || this.place == Place.coliseum;
            },
            hasType: function(t) {
                if (limitation[this.id] != null)
                    return $.inArray(t, limitation[this.id]) != -1;
                
                /* Limited cards do not have ace type. */
                if (this.isLimited() && (t == Type.ace || t == Type.acer))
                    return false;
                
                if (!this.canRebirth() && t.isRebirthType())
                    return false;
                
                return true;
            },
            setLevel: function(lv) {
                if (lv <= 0 || lv > this.rbmax)
                    return;
                this.level = lv;
            },
            getLevel: function() {
                return this.level;
            },
            setStoned: function(b) {
                this.stoned = b;
            },
            isStoned: function() {
                return this.stoned;
            },
            setType: function(t) {
                if (!this.hasType(t))
                    return;
                this.type = t;
            },
            getType: function() {
                return this.type;
            },
            setSkills: function(sks) {
                this.cskills = sks;
            },
            getSkills: function() {
                return this.cskills;
            },
            /* Returns true if this card has a specified skill in its current skill set. */
            hasSkill: function(s) {
                var sks = this.getSkills();
                for (var i = 0; i < sks.length; i++) {
                    if (sks[i] == s)
                        return true;
                }
                return false;
            },
            canLearnSkill: function(s) {
                var sks = this.skills;
                for (var i = 0; i < sks.length; i++) {
                    if (sks[i] == s)
                        return true;
                }
                return false;
            },
            getLearntSkillSize: function() {
                if (this.stars == 1)
                    return 3;
                else if (this.stars == 2)
                    return 4;
                else if (this.stars == 3)
                    return 5;
                else if (this.stars == 4 || this.stars == 5)
                    return this.type.isRebirthType() && !this.isLimited() ? 6 : 5;
            },
            getRecommends: function() {
                var cname = locale.getLanguage() + ".recommends." + this.id + "." + this.type.id;
                var customs = $.jStorage.get(cname);
                
                if (customs != null && Array.isArray(customs)) {
                    var res = new Array();
                    for (var i = 0; i < customs.length; i++) {
                        var skill = Skill.get(customs[i]);
                        if (skill != null)
                            res.push(skill);
                    }
                    return res;
                } else
                    return this.type.isRebirthType() ? this.recommendsrb : this.recommends;
            },
            setCustomRecommends: function(skills, options) {
                var local = typeof options == 'object' && 'local' in options && options.local;
                var ts = new Array();
                if (local)
                    ts.push(this.type);
                else
                    ts = ts.concat(Type.all);
                
                var ids = new Array();
                for (var i = 0; i < skills.length; i++) {
                    var skill = skills[i];
                    if (typeof skill != 'object')
                        skill = Skill.get(skill);
                    if (skill != null)
                        ids.push(skill.id)
                }
                
                for (var i = 0; i < ts.length; i++) {
                    var t = ts[i];
                    var cname = locale.getLanguage() + ".recommends." + this.id + "." + t.id;
                    $.jStorage.set(cname, ids);
                }
            },
            clearCustomRecommends: function(options) {
                var local = typeof options == 'object' && 'local' in options && options.local;
                var ts = new Array();
                if (local)
                    ts.push(this.type);
                else
                    ts = ts.concat(Type.all);
                
                for (var i = 0; i < ts.length; i++) {
                    var t = ts[i];
                    var cname = locale.getLanguage() + ".recommends." + this.id + "." + t.id;
                    $.jStorage.deleteKey(cname);
                }
            },
            getPlaceName: function() {
                var res = this.place.name;
                var helper = function(n) {
                    var m = n % 10;
                    var suffix = m == 1 ? "st" : (m == 2 ? "nd " : (m == 3 ? "rd" : "th"));
                    return n + suffix;                
                };
                if (this.place2) {
                    var arr = new Array();
                    if (Array.isArray(this.place2))
                        arr = arr.concat(this.place2)
                    else
                        arr.push(this.place2);
                    res = List.map(function(n) { return helper(n); }, arr).join(", ") + " " + res;
                }
                return res;
            },
            calc: function(base, mult, level, stoned) {
                var v = base * mult;
                if (this.getMaxLevel() > 1)
                    v = Math.floor(1.5 * v * (level - 1) / (this.max - 1) + v);
                if (stoned) {
                    var stone = base * (this.getMaxLevel() == 1 ? 0.2 : 0.5);
                    if (this.type.isRebirthType()) {
                        if (this.stars == 5)
                            stone += stone * 0.1;
                        else if (this.stars == 4)
                            stone += stone * 0.05;
                    }
                    v += Math.floor(stone);
                }
                return Math.floor(v);
            },
            canCast: function(n) {
                var need_mp = 0;
                var max_attack = null;
                var selected_skills = this.getSkills();
                for (var i = 0; i < selected_skills.length; i++) {
                    var skill = selected_skills[i];
                    if (skill.type == 0) {
                        if (max_attack == null || skill.cost > max_attack)
                            max_attack = skill.cost;
                    } else
                        need_mp += skill.cost;
                }
                max_attack = max_attack == null ? 0 : max_attack;
                for (var i = 1; i <= n; i++)
                    need_mp += max_attack;
                return this.getMP() >= need_mp;
            },
            getHP: function() {
                return this.calc(this.hp, this.type.hp, this.level, this.stoned);
            },
            getMP: function() {
                return this.calc(this.mp, this.type.mp, this.level, this.stoned);
            },
            getATK: function() {
                return this.calc(this.atk, this.type.atk, this.level, this.stoned);
            },
            getDEF: function() {
                return this.calc(this.def, this.type.def, this.level, this.stoned);
            },
            getAGI: function() {
                return this.calc(this.agi, this.type.agi, this.level, this.stoned);
            },
            getWIS: function() {
                return this.calc(this.wis, this.type.wis, this.level, this.stoned);
            },
            getStoneHP: function() {
                return this.calc(this.hp, 0, this.level, true);
            },
            getStoneMP: function() {
                return this.calc(this.mp, 0, this.level, true);
            },
            getStoneATK: function() {
                return this.calc(this.atk, 0, this.level, true);
            },
            getStoneDEF: function() {
                return this.calc(this.def, 0, this.level, true);
            },
            getStoneAGI: function() {
                return this.calc(this.agi, 0, this.level, true);
            },
            getStoneWIS: function() {
                return this.calc(this.wis, 0, this.level, true);
            },
            getMinHP: function() {
                return this.calc(this.hp, this.type.hp, 1, false);
            },
            getMinMP: function() {
                return this.calc(this.mp, this.type.mp, 1, false);
            },
            getMinATK: function() {
                return this.calc(this.atk, this.type.atk, 1, false);
            },
            getMinDEF: function() {
                return this.calc(this.def, this.type.def, 1, false);
            },
            getMinAGI: function() {
                return this.calc(this.agi, this.type.agi, 1, false);
            },
            getMinWIS: function() {
                return this.calc(this.wis, this.type.wis, 1, false);
            },
            getMaxHP: function() {
                return this.calc(this.hp, this.type.hp, this.getMaxLevel(), false);
            },
            getMaxMP: function() {
                return this.calc(this.mp, this.type.mp, this.getMaxLevel(), false);
            },
            getMaxATK: function() {
                return this.calc(this.atk, this.type.atk, this.getMaxLevel(), false);
            },
            getMaxDEF: function() {
                return this.calc(this.def, this.type.def, this.getMaxLevel(), false);
            },
            getMaxAGI: function() {
                return this.calc(this.agi, this.type.agi, this.getMaxLevel(), false);
            },
            getMaxWIS: function() {
                return this.calc(this.wis, this.type.wis, this.getMaxLevel(), false);
            },
            getMaxStonedHP: function() {
                return this.calc(this.hp, this.type.hp, this.getMaxLevel(), true);
            },
            getMaxStonedMP: function() {
                return this.calc(this.mp, this.type.mp, this.getMaxLevel(), true);
            },
            getMaxStonedATK: function() {
                return this.calc(this.atk, this.type.atk, this.getMaxLevel(), true);
            },
            getMaxStonedDEF: function() {
                return this.calc(this.def, this.type.def, this.getMaxLevel(), true);
            },
            getMaxStonedAGI: function() {
                return this.calc(this.agi, this.type.agi, this.getMaxLevel(), true);
            },
            getMaxStonedWIS: function() {
                return this.calc(this.wis, this.type.wis, this.getMaxLevel(), true);
            },
            getStatus: function() {
                return {hp: this.getHP(), mp: this.getMP(),
                        atk: this.getATK(), def: this.getDEF(),
                        agi: this.getAGI(), wis: this.getWIS()};
            },
            getMaxStatus: function(buff) {
                var status = {
                    hp: this.getMaxHP(), mp: this.getMaxMP(),
                    atk: this.getMaxATK(), def: this.getMaxDEF(),
                    agi: this.getMaxAGI(), wis: this.getMaxWIS()
                };
                if (typeof buff == 'undefined' || buff == 0)
                    return status;
                
                var m = 1;
                var skills = List.fold_left (function(res, skill) { 
                    if (skill.isBuff())
                        res.push(skill);
                    return res;
                }, [], buff == 1 ? this.getRecommends() : this.skills);
                applySkills(skills, status);
                return status;
            },
            getMaxStonedStatus: function(buff) {
                var status = {
                    hp: this.getMaxStonedHP(), mp: this.getMaxStonedMP(),
                    atk: this.getMaxStonedATK(), def: this.getMaxStonedDEF(),
                    agi: this.getMaxStonedAGI(), wis: this.getMaxStonedWIS()
                };
                if (typeof buff == 'undefined' || buff == 0)
                    return status;
                
                var m = 1;
                var skills = List.fold_left (function(res, skill) { 
                    if (skill.isBuff())
                        res.push(skill);
                    return res;
                }, [], buff == 1 ? this.getRecommends() : this.skills);
                applySkills(skills, status);
                return status;
            }
        }
        return card;
    }; // End of parse

    var cards = {
        /** All cards. */
        all: new Array(),

        limitation: limitation,

        notes: notes,

        /** Add a card, which is represented by an array of raw data. */
        add: function(d) {
            var card = parse(d);
            this.all.push(card);
            if (selfcheck) {
                if (cmap[card.id] != null)
                    console.log("Duplicate card ID: " + card.id);
                for (var j = 0; j < card.recommends; j++) {
                    if (card.skills.indexOf(card.recommends[j]) == -1)
                        console.log("Skill " + card.recommends[j].name + " is not learnt by " + card.name + ".");
                }
                for (var j = 0; j < card.recommendsrb; j++) {
                    if (card.skills.indexOf(card.recommendsrb[j]) == -1)
                        console.log("Skill " + card.recommendsrb[j].name + " is not learnt by " + card.name + ".");
                }
            }
            cmap[card.id] = card;
        },

        /** Add a list of cards. */
        addAll: function(ds) {
            for (var i = 0; i < ds.length; i++)
                this.add(ds[i]);
        },

        /** Returns the card of a specified ID. */
        get: function(id) {
            var g =  cmap[id];
            if (typeof g == 'undefined')
                g = null;
            return g;
        },
            
        addLimitedTypes: function(ts) {
            for (var key in ts)
                limitation[key] = ts[key];
        },

        addNotes: function(ns) {
            for (var key in ns)
                notes[key] = ns[key];
        },

        mklnk: function(gc, with_type) {
            if (typeof(gc) == 'number' || typeof(gc) == 'string') {
                gc = this.get(gc);
            }
            if (gc != null && 'id' in gc && 'name' in gc) {
                // Translate the name of the card to English.
                var en = goptions.isTranslationNeeded() && gc.id in ename.guardians ? " (" + ename.guardians[gc.id] + ")" : "";
                return "<a href='javascript:insertGuardian(\"" + gc.id + 
                    (typeof with_type != 'undefined' && with_type ? ", " + gc.type.id : "") + 
                    "\")' class='gclnk'>" + gc.name + en + "</a>" + 
                    " " + 
                    "<a href='index.html" + gc.getLink(with_type) + "' target='_blank'><img src='images/external-link.png' /></a>";
            } else
                return "<span class='warning'>[CARD NOT LOADED]</span>";
        },

        mkextlnk: function(gc, with_type) {
            if (typeof(gc) == 'number' || typeof(gc) == 'string') {
                gc = this.get(gc);
            }
            if (gc != null && 'id' in gc && 'name' in gc) {
                // Translate the name of the card to English.
                var en = goptions.isTranslationNeeded() && gc.id in ename.guardians ? " (" + ename.guardians[gc.id] + ")" : "";
                return "<a href='index.html" + gc.getLink(with_type) + "' class='gclnk'>" + gc.name + en + "</a>" + 
                    " " + 
                    "<a href='index.html" + gc.getLink(with_type) + "' target='_blank'><img src='images/external-link.png' /></a>";
            } else
                return "<span class='warning'>[CARD NOT LOADED]</span>";
        },

        mklnks: function(query, description) {
            return "<a href='cards.html?" + query + "' class='gclnk'>" + description + "</a>" +
                " " +
                "<a href='cards.html?" + query + "' target='_blank'><img src='images/external-link.png' /></a>";
        },

        getTop: function(v, size, options) {
            var tops = new Array(
                { name: "5★ (All)", title: getStarsText(5) + " (All)", 
                  selector: Selector.stars(5), cards: new Array() },
                { name: "5★ (Normal)", title: getStarsText(5) + " (Normal)", 
                  selector: Selector.and(Selector.stars(5), Selector.border(Border.none.id)), cards: new Array() },
                { name: "5★ (Limited)", title: getStarsText(5) + " (Limited)", 
                  selector: Selector.and(Selector.stars(5), Selector.not(Selector.border(Border.none.id))), cards: new Array() },
                { name: "4★", title: getStarsText(4), selector: Selector.stars(4), cards: new Array() },
                { name: "3★", title: getStarsText(3), selector: Selector.stars(3), cards: new Array() },
                { name: "2★", title: getStarsText(2), selector: Selector.stars(2), cards: new Array() },
                { name: "1★", title: getStarsText(1), selector: Selector.stars(1), cards: new Array() }
            );
            var sorting = null;
            var buff = options.buff == "all" ? 2 : (options.buff == "recommended" ? 1 : 0);

            v = v.toLowerCase();
            if (v == "hp") { sorting = function(x, y) { return Sorting.hp(x, y, buff); } }
            else if (v == "mp") { sorting = function(x, y) { return Sorting.mp(x, y, buff); } }
            else if (v == "atk") { sorting = function(x, y) { return Sorting.atk(x, y, buff); } }
            else if (v == "def") { sorting = function(x, y) { return Sorting.def(x, y, buff); } }
            else if (v == "agi") { sorting = function(x, y) { return Sorting.agi(x, y, buff); } }
            else if (v == "wis") { sorting = function(x, y) { return Sorting.wis(x, y, buff); } }
            else if (v == "total") { sorting = function(x, y) { return Sorting.total(x, y, buff); } }

            if (sorting == null)
                return tops;

            /* Find guardians that satisfy the stars conditions. */
            var gcs = new Array();
            if ('stars' in options) {
                var selector = Selector.stars(options['stars']);
                gcs.push.apply(gcs, Selector.select(selector));
            } else
                gcs.push.apply(gcs, this.all);
            
            /* Set the types. */
            for (var i = 0; i < gcs.length; i++) {
                if (gcs[i].canRebirth())
                    gcs[i].setType(Type.coolr);
                else
                    gcs[i].setType(Type.cool);
            }
            
            /* Classify the guardians based on their stars and sort the guardians. */
            for (var i = 0; i < tops.length; i++) {
                var top = tops[i];
                top.cards.push.apply(top.cards, Selector.select(top.selector, gcs));
                top.cards.sort(sorting);
                top.cards = top.cards.slice(0, Math.min(size, top.cards.length));
            }
            
            return tops;
        },

        getStarsImage: function(stars, width) {
            width = typeof(width) == 'undefined' ? 20 : width;
            s = "";
            for (var j = 0; j < stars; j++)
                s += "<img width='" + width + "px' src='images/rare_star" + image_ext + "' />";
            return s;
        }

    };

    return cards;
})();
/** ======================================== End of Cards ======================================== */



/** ======================================== Ex Types ======================================== */
var ExType = (function() {
    var types = {
        all: new Array(
            {id: 0, name: "EX1 (Red)"},
            {id: 1, name: "EX2 (Blue)"}
        )
    };
    types.red = types.all[0];
    types.blue = types.all[1];

    return types;
})();
/** ======================================== End of Ex Types ======================================== */



/** ======================================== Ex Skills ======================================== */
var ExSkill = (function() {
    var as = function(a) {
        return function(g) {
            return g.attribute.id == a.id;
        };
    };
    var all = function(g) { return true; };
    var none = function(g) { return false; };
    var death = function(s) { return s == Skill.death1 || s == Skill.death2 || s == Skill.death3 || s == Skill.death4; };
    var sd = function(s) { return s == Skill.sd; };
    var qs = function(s) { return s == Skill.qs; };
    var gs = function(s) { return s == Skill.gs; };
    var ds = function(s) { return s == Skill.ds; };
    var curse = function(s) { return s == Skill.curse; };
    var revival = function(s) { return s == Skill.revival; };
    var data = new Array(
        new Array(0,  ExType.red,  new Array("fire10"),          as(Attribute.fire),      0.10, 0.10, 0.10, 0.10, 0.10, 0.10, none, 0, none, 0),
        new Array(1,  ExType.red,  new Array("fire12"),          as(Attribute.fire),      0.12, 0.12, 0.12, 0.12, 0.12, 0.12, none, 0, none, 0),
        new Array(2,  ExType.red,  new Array("fire15"),          as(Attribute.fire),      0.15, 0.15, 0.15, 0.15, 0.15, 0.15, none, 0, none, 0),
        new Array(3,  ExType.red,  new Array("earth2"),          as(Attribute.earth),     0.02, 0.02, 0.02, 0.02, 0.02, 0.02, none, 0, none, 0),
        new Array(4,  ExType.red,  new Array("earth4"),          as(Attribute.earth),     0.04, 0.04, 0.04, 0.04, 0.04, 0.04, none, 0, none, 0),
        new Array(5,  ExType.red,  new Array("earth6"),          as(Attribute.earth),     0.06, 0.06, 0.06, 0.06, 0.06, 0.06, none, 0, none, 0),
        new Array(6,  ExType.red,  new Array("wind2"),           as(Attribute.wind),      0.02, 0.02, 0.02, 0.02, 0.02, 0.02, none, 0, none, 0),
        new Array(7,  ExType.red,  new Array("wind4"),           as(Attribute.wind),      0.04, 0.04, 0.04, 0.04, 0.04, 0.04, none, 0, none, 0),
        new Array(8,  ExType.red,  new Array("wind6"),           as(Attribute.wind),      0.06, 0.06, 0.06, 0.06, 0.06, 0.06, none, 0, none, 0),
        new Array(9,  ExType.red,  new Array("poison10"),        as(Attribute.poison),    0.10, 0.10, 0.10, 0.10, 0.10, 0.10, none, 0, none, 0),
        new Array(10, ExType.red,  new Array("poison12"),        as(Attribute.poison),    0.12, 0.12, 0.12, 0.12, 0.12, 0.12, none, 0, none, 0),
        new Array(11, ExType.red,  new Array("poison15"),        as(Attribute.poison),    0.15, 0.15, 0.15, 0.15, 0.15, 0.15, none, 0, none, 0),
        new Array(12, ExType.red,  new Array("mecha2"),          as(Attribute.mecha),     0.02, 0.02, 0.02, 0.02, 0.02, 0.02, none, 0, none, 0),
        new Array(13, ExType.red,  new Array("mecha4"),          as(Attribute.mecha),     0.04, 0.04, 0.04, 0.04, 0.04, 0.04, none, 0, none, 0),
        new Array(14, ExType.red,  new Array("mecha6"),          as(Attribute.mecha),     0.06, 0.06, 0.06, 0.06, 0.06, 0.06, none, 0, none, 0),
        new Array(15, ExType.red,  new Array("light2"),          as(Attribute.light),     0.02, 0.02, 0.02, 0.02, 0.02, 0.02, none, 0, none, 0),
        new Array(16, ExType.red,  new Array("light4"),          as(Attribute.light),     0.04, 0.04, 0.04, 0.04, 0.04, 0.04, none, 0, none, 0),
        new Array(17, ExType.red,  new Array("light6"),          as(Attribute.light),     0.06, 0.06, 0.06, 0.06, 0.06, 0.06, none, 0, none, 0),
        new Array(18, ExType.red,  new Array("darkness2"),       as(Attribute.darkness),  0.02, 0.02, 0.02, 0.02, 0.02, 0.02, none, 0, none, 0),
        new Array(19, ExType.red,  new Array("darkness4"),       as(Attribute.darkness),  0.04, 0.04, 0.04, 0.04, 0.04, 0.04, none, 0, none, 0),
        new Array(20, ExType.red,  new Array("darkness6"),       as(Attribute.darkness),  0.06, 0.06, 0.06, 0.06, 0.06, 0.06, none, 0, none, 0),
        new Array(21, ExType.red,  new Array("hp1"),             all,                     0.01,    0,    0,    0,    0,    0, none, 0, none, 0),
        new Array(22, ExType.red,  new Array("hp2"),             all,                     0.02,    0,    0,    0,    0,    0, none, 0, none, 0),
        new Array(23, ExType.red,  new Array("hp3"),             all,                     0.03,    0,    0,    0,    0,    0, none, 0, none, 0),
        new Array(24, ExType.red,  new Array("hp5"),             all,                     0.05,    0,    0,    0,    0,    0, none, 0, none, 0),
        new Array(25, ExType.red,  new Array("hp7"),             all,                     0.07,    0,    0,    0,    0,    0, none, 0, none, 0),
        new Array(26, ExType.red,  new Array("mp5"),             all,                        0, 0.05,    0,    0,    0,    0, none, 0, none, 0),
        new Array(27, ExType.red,  new Array("mp7"),             all,                        0, 0.07,    0,    0,    0,    0, none, 0, none, 0),
        new Array(28, ExType.red,  new Array("mp10"),            all,                        0, 0.10,    0,    0,    0,    0, none, 0, none, 0),
        new Array(29, ExType.red,  new Array("atk2"),            all,                        0,    0, 0.02,    0,    0,    0, none, 0, none, 0),
        new Array(30, ExType.red,  new Array("atk4"),            all,                        0,    0, 0.04,    0,    0,    0, none, 0, none, 0),
        new Array(31, ExType.red,  new Array("atk6"),            all,                        0,    0, 0.06,    0,    0,    0, none, 0, none, 0),
        new Array(32, ExType.red,  new Array("atk10"),           all,                        0,    0, 0.10,    0,    0,    0, none, 0, none, 0),
        new Array(33, ExType.red,  new Array("atk12"),           all,                        0,    0, 0.12,    0,    0,    0, none, 0, none, 0),
        new Array(34, ExType.red,  new Array("atk15"),           all,                        0,    0, 0.15,    0,    0,    0, none, 0, none, 0),
        new Array(35, ExType.red,  new Array("def10"),           all,                        0,    0,    0, 0.10,    0,    0, none, 0, none, 0),
        new Array(36, ExType.red,  new Array("def12"),           all,                        0,    0,    0, 0.12,    0,    0, none, 0, none, 0),
        new Array(37, ExType.red,  new Array("def15"),           all,                        0,    0,    0, 0.15,    0,    0, none, 0, none, 0),
        new Array(38, ExType.red,  new Array("wis2"),            all,                        0,    0,    0,    0,    0, 0.02, none, 0, none, 0),
        new Array(39, ExType.red,  new Array("wis4"),            all,                        0,    0,    0,    0,    0, 0.04, none, 0, none, 0),
        new Array(40, ExType.red,  new Array("wis6"),            all,                        0,    0,    0,    0,    0, 0.06, none, 0, none, 0),
        new Array(41, ExType.blue, new Array("suc_death1"),      all,                        0,    0,    0,    0,    0,    0, death, 0.01, none, 0),
        new Array(42, ExType.blue, new Array("suc_death2"),      all,                        0,    0,    0,    0,    0,    0, death, 0.02, none, 0),
        new Array(43, ExType.blue, new Array("suc_death3"),      all,                        0,    0,    0,    0,    0,    0, death, 0.03, none, 0),
        new Array(44, ExType.blue, new Array("suc_sd3"),         all,                        0,    0,    0,    0,    0,    0, sd, 0.03, none, 0),
        new Array(45, ExType.blue, new Array("suc_sd5"),         all,                        0,    0,    0,    0,    0,    0, sd, 0.05, none, 0),
        new Array(46, ExType.blue, new Array("suc_sd7"),         all,                        0,    0,    0,    0,    0,    0, sd, 0.07, none, 0),
        new Array(47, ExType.blue, new Array("pow_qs1"),         all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.01),
        new Array(48, ExType.blue, new Array("pow_qs2"),         all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.02),
        new Array(49, ExType.blue, new Array("pow_qs3"),         all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.03),
        new Array(50, ExType.blue, new Array("suc_gs2"),         all,                        0,    0,    0,    0,    0,    0, gs, 0.02, none, 0),
        new Array(51, ExType.blue, new Array("suc_gs3"),         all,                        0,    0,    0,    0,    0,    0, gs, 0.03, none, 0),
        new Array(52, ExType.blue, new Array("suc_gs5"),         all,                        0,    0,    0,    0,    0,    0, gs, 0.05, none, 0),
        new Array(53, ExType.blue, new Array("suc_ds2"),         all,                        0,    0,    0,    0,    0,    0, ds, 0.02, none, 0),
        new Array(54, ExType.blue, new Array("suc_ds3"),         all,                        0,    0,    0,    0,    0,    0, ds, 0.03, none, 0),
        new Array(55, ExType.blue, new Array("suc_ds5"),         all,                        0,    0,    0,    0,    0,    0, ds, 0.05, none, 0),
        new Array(56, ExType.blue, new Array("pow_curse20"),     all,                        0,    0,    0,    0,    0,    0, none, 0, curse, 0.20),
        new Array(57, ExType.blue, new Array("pow_curse35"),     all,                        0,    0,    0,    0,    0,    0, none, 0, curse, 0.35),
        new Array(58, ExType.blue, new Array("pow_curse50"),     all,                        0,    0,    0,    0,    0,    0, none, 0, curse, 0.50),
        new Array(59, ExType.blue, new Array("suc_revival10"),   all,                        0,    0,    0,    0,    0,    0, revival, 0.10, none, 0),
        new Array(60, ExType.blue, new Array("suc_revival12"),   all,                        0,    0,    0,    0,    0,    0, revival, 0.12, none, 0),
        new Array(61, ExType.blue, new Array("suc_revival15"),   all,                        0,    0,    0,    0,    0,    0, revival, 0.15, none, 0),
        new Array(62, ExType.red,  new Array("wis10"),           all,                        0,    0,    0,    0,    0, 0.10, none, 0, none, 0),
        new Array(63, ExType.red,  new Array("wis12"),           all,                        0,    0,    0,    0,    0, 0.12, none, 0, none, 0),
        new Array(64, ExType.red,  new Array("wis15"),           all,                        0,    0,    0,    0,    0, 0.15, none, 0, none, 0),
        new Array(65, ExType.blue, new Array("pow_qs6"),         all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.06),
        new Array(66, ExType.blue, new Array("pow_qs8"),         all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.08),
        new Array(67, ExType.blue, new Array("pow_qs10"),        all,                        0,    0,    0,    0,    0,    0, none, 0, qs, 0.10),
        new Array(68, ExType.blue, new Array("suc_sd20"),        all,                        0,    0,    0,    0,    0,    0, sd, 0.20, none, 0),
        new Array(69, ExType.blue, new Array("suc_sd25"),        all,                        0,    0,    0,    0,    0,    0, sd, 0.25, none, 0),
        new Array(70, ExType.blue, new Array("suc_sd30"),        all,                        0,    0,    0,    0,    0,    0, sd, 0.30, none, 0),
        new Array(71, ExType.red,  new Array("lightning10"),     as(Attribute.lightning),    0.10, 0.10, 0.10, 0.10, 0.10, 0.10, none, 0, none, 0),
        new Array(72, ExType.red,  new Array("lightning12"),     as(Attribute.lightning),    0.12, 0.12, 0.12, 0.12, 0.12, 0.12, none, 0, none, 0),
        new Array(73, ExType.red,  new Array("lightning15"),     as(Attribute.lightning),    0.15, 0.15, 0.15, 0.15, 0.15, 0.15, none, 0, none, 0),
        new Array(74, ExType.red,  new Array("atk8"),            all,                        0,       0, 0.08,    0,    0,    0, none, 0, none, 0)
    );

    var skills = {
        all: new Array(),
        red: new Array(),
        blue: new Array()
    };

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var skill = {
            id: d[0],
            name: locale.exskills[d[0]],
            type: d[1],
            acs: d[3],   /* Selector of cards boosted by status-up effects. */
            hp: d[4],
            mp: d[5],
            atk: d[6],
            def: d[7],
            agi: d[8],
            wis: d[9],
            scs: d[10], /* Selector of skills boosted by successful-rate-up effects. */
            sucup: d[11],
            pcs: d[12], /* Selector of skills boosted by power-up effects. */
            powup: d[13]
        };

        skills.all[i] = skill;
        if (skill.type == ExType.red)
            skills.red.push(skill);
        if (skill.type == ExType.blue)
            skills.blue.push(skill);
        for (var j = 0; j < d[2].length; j++) {
            var alias = d[2][j];
            skills[alias] = skill;
        }
    }

    skills.get = (function() {
        var skills_map = {};
        for (var i = 0; i < skills.all.length; i++)
            skills_map[skills.all[i].id] = skills.all[i];
        return function(id) {
            return id in skills_map ? skills_map[id] : null;
        };
    })();

    return skills;
})();
/** ======================================== End of Ex Skills ======================================== */



/** ======================================== Ex Cards ======================================== */
var ExCard = (function() {
    var parse = function(d) {
        var card = {
            id: d[0],
            name: d[1],
            description: d[2],
            event: d[3],
            border: d[4],
            stars: d[5],
            place: d[6],
            place2: d[7],
            shape: d[8],
            attribute: d[9],
            skills: d[10],
            cskill: d[10][d[10].length - 1],
            getImage: function(width) {
                width = typeof(width) == 'undefined' ? 100 : width;
                return "<img width='" + width + "px' src='" + sitebase + "images/" + locale.getLanguage() + "/guardians/card" + this.id + image_ext + "' />";
            },
            getAvatar: function(width) {
                width = typeof(width) == 'undefined' ? 100 : width;
                return "<img width='" + width + "px' src='" + sitebase + "images/" + locale.getLanguage() + "/avatars/card_thu" + this.id + image_ext + "' />";
            },
            getStarsImage: function(width) {
                width = typeof(width) == 'undefined' ? 20 : width;
                s = "";
                for (var j = 0; j < this.stars; j++)
                    s += "<img width='" + width + "px' src='images/rare_star" + image_ext + "' />";
                return s;
            },
            getPlaceName: function() {
                var res = this.place.name;
                var helper = function(n) {
                    var m = n % 10;
                    var suffix = m == 1 ? "st" : (m == 2 ? "nd " : (m == 3 ? "rd" : "th"));
                    return n + suffix;                
                };
                if (this.place2) {
                    var arr = new Array();
                    if (Array.isArray(this.place2))
                        arr = arr.concat(this.place2)
                    else
                        arr.push(this.place2);
                    res = List.map(function(n) { return helper(n); }, arr).join(", ") + " " + res;
                }
                return res;
            },
            getLink: function() {
                return "excards.html?" + locale.getURLArgs("id=" + this.id);
            },
            hasSkill: function(s) {
                return List.mem(s, this.skills);
            },
            getSkill: function() {
                return this.cskill;
            },
            setSkill: function(s) {
                this.cskill = s;
            }

        };
        for (var i = 0; i < card.skills.length; i++) {
            if (typeof card.skills[i] == 'undefined' || card.skills[i] == null)
                console.log("ERROR: Incorrect skills for " + card.id + " " + card.name + ".");
        };
        return card;
    };

    var cmap = {};
    var notes = {};
    return {
        all: new Array(),
        red: new Array(),
        blue: new Array(),
        notes: notes,
        add: function(d) {
            var card = parse(d);
            this.all.push(card);
            if (card.border == ExType.red)
                this.red.push(card);
            else if (card.border == ExType.blue)
                this.blue.push(card);
            cmap[card.id] = card;
        },
        addAll: function(ds) {
            for (var i = 0; i < ds.length; i++)
                this.add(ds[i]);
        },
        get: function(id) {
            var c =  cmap[id];
            if (typeof c == 'undefined')
                c = null;
            return c;
        },
        mklnk: function(c) {
            if (typeof(c) == 'number' || typeof(c) == 'string') {
                c = this.get(c);
            }
            if (c != null && 'id' in c && 'name' in c) {
                // Translate the name of the card to English.
                var en = goptions.isTranslationNeeded() && c.id in ename.guardians ? " (" + ename.guardians[c.id] + ")" : "";
                return "<a href='" + c.getLink() + "' class='gclnk'>" + c.name + en + "</a>" +
                    " " + 
                    "<a href='" + c.getLink() + "' target='_blank'><img src='images/external-link.png' /></a>";
            } else
                return "<span class='warning'>[CARD NOT LOADED]</span>";
        },
        addNotes: function(ns) {
            for (var key in ns)
                notes[key] = ns[key];
        }
    };
})();
/** ======================================== End of Ex Cards ======================================== */



/** ======================================== Selectors ======================================== */
var Selector = (function() {

    return {
        /** Returns nothing. */
        none: function(g) {
            return false;
        },
        /** Returns all. */
        all: function(g) {
            return true;
        },
        gen: function(f, t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    return g[f] == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { return res || g[f] == t; }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified stars. */
        stars: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    return g.stars == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { return res || g.stars == t; }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified attributes. */
        attribute: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    return g.attribute.id == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { 
                        return t.length > 0 && (res || g.attribute.id == t || g.attribute.name.toLowerCase() == t.toLowerCase());
                    }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified IDs. */
        id: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    return g.id == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { return res || g.id == t; }, false, ts);
                };
            }
        },
        /** Returns cards with all of the specified names. */
        name: function(terms) {
            terms = terms.toLowerCase().split(",");
            return function(g) {
                var name = g.name.toLowerCase();
                return List.fold_left(function(res, n) { return res && name.indexOf(n) >= 0; }, true, terms);
            }
        },
        /** Returns cards with one of the specified places. */
        place: function(t) {
            var grounds = new Array(
                Place.plains.id, /* Place.plains_night.id, */ Place.volcano.id, /* Place.volcano_night.id, */
                Place.snowfield.id, /* Place.snowfield_night.id, */ Place.desert.id, /* Place.desert_night.id, */
                Place.ocean.id /* Place.ocean_night.id, Place.zeus.id */
            );
            if (typeof(t) == 'number') {
                return function(g) {
                    return g.place.id == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { 
                        return t.length > 0 && (
                            res ||
                                (grounds.indexOf(t) >= 0 && g.place == Place.grounds) ||
                                g.place.id == t || 
                                g.place.name.toLowerCase().indexOf(t.toLowerCase()) != -1
                        );
                    }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified borders. */
        border: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    return g.border.id == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { 
                        return t.length > 0 && (res || g.border.id == t || g.border.name.toLowerCase() == t.toLowerCase());
                    }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified shapes. */
        shape: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    console.log(g.name);
                    return g.shape.id == t;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(function(res, t) { 
                        return t.length > 0 && (res || g.shape.id == t || g.shape.name.toLowerCase().indexOf(t.toLowerCase()) != -1);
                    }, false, ts);
                };
            }
        },
        /** Returns cards with one of the specified skills. */
        skill: function(t) {
            if (typeof(t) == 'number') {
                return function(g) {
                    for (var i = 0; i < g.skills.length; i++) {
                        if (g.skills[i].id == t)
                            return true;
                    }
                    return false;
                };
            } else {
                var ts = String(t).split(",");
                return function(g) {
                    return List.fold_left(
                        function(res, t) { 
                            if (t.length == 0)
                                return false;
                            
                            if (res)
                                return true;
                            
                            if (t == "ls")
                                t = Skill.ls.id;
                            else if (t == "sd")
                                t = Skill.sd.id;
                            else if (t == "qs")
                                t = Skill.qs.id;
                            else if (t == "ep")
                                t = Skill.ep.id;
                            else if (t == "ds")
                                t = Skill.ds.id;
                            else if (t == "gs")
                                t = Skill.gs.id;
                            else if (t == "dr")
                                t = Skill.dr.id;
                            else if (t == "fb")
                                t = Skill.fb.id;
                            else if (t == "bg")
                                t = Skill.bg.id;
                            if (typeof(t) == 'string')
                                t = t.toLowerCase();
                            
                            return List.fold_left(function(res, skill) { return res || skill.id == t || skill.name.toLowerCase().indexOf(t) != -1}, false, g.skills);
                        }, 
                        false, ts
                    );
                };
            }
        },
        /** Returns the conjunction of the two specified selectors. */
        and: function(r1, r2) {
            if ($.isArray(r1) && (typeof r2 == 'undefined' || r2 == null)) {
                if (r1.length == 0)
                    return none_selector;
                else {
                    var res = r1[0];
                    for (var i = 1; i < r1.length; i++) {
                        res = this.and(res, r1[i])
                    }
                    return res;
                }
            } else {
                return function(g) {
                    return r1(g) && r2(g);
                };
            }
        },
        /** Returns the disjunction of the two specified selectors. */
        or: function(r1, r2) {
            if ($.isArray(r1) && (typeof r2 == 'undefined' || r2 == null)) {
                if (r1.length == 0)
                    return all_selector;
                else {
                    var res = r1[0];
                    for (var i = 1; i < r1.length; i++) {
                        res = this.or(res, r1[i])
                    }
                    return res;
                }
            } else {
                return function(g) {
                    return r1(g) || r2(g);
                };
            }
        },
        /** Returns the negation of the specified selector. */
        not: function(r) {
            return function(g) {
                return !r(g);
            };
        },
        /** Returns a custom selector from a string. */
        fromString: function(s) {
            var selector = this.all;
            var queries = s.split("&");
            for (var i = 0; i < queries.length; i++) {
                var query = queries[i].split("=");
                var name = query[0];
                var terms = query.length > 1 ? query[1] : "";
                if (name == "name")
                    selector = this.and(selector, this.name(terms));
                else if (name == "attr")
                    selector = this.and(selector, this.attribute(terms));
                else if (name == "place")
                    selector = this.and(selector, this.place(terms));
                else if (name == "border")
                    selector = this.and(selector, this.border(terms));
                else if (name == "id")
                    selector = this.and(selector, this.id(terms));
                else if (name == "stars")
                    selector = this.and(selector, this.stars(terms));
                else if (name == "shape")
                    selector = this.and(selector, this.shape(terms));
            }
            return selector;
        },

        mkQuery: function(options) {
            var queries = new Array();
            var h = function(n, vs) {
                var v = vs;
                if ($.isArray(vs))
                    v = vs.join(",");
                return n + "=" + v;
            };
            var names = new Array("id", "name", "stars", "attr", "place", "border", "shape", "skill");
            for (var i = 0; i < names.length; i++) {
                if (names[i] in options)
                    queries.push(h(names[i], options[names[i]]));
            }
            return queries.join("&");
        },

        /** Returns a selector that finds matches among cards and their prototypes. */
        rec: function(r) {
            return function(g) {
                if (r(g))
                    return true;
                if (g.proto == null)
                    return false;
                g = getCard(g.proto);
                return r(g);
            };
        },
        /** Returns the cards selected by a specified selector. */
        select: function(r, gcs) {
            if (typeof gcs == 'undefined' || gcs == null)
                gcs = Card.all;
            
            return List.fold_left(
                function(res, g) { if (r(g)) res.push(g); return res; },
                new Array(),
                gcs
            );
        }
    };
})();
/** ======================================== End of Selectors ======================================== */



/** ======================================== Coliseum Restrictions ======================================== */
var OldRestrictions = (function() {
    return new Array(
        { name: "Seasand Cup: Deadmoond Desert and Cerulean Deep",
          selector: Selector.rec(Selector.place("desert,ocean,invitation"))
        },
        { name: "Seasand Cup: Deadmoond Desert and Cerulean Deep, No Gold",
          selector: Selector.and(Selector.not(Selector.border("almighty")), Selector.rec(Selector.place("desert,ocean,invitation")))
        },
        { name: "Seasand Cup: Fire, No Limited",
          selector: Selector.and(Selector.attribute("fire"), Selector.border("none"))
        },
        { name: "Unlimited Cup XI: Guardians with names containing 5 letters",
          selector: function(g) {
              return g.name.length == 5;
          }
        },
        { name: "Unlimited Cup XII: Guardians capable of learning the Revival ability only",
          selector: function(g) {
              return g.canLearnSkill(revival);
          }
        },
        { name: "Unlimited Cup XVII: Guardians with names ending in \"n\"",
          selector: function(g) {
              return g.name.charAt(g.name.length - 1) == 'n';
          }
        },
        { name: "Unlimited Cup XVIII: Seated Guardians",
          selector: Selector.rec(function(g) { 
              return g.id == "40021" || g.id == "40025" || g.id == "40038" || g.id == "40047" || g.id == "40053" ||
                  g.id == "40054" || g.id == "40055" || g.id == "40091" || g.id == "40146" || g.id == "40159" ||
                  g.id == "40160" || g.id == "40205" || g.id == "40207" || g.id == "40252" || g.id == "40253" ||
                  g.id == "30040" || g.id == "30061" || g.id == "30065" || g.id == "30066" || g.id == "20007" ||
                  g.id == "20022" || g.id == "20051" || g.id == "20056" || g.id == "20058" || g.id == "20067" ||
                  g.id == "20075" || g.id == "20094" || g.id == "10058" || g.id == "10061" || g.id == "10080" ||
                  g.id == "10084" || g.id == "00005" || g.id == "00043" || g.id == "00072";
          })
        },
        { name: "1st Berneside Cup: Berneside Guardians (Veteran and Elite)",
          selector: Selector.rec(function(g) {
              return g.place == Place.plains || g.place == Place.plains_night;
          })
        },
        { name: "1st Berneside Cup: Untradable Guardians (Special)",
          selector: function(g) {
              return g.id == "40085" || g.id == "40157" || g.id == "40159" || g.id == "40160" || g.id == "40202" ||
                  g.id == "40203" || g.id == "40217" || g.id == "40221" || g.id == "40222" || g.id == "40223" ||
                  g.id == "40231" || g.id == "40232" || g.id == "40233" || g.id == "30082" || g.id == "20063" ||
                  g.id == "20064" || g.id == "20065" || g.id == "20078" || g.id == "20079" || g.id == "20096" ||
                  g.id == "20097" || g.id == "10054" || g.id == "10055" || g.id == "10067" || g.id == "10068" ||
                  g.id == "10069" || g.id == "gilded scarab" || g.id == "evolved predator" || g.id == "10086" || g.id == "10087" ||
                  g.id == "sanguine serket" || g.id == "frost slime (quests)" || g.id == "00056" || g.id == "00057" || g.id == "00067" ||
                  g.id == "00068" || g.id == "00072" || g.id == "emerald carbuncle" || g.id == "ravishing elf" || g.id == "00083" ||
                  g.id == "chonchon (quests)" || g.id == "mimetic parandus";
          }
        },
        { name: "49th Unlimited Cup XIX: (Guardians with water in their artwork)",
          selector: function(g) {
              return g.id == "40328" || g.id == "40327" || g.id == "40214" || g.id == "40206" || g.id == "40147" ||
                  g.id == "40143" || g.id == "40102" || g.id == "40030" || g.id == "40025" || g.id == "40019" ||
                  g.id == "40017" || g.id == "40002" || g.id == "30076" || g.id == "30075" || g.id == "30066" ||
                  g.id == "30064" || g.id == "30063" || g.id == "30058" || g.id == "30042" || g.id == "30041" ||
                  g.id == "30040" || g.id == "30037" || g.id == "30006" || g.id == "30003" || g.id == "20110" ||
                  g.id == "20093" || g.id == "20084" || g.id == "20083" || g.id == "20077" || g.id == "20076" ||
                  g.id == "20075" || g.id == "20074" || g.id == "20073" || g.id == "20070" || g.id == "20069" ||
                  g.id == "20068" || g.id == "20047" || g.id == "20013" || g.id == "20005" || g.id == "20004" ||
                  g.id == "10100" || g.id == "frost slime" || g.id == "10074" || g.id == "10066" || g.id == "10060" ||
                  g.id == "10059" || g.id == "10045" || g.id == "10041" || g.id == "10040" || g.id == "10038" ||
                  g.id == "10030" || g.id == "10029" || g.id == "10004" || g.id == "10003" || g.id == "00095" ||
                  g.id == "00066" || g.id == "00065" || g.id == "00063" || g.id == "00062" || g.id == "00061" ||
                  g.id == "00060" || g.id == "00059" || g.id == "00058" || g.id == "00051" || g.id == "00046" ||
                  g.id == "00037" || g.id == "00007" || g.id == "00006" || g.id == "00005";
          }
        },
        { name: "51th Unlimited Cup XX: (Armed Guardians)",
          selector: function(g) {
              return List.mem(g.id, new Array(
                  "40009", "40010", "40012", "40023", "40024", "40047", "40052", "40055", "40091", "40092",
                  "40093", "40136", "40137", "40145", "40147", "40159", "40181", "40078", "40204", "40206",
                  "40207", "40253", "40255", "40334",
                  "30008", "30017", "30025", "30026", "30028", "30031", "30034", "30038", "30045", "30046",
                  "30049", "30051", "30054", "30055", "30056", "30057", "30061", "30079", "30081",
                  "20004", "20009", "20015", "20018", "20023", "Mandarin Dragonling", "Violet Dragonling", "20030", "20035", "20036",
                  "20038", "20039", "20040", "20042", "20050", "20052", "20057", "20070", "20086", "20097",
                  "10002", "10005", "10006", "10007", "10018", "10019", "10020", "10022", "10023", "10027",
                  "10033", "10044", "10046", "10058", "10063", "10065", "10074", "10077", "10083", "10084",
                  "10086", "10087",
                  "00006", "00008", "00009", "00011", "00012", "00015", "00023", "00024", "00026", "00031",
                  "00032", "00033", "00038", "00054", "00064", "Skeleton", "00078", "00079", "Ravishing Elf"
              ));
          }
        }
    );
})();

var Restrictions = (function() {
    return new Array(
        { name: "No Restriction",
          selector: function(g) { 
              return true; 
          } 
        },
        { name: "No Limited (color-bordered) Cards",
          selector: function(g) { 
              return g.border == Border.none; 
          } 
        },
        { name: "No Almighty Cards",
          selector: function(g) { 
              return g.border != Border.almighty; 
          } 
        }
    );
})();
/** ======================================== End of Coliseum Restrictions ======================================== */






function clone(obj, deep) {
    deep = typeof deep == 'undefined' ? false : true;
    return jQuery.extend(deep, {}, obj);
}

function insertAttributesTable(e) {
    var s = "<table class='attributes'><tr><th></th>";
    var attributes = Attribute.all;
    for (var i = 0; i < attributes.length; i++) {
        s += "<th>" + attributes[i].getImage() + "</th>";
    }
    s += "</tr>";
    for (var i = 0; i < attributes.length; i++) {
        s += "<tr><th>" + attributes[i].getImage() + "</th>";
        for (var j = 0; j < attributes.length; j++) {
            s += "<td>";
            if (attributes[i].isCriticalTo(attributes[j]))
                s += "<font color='green'>+</font>";
            else if (attributes[i].isBlockedBy(attributes[j]))
                s += "<font color='red'>-</font>";
            s += "</td>";
        }    
        s += "</tr>";
    }
    s += "</table>";
    e.innerHTML = s;
}

function insertAttributesTextTable(e) {
    var s = "<table class='attributes'><tr><th></th>";
    var attributes = Attribute.all;
    for (var i = 0; i < attributes.length; i++) {
        s += "<th>" + attributes[i].name + "</th>";
    }
    s += "</tr>";
    for (var i = 0; i < attributes.length; i++) {
        s += "<tr><th>" + attributes[i].id + ": " + attributes[i].name + "</th>";
        for (var j = 0; j < attributes.length; j++) {
            s += "<td>";
            if (attributes[i].isCriticalTo(attributes[j]))
                s += "<font color='green'>+</font>";
            else if (attributes[i].isBlockedBy(attributes[j]))
                s += "<font color='red'>-</font>";
            s += "</td>";
        }    
        s += "</tr>";
    }
    s += "</table>";
    e.innerHTML = s;
}

function insertSkillsTable(e) {
    var s = "<table class='skills'><tr><th>Name</th><th>Description</th><th>Cost (HP)</th><th>Cost (MP)</th></tr>";
    for (var i = 0; i < Skill.all.length; i++) {
        s += "<tr>";
        s += "<td>" + Skill.all[i].name + "</td>";
        s += "<td>" + Skill.all[i].description + "</td>";
        s += "<td>" + Skill.all[i].hp_cost + "</td>";
        s += "<td>" + Skill.all[i].cost + "</td>";
        s += "</tr>";
    }
    s += "</table>";
    e.innerHTML = s;
}



/** ======================================== Sorting ======================================== */
var Sorting = (function() {
    var name_sorting = function(x, y) {
        if (x.name < y.name)
            return -1;
        else if (x.name > y.name)
            return 1;
        else
            return 0;
    };
    var place_sorting = function(x, y) { 
        if (x.place.id < y.place.id)
            return -1;
        else if (x.place.id > y.place.id)
            return 1;

        if ("place2" in x && "place2" in y) {
            var xp = Array.isArray(x.place2) ? x.place2[0] : x.place2;
            var yp = Array.isArray(y.place2) ? y.place2[0] : y.place2;
            if (xp < yp)
                return -1;
            else if (xp > yp)
                return 1;
        }

        return name_sorting(x, y);
    };
    var comparator = function(x, y, vx, vy, rec) {
        if (vx < vy)
            return -1;
        else if (vx > vy)
            return 1;
        else if (typeof rec != 'undefined' && rec != null)
            return rec(x, y);
        else
            return name_sorting(x, y);
    };
    return  {
        name: name_sorting,
        place: place_sorting,
        id: function(x, y) {
            if (x.id < y.id)
                return -1;
            else if (x.id > y.id)
                return 1;
            else
                return 0;
        },
        attribute: function(x, y) {
            if (x.id == y.id)
                return 0;

            if (x.attribute.id < y.attribute.id)
                return -1;
            else if (x.attribute.id > y.attribute.id)
                return 1;
            else if (x.border.id < y.border.id)
                return -1;
            else if (x.border.id > y.border.id)
                return 1;

            return name_sorting(x, y);
        },
        border: function(x, y) {
            return comparator(x, y, x.border.id, y.border.id);
        },
        bordered: function(x, y) {
            return comparator(x, y, x.event.id, y.event.id, function(x, y) {
                return comparator(x, y, -x.border.id, -y.border.id, place_sorting);
            });
        },
        stars: function(x, y) {
            return comparator(x, y, -x.stars, -y.stars, function(x, y) { return comparator(x, y, x.border.id, y.border.id); });
        },
        skill: function(s1, s2) {
            var i1 = s1.stone;
            var i2 = s2.stone;

            if (i1 == 0 && i2 == 1)
                return -1;
            else if (i1 == 1 && i2 == 0)
                return 1;
            
            i1 = s1.level;
            i2 = s2.level;

            if (i1 < i2)
                return 1;
            else if (i1 > i2)
                return -1;
            
            i1 = s1.attribute.id;
            i2 = s2.attribute.id;
            
            if (i1 < i2)
                return -1;
            else if (i1 > i2)
                return 1;

            return name_sorting(s1, s2);
        },
        hp: function(x, y, buff) { 
            return comparator(x, y, -x.getMaxHP(), -y.getMaxHP());
        },
        mp: function(x, y, buff) { 
            return comparator(x, y, -x.getMaxMP(), -y.getMaxMP()); 
        },
        atk: function(x, y, buff) { 
            if (buff == 0)
                return comparator(x, y, -x.getMaxATK(), -y.getMaxATK()); 
            else {
                var mx = 1;
                var my = 1;
                var skillsx = buff == 1 ? x.getRecommends() : x.skills;
                var skillsy = buff == 1 ? y.getRecommends() : y.skills;
                for (var i = 0; i < skillsx.length; i++) {
                    if (skillsx[i].atk > 0)
                        mx += skillsx[i].atk;
                }
                for (var i = 0; i < skillsy.length; i++) {
                    if (skillsy[i].atk > 0)
                        my += skillsy[i].atk;
                }
                return comparator(x, y, -x.getMaxATK() * mx, -y.getMaxATK() * my); 
            }
        },
        def: function(x, y, buff) { 
            if (buff == 0)
                return comparator(x, y, -x.getMaxDEF(), -y.getMaxDEF()); 
            else {
                var mx = 1;
                var my = 1;
                var skillsx = buff == 1 ? x.getRecommends() : x.skills;
                var skillsy = buff == 1 ? y.getRecommends() : y.skills;
                for (var i = 0; i < skillsx.length; i++) {
                    if (skillsx[i].def > 0)
                        mx += skillsx[i].def;
                }
                for (var i = 0; i < skillsy.length; i++) {
                    if (skillsy[i].def > 0)
                        my += skillsy[i].def;
                }
                return comparator(x, y, -x.getMaxDEF() * mx, -y.getMaxDEF() * my); 
            }
        },
        agi: function(x, y, buff) { 
            if (buff == 0)
                return comparator(x, y, -x.getMaxAGI(), -y.getMaxAGI()); 
            else {
                var mx = 1;
                var my = 1;
                var skillsx = buff == 1 ? x.getRecommends() : x.skills;
                var skillsy = buff == 1 ? y.getRecommends() : y.skills;
                for (var i = 0; i < skillsx.length; i++) {
                    if (skillsx[i].agi > 0)
                        mx += skillsx[i].agi;
                }
                for (var i = 0; i < skillsy.length; i++) {
                    if (skillsy[i].agi > 0)
                        my += skillsy[i].agi;
                }
                return comparator(x, y, -x.getMaxAGI() * mx, -y.getMaxAGI() * my); 
            }
        },
        wis: function(x, y, buff) { 
            if (buff == 0)
                return comparator(x, y, -x.getMaxWIS(), -y.getMaxWIS()); 
            else {
                var mx = 1;
                var my = 1;
                var skillsx = buff == 1 ? x.getRecommends() : x.skills;
                var skillsy = buff == 1 ? y.getRecommends() : y.skills;
                for (var i = 0; i < skillsx.length; i++) {
                    if (skillsx[i].wis > 0)
                        mx += skillsx[i].wis;
                }
                for (var i = 0; i < skillsy.length; i++) {
                    if (skillsy[i].wis > 0)
                        my += skillsy[i].wis;
                }
                return comparator(x, y, -x.getMaxWIS() * mx, -y.getMaxWIS() * my); 
            }
        },
        total: function(x, y, buff) {
            if (buff == 0)
                return comparator(x, y, - x.getMaxHP() - x.getMaxMP() - x.getMaxATK() - x.getMaxDEF() - x.getMaxAGI() - x.getMaxWIS(), 
                                  - y.getMaxHP() - y.getMaxMP() - y.getMaxATK() - y.getMaxDEF() - y.getMaxAGI() - y.getMaxWIS()); 
            else {
                var mx_atk = 1;
                var mx_def = 1;
                var mx_agi = 1;
                var mx_wis = 1;
                var my_atk = 1;
                var my_def = 1;
                var my_agi = 1;
                var my_wis = 1;
                var skillsx = buff == 1 ? x.getRecommends() : x.skills;
                var skillsy = buff == 1 ? y.getRecommends() : y.skills;
                for (var i = 0; i < skillsx.length; i++) {
                    if (skillsx[i].atk > 0)
                        mx_atk += skillsx[i].atk;
                    if (skillsx[i].def > 0)
                        mx_def += skillsx[i].def;
                    if (skillsx[i].agi > 0)
                        mx_agi += skillsx[i].agi;
                    if (skillsx[i].wis > 0)
                        mx_wis += skillsx[i].wis;
                }
                for (var i = 0; i < skillsy.length; i++) {
                    if (skillsy[i].atk > 0)
                        my_atk += skillsy[i].atk;
                    if (skillsy[i].def > 0)
                        my_def += skillsy[i].def;
                    if (skillsy[i].agi > 0)
                        my_agi += skillsy[i].agi;
                    if (skillsy[i].wis > 0)
                        my_wis += skillsy[i].wis;
                }
                return comparator(x, y, 
                                  - x.getMaxHP() - x.getMaxMP() - x.getMaxATK() * mx_atk - x.getMaxDEF() * mx_def - x.getMaxAGI() * mx_agi - x.getMaxWIS() * mx_wis, 
                                  - y.getMaxHP() - y.getMaxMP() - y.getMaxATK() * my_atk - y.getMaxDEF() * my_def - y.getMaxAGI() * my_agi - y.getMaxWIS() * my_wis); 
            }
        }
    };
})();
/** ======================================== End of Sorting ======================================== */



/** ======================================== Card Comparison ======================================== */
var Comparison = (function() {
    var key = locale.getLanguage() + ".comparison";
    var get = function() {
        var res = $.jStorage.get(key);
        if (typeof res == 'undefined' || res == null)
            res = new Array();
        return res;
    };
    var add = function(obj) {
        var res = get();
        res.push(obj);
        $.jStorage.set(key, res);
    };
    var clear = function() {
        $.jStorage.deleteKey(key);
    };
    return {
        getSize: function() {
            return get().length;
        },
        addCard: function(g) {
            var obj = {};
            obj.id = g.id;
            obj.tid = g.type.id;
            obj.skills = List.map(function(skill) {return skill.id;}, g.getSkills());
            add(obj);
        },
        getCards: function() {
            var gs = new Array();
            var objs = get();
            for (var i = 0; i < objs.length; i++) {
                var obj = objs[i];
                var g = Card.get(obj.id);
                if (g == null)
                    continue;
                g = clone(g);
                var t = Type.get(obj.tid);
                if (t == null)
                    continue;
                var sks = List.fold_left(function(res, sid) {
                    var skill = Skill.get(sid);
                    if (skill != null)
                        res.push(skill);
                    return res;
                }, new Array(), obj.skills);
                g.setType(t);
                g.setSkills(sks);
                gs.push(g);
            }
            return gs;
        },
        clear: function() {
            clear();
        }
    };

})();
/** ======================================== End of Card Comparison ======================================== */



/** ======================================== Damage Calculator ======================================== */
var MODE_UOHKO = "mode-uohko";
var MODE_OHKOBY = "mode-ohkoby";
var MODE_UQSKO = "mode-uqsko";
var MODE_QSKO = "mode-qsko";
var Calculator = (function() {
    var hasSkill = function(skills, skill) {
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].id == skill.id)
                return true;
        }
        return false;
    };

    var calculator = {
        MODE_UOHKO: MODE_UOHKO,
        MODE_OHKOBY: MODE_OHKOBY,
        MODE_UQSKO: MODE_UQSKO,
        MODE_QSKO: MODE_QSKO,
        default_options: {
            qs: false,
            sap: false,
            nonrecommended: true,
            mode: MODE_UOHKO,
            merge_oneshotby: true,
            gs_critical: true,
            plus_normal: false,
			stoned: false,
			enemy_stoned: false
        },
        skill_mult: new Array(0.065, 0.12, 0.25, 0.5, 0.6),
        getDamage: function(aw, skill, buf, attr, dw, debuf) {
            return Math.floor(aw * (1 + skill + buf) * attr - (dw * (1 + debuf)) / 2);
        },
        isOHKO: function(g1, g2, options) {
            if (typeof options == 'undefined' || options == null)
                options = this.default_options;

			if(options.stoned == true){
				g1.setStoned(true);
			}
			if(options.enemy_stoned == true){
				g2.setStoned(true);
			}
            var status1 = g1.getStatus();
            var status2 = g2.getStatus();

            /* For the opponent, consider all its skills. */
            var skills1 = g1.getSkills();
            var skills2 = options.nonrecommended ? g2.skills : g2.getRecommends();

            /* Buff and debuff. */
            var atk1 = 0;
            var wis1 = 0;
            var def2 = 0;
            var wis2 = 0;

            /* QS. */
            var qs = 0;
            if (options.mode == MODE_QSKO || options.qs) {
                if (hasSkill(skills1, Skill.qs) && status1.mp >= Skill.qs.cost) {
                    var dmg = this.getDamage(status1.atk, -0.15, atk1, 1, status2.def, def2);
                    qs = Math.max(dmg, 1);
                    status1.mp -= Skill.qs.cost;
                } else
                    qs = 0;
            }

            if (options.mode == MODE_QSKO)
                return qs >= g2.getHP();

            /* Apply buff and debuff. */
            for (var i = 0; i < skills1.length; i++) {
                var skill = skills1[i];
                if (skill.isBuff() && status1.mp >= skill.cost) {
                    atk1 += skill.atk;
                    wis1 += skill.wis;
                    status1.mp -= skill.cost;
                } else if (skill.isDebuff() && status1.mp >= skill.cost) {
                    def2 += skill.def;
                    wis2 += skill.wis;
                    status1.mp -= skill.cost;
                }
            }
            for (var i = 0; i < skills2.length; i++) {
                var skill = skills2[i];
                if (skill.isBuff() && status2.mp >= skill.cost) {
                    def2 += skill.def;
                    wis2 += skill.wis;
                    status2.mp -= skill.cost;
                } else if (skill.isDebuff() && status2.mp >= skill.cost) {
                    atk1 += skill.atk;
                    wis1 += skill.wis;
                    status2.mp -= skill.cost;
                }
            }

            /* Apply EP. */
            if (hasSkill(skills2, Skill.ep) && status2.mp >= Skill.ep.cost) {
                status2.mp -= Skill.ep.cost;
                atk1 = Math.min(0, atk1);
                wis1 = Math.min(0, wis1);
            }
            if (hasSkill(skills1, Skill.ep) && status1.mp >= Skill.ep.cost) {
                status1.mp -= Skill.ep.cost;
                def2 = Math.min(0, def2);
                wis2 = Math.min(0, wis2);
            }

            /* Normal attack. */
            var damage = this.getDamage(status1.atk, 0, atk1, 1, status2.def, def2);
            damage = Math.max(damage, 1);
            var normal = damage;

            if (!(options.sap && hasSkill(skills2, Skill.sap) && status2.mp >= Skill.sap.cost)) {
                for (var i = 0; i < skills1.length; i++) {
                    var skill = skills1[i];
                    if (skill == Skill.gs && status1.mp >= skill.cost) {
                        /* Attack by Gigant Smash. */
                        var sk = options.gs_critical ? 1 : -0.5;
                        var dmg = this.getDamage(status1.atk, sk, atk1, 1, status2.def, -1);
                        damage = Math.max(damage, dmg);
                    } else if (skill == Skill.cd && status1.mp >= skill.cost) {
                        /* Attack by Crash Drain. */
                        var sk = 0.5;
                        var dmg = this.getDamage(status1.atk, sk, atk1, 1, status2.def, def2);
                        damage = Math.max(damage, dmg);
                    } else if (skill.isPhysical() && status1.mp >= skill.cost) {
                        /* Physical attack. */
                        var dmg = this.getDamage(status1.atk, this.skill_mult[skill.level - 1], atk1, 1, status2.def, def2);
                        damage = Math.max(damage, dmg);
                    } else if (skill.isElemental() && status1.mp >= skill.cost) {
                        /* Elemental attack. */
                        var elm = 1;
                        if (hasSkill(skills2, Skill.fb) || skill.attribute.isBlockedBy(g2.attribute))
                            elm = 0.85;
                        else if (skill.attribute.isCriticalTo(g2.attribute))
                            elm = 1.15;
                        var dmg = this.getDamage(status1.wis, this.skill_mult[skill.level - 1], wis1, elm, status2.wis, wis2);
                        damage = Math.max(damage, dmg);
                    }
                }
            }

            if (hasSkill(skills1, Skill.bg) && status1.hp >= Skill.bg.hp_cost) {
                /* add 0.5 as a buff or multiply 1.5? */
                var dmg = this.getDamage(status1.atk, 0.5, atk1, 1, status2.def, def2);
                damage = Math.max(damage, dmg);   
            }

            damage += qs;

            if (options.plus_normal && g1.hasSkill(Skill.ls))
                damage += normal;
            
            return damage >= g2.getHP();
        },

        getUOHKO: function(g, opponents, options) {
			
            var unable = new Array();
            var res = {title: "Unable To OHKO", id: "uohko", cards: unable, ccount: 0, tcount: 0};
            for (var i = 0; i < opponents.length; i++) {
                var opponent = clone(opponents[i]);
                opponent.setStoned(false);
                var ts = new Array();
                for (var j = 0; j < Type.all.length; j++) {
                    var t = Type.all[j];
                    if (!opponent.hasType(t))
                        continue;
                    opponent.setType(t);
                    opponent.setLevel(opponent.getMaxLevel());
                    if (!this.isOHKO(g, opponent, options))
                        ts.push(t);
                }
                if (ts.length > 0) {
                    unable.push({opponent: opponent, types: ts});
                    res.ccount++;
                    res.tcount += ts.length;
                }
            }
            return new Array(res);
        },

        getUQSKO: function(g, opponents, options) {
            options.mode = MODE_QSKO;
            var unable = new Array();
            var res = {title: "Unable To QS-KO", id: "uqsko", cards: unable, ccount: 0, tcount: 0};
            for (var i = 0; i < opponents.length; i++) {
                var opponent = clone(opponents[i]);
                opponent.setStoned(false);
                var ts = new Array();
                for (var j = 0; j < Type.all.length; j++) {
                    var t = Type.all[j];
                    if (!opponent.hasType(t))
                        continue;
                    opponent.setType(t);
                    opponent.setLevel(opponent.getMaxLevel());
                    if (!this.isOHKO(g, opponent, options))
                        ts.push(t);
                }
                if (ts.length > 0) {
                    unable.push({opponent: opponent, types: ts});
                    res.ccount++;
                    res.tcount += ts.length;
                }
            }
            return new Array(res);
        },

        getQSKO: function(g, opponents, options) {
            options.mode = MODE_QSKO;
            var unable = new Array();
            var res = {title: "QS-KO", id: "qsko", cards: unable, ccount: 0, tcount: 0};
            for (var i = 0; i < opponents.length; i++) {
                var opponent = clone(opponents[i]);
                opponent.setStoned(false);
                var ts = new Array();
                for (var j = 0; j < Type.all.length; j++) {
                    var t = Type.all[j];
                    if (!opponent.hasType(t))
                        continue;
                    opponent.setType(t);
                    opponent.setLevel(opponent.getMaxLevel());
                    if (this.isOHKO(g, opponent, options))
                        ts.push(t);
                }
                if (ts.length > 0) {
                    unable.push({opponent: opponent, types: ts});
                    res.ccount++;
                    res.tcount += ts.length;
                }
            }
            return new Array(res);
        },

        isOHKOBy: function(g1, g2, options) {
            var res = {
                qs: false,
                normal: false,
                physical: false,
                elemental: false,
                critical: false,
                blocked: false
                // fire4x: false,
                // gs: false,
                // bg: false,
                // cd: false
            };

            if (typeof options == 'undefined' || options == null)
                options = this.default_options;
				
			if(options.stoned == true){
				g1.setStoned(true);
			}
			if(options.enemy_stoned == true){
				g2.setStoned(true);
			}

            var status1 = g1.getStatus();
            var status2 = g2.getStatus();

            /* For the opponent, consider only recommended skills. */
            var skills1 = g1.getSkills();
            var skills2 = options.nonrecommended ? g2.skills : g2.getRecommends();
            
            /* Buff and debuff. */
            var def1 = 0;
            var wis1 = 0;
            var atk2 = 0;
            var wis2 = 0;

            /* QS. */
            var qs = 0;
            if (hasSkill(skills2, Skill.qs) && status2.mp >= Skill.qs.cost) {
                var dmg = this.getDamage(status2.atk, -0.15, atk2, 1, status1.def, def1);
                qs = Math.max(dmg, 1);
                status2.mp -= Skill.qs.cost;
            } else
                qs = 0;
            res['qs'] = qs >= g1.getHP();

            /* Reset the damage by QS if QS should be ignored. */
            if (!options.qs)
                qs = 0;
            
            /* Apply buff and debuff. */
            for (var i = 0; i < skills1.length; i++) {
                var skill = skills1[i];
                if (skill.isBuff() && status1.mp >= skill.cost) {
                    def1 += skill.def;
                    wis1 += skill.wis;
                    status1.mp -= skill.cost;
                } else if (skill.isDebuff() && status1.mp >= skill.cost) {
                    atk2 += skill.atk;
                    wis2 += skill.wis;
                    status1.mp -= skill.cost;
                }
            }
            for (var i = 0; i < skills2.length; i++) {
                var skill = skills2[i];
                if (skill.isBuff() && status2.mp >= skill.cost) {
                    atk2 += skill.atk;
                    wis2 += skill.wis;
                    status2.mp -= skill.cost;
                } else if (skill.isDebuff() && status2.mp >= skill.cost) {
                    def1 += skill.def;
                    wis1 += skill.wis;
                    status2.mp -= skill.cost;
                }
            }
            
            /* Apply EP. */
            if (hasSkill(skills2, Skill.ep) && status2.mp >= Skill.ep.cost) {
                def1 = Math.min(0, def1);
                wis1 = Math.min(0, wis1);
                status2.mp -= Skill.ep.cost;
            }
            if (hasSkill(skills1, Skill.ep) && status1.mp >= Skill.ep.cost) {
                atk2 = Math.min(0, atk2);
                wis2 = Math.min(0, wis2);
                status1.mp -= Skill.ep.cost;
            }
            
            /* Normal attack. */
            var damage = this.getDamage(status2.atk, 0, atk2, 1, status1.def, def1);
            damage = Math.max(damage, 1) + qs;
            res['normal'] = damage >= g1.getHP();
            
            if (!(options.sap && hasSkill(skills1, Skill.sap))) {
                if (hasSkill(skills2, Skill.gs) && status2.mp >= Skill.gs.cost) {
                    /* Attack by Gigant Smash. */
                    var sk = options.gs_critical ? 1 : -0.5;
                    damage = this.getDamage(status2.atk, sk, atk2, 1, status1.def, -1);
                    damage = Math.max(damage, 1) + qs;
                    res['gs'] = damage >= g1.getHP();
                }

                /** Note: the last one is for Fire+4x. */
                var max_skill_level = this.skill_mult.length - 2;

                /* Physical attack. */
                damage = this.getDamage(status2.atk, this.skill_mult[max_skill_level], atk2, 1, status1.def, def1);
                damage = Math.max(damage, 1) + qs;
                res['physical'] = damage >= g1.getHP();
                
                if (!hasSkill(skills1, Skill.fb)) {
                    /* Normal elemental+4 attack. */
                    damage = this.getDamage(status2.wis, this.skill_mult[max_skill_level], wis2, 1, status1.wis, wis1);
                    damage = Math.max(damage, 1) + qs;
                    res['elemental'] = damage >= g1.getHP();
                    
                    /* Critical elemental+4 attack. */
                    damage = this.getDamage(status2.wis, this.skill_mult[max_skill_level], wis2, 1.15, status1.wis, wis1);
                    damage = Math.max(damage, 1) + qs;
                    res['critical'] = damage >= g1.getHP();
                }
                
                /* Blocked elemental+4 attack. */
                damage = this.getDamage(status2.wis, this.skill_mult[max_skill_level], wis2, 0.85, status1.wis, wis1);
                damage = Math.max(damage, 1) + qs;
                res['blocked'] = damage >= g1.getHP();

                /* Fire+4x attack. */
                // var fire4x_skill_level = this.skill_mult.length - 1;
                // var fire4x_attr_mult = (hasSkill(skills1, Skill.fb) || Attribute.fire.isBlockedBy(g1.attribute)) ? 0.85 : 
                    // (Attribute.fire.isCriticalTo(g1.attribute) ? 1.15 : 1);
                // damage = this.getDamage(status2.wis, this.skill_mult[fire4x_skill_level], wis2, fire4x_attr_mult, status1.wis, wis1);
                // damage = Math.max(damage, 1) + qs;
                // res['fire4x'] = damage >= g1.getHP(); 

                /* Crash Drain */
                // if (hasSkill(skills2, Skill.cd) && status2.mp >= Skill.cd.cost) {
                    // /* add 0.5 as a buff or multiply 1.5? */
                    // var dmg = this.getDamage(status2.atk, 0.5, atk2, 1, status1.def, def1);
                    // damage = Math.max(damage, dmg);
                    // res['cd'] = damage >= g1.getHP();
                // }
            }
            
            /* Blood Gambit (Soul Slash) */
            // if (hasSkill(skills2, Skill.bg) && status2.hp >= Skill.bg.hp_cost) {
                // /* add 0.5 as a buff or multiply 1.5? */
                // var dmg = this.getDamage(status2.atk, 0.5, atk2, 1, status1.def, def1);
                // damage = Math.max(damage, dmg);
                // res['bg'] = damage >= g1.getHP();
            // }
            
            return res;
        },

        getOHKOBy: function(g, opponents, options) {
            var res = {
                qs: new Array(),
                normal: new Array(),
                physical: new Array(),
                elemental: new Array(),
                critical: new Array(),
                blocked: new Array()
                // fire4x: new Array(),
                // gs: new Array(),
                // bg: new Array(),
                // cd: new Array()
            };
            var ccounts = {
                qs: 0,
                normal: 0,
                physical: 0,
                elemental: 0,
                critical: 0,
                blocked: 0
                // fire4x: 0,
                // gs: 0,
                // bg: 0,
                // cd: 0
            };
            var tcounts = {
                qs: 0,
                normal: 0,
                physical: 0,
                elemental: 0,
                critical: 0,
                blocked: 0
                // fire4x: 0,
                // gs: 0,
                // bg: 0,
                // cd: 0
            };

            for (var i = 0; i < opponents.length; i++) {
                var opponent = clone(opponents[i]);
                opponent.setStoned(false);
                var ts = {
                    qs: new Array(),
                    normal: new Array(),
                    physical: new Array(),
                    elemental: new Array(),
                    critical: new Array(),
                    blocked: new Array()
                    // fire4x: new Array(),
                    // gs: new Array(),
                    // bg: new Array(),
                    // cd: new Array()
                };
                for (var j = 0; j < Type.all.length; j++) {
                    var t = Type.all[j];
                    if (!opponent.hasType(t))
                        continue;
                    opponent.setType(t);
                    opponent.setLevel(opponent.getMaxLevel());
                    
                    var r = this.isOHKOBy(g, opponent, options);
                    if (options.merge_oneshotby) {
                        var b = false;
                        for (var key in r)
                            b = b || r[key];
                        if (b)
                            ts["normal"].push(t);
                    } else {
                        for (var key in r) {
                            if (r[key]) {
                                ts[key].push(t);
                            }
                        }
                    }
                }
                for (var key in ts) {
                    if (ts[key].length > 0) {
                        res[key].push({opponent: opponent, types: ts[key]});
                        ccounts[key] = ccounts[key] + 1;
                        tcounts[key] = tcounts[key] + ts[key].length;
                    }
                }
            }
            
            if (options.merge_oneshotby) {
                return new Array(
                    { title: "OHKO By",
                      cards: res.normal,
                      ccount: ccounts.normal,
                      tcount: tcounts.normal
                    }
                );
            } else {
                return new Array(
                    { title: "OHKO By QS", 
                      id: "ohko_by_qs", 
                      cards: res.qs,
                      ccount: ccounts.qs,
                      tcount: tcounts.qs
                    },
                    { title: "OHKO By Normal Attack", 
                      id: "ohko_by_normal", 
                      cards: res.normal,
                      ccount: ccounts.normal,
                      tcount: tcounts.normal
                    },
                    { title: "OHKO By Physical+4", 
                      id: "ohko_by_physical", 
                      cards: res.physical,
                      ccount: ccounts.physical,
                      tcount: tcounts.physical
                    },
                    { title: "OHKO By Normal Elemental+4", 
                      id: "ohko_by_elemental", 
                      cards: res.elemental,
                      ccount: ccounts.elemental,
                      tcount: tcounts.elemental
                    },
                    { title: "OHKO By Critical Elemental+4", 
                      id: "ohko_by_critical", 
                      cards: res.critical,
                      ccount: ccounts.critical,
                      tcount: tcounts.critical
                    },
                    { title: "OHKO By Blocked Elemental+4", 
                      id: "ohko_by_blocked", 
                      cards: res.blocked,
                      ccount: ccounts.blocked,
                      tcount: tcounts.blocked
                    }
                    // { title: "OHKO By Fire+4x", 
                      // id: "ohko_by_fire4x", 
                      // cards: res.fire4x,
                      // ccount: ccounts.fire4x,
                      // tcount: tcounts.fire4x
                    // },
                    // { title: "OHKO By Gigant Smash", 
                      // id: "ohko_by_smash", 
                      // cards: res.gs,
                      // ccount: ccounts.gs,
                      // tcount: tcounts.gs
                    // },
                    // { title: "OHKO By Blood Gambit", 
                      // id: "ohko_by_soulslash", 
                      // cards: res.bg,
                      // ccount: ccounts.bg,
                      // tcount: tcounts.bg
                    // },
                    // { title: "OHKO By Crash Drain",
                      // id: "ohko_by_cd", 
                      // cards: res.cd,
                      // ccount: ccounts.cd,
                      // tcount: tcounts.cd
                    // }
                );
            }
        }
    };

    return calculator;
})();
/** ======================================== End of Damage Calculator ======================================== */



/** ======================================== Functions for Web Page Manipulation ======================================== */

/* Functions for the navigation menu. */
var Nav = {
    appendLanguageSuffix: function() {
        $("#top_menu ul li a.langdep").each(function() {
            var href = $(this).attr("href");
            if (href.indexOf(".html") == href.length - 5 && locale.getLanguage() == LANG_JP)
                $(this).attr("href", href + "?lang=jp");
        });
        if (locale.getLanguage() == LANG_JP)
            $('#top_menu ul li a[title="Japanese"]').contents().unwrap();
        else
            $('#top_menu ul li a[title="English"]').contents().unwrap();
    },
    disable: function(id) {
        var elm = $('#' + id);
        if (elm != null)
            elm.contents().unwrap();
    },
    updateComparisonNumber: function() {
        /* Update the number of cards in the comparison. */
        $("#comparison_number").html(Comparison.getSize());
    }
};

function downloadGccards() {
    window.open("release/gccards-2013-12-27.zip");
}

/** ======================================== End of Functions for Web Page Manipulation ======================================== */
