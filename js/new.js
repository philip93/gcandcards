/* What's New */

var WhatIsNew = (function() {
    var whatisnew = function() {
        return {
			'2014/04/07': new Array(
				"Added " + Card.mklnk(40129) + ", " + Card.mklnk(40130) + ", " + Card.mklnk(40159) + ", and " + Card.mklnk(40160) + "."
			),
			'2014/04/05': new Array(
				"Added " + Card.mklnk(40143) + ", " + Card.mklnk(40144) + ", " + Card.mklnk(40145) + ", " + Card.mklnk(40146) + ", and " + Card.mklnk(40147) + "."
			),
			'2014/04/01': new Array(
				"Added " + Card.mklnk(40125) + ", " + Card.mklnk(40126) + ", " + Card.mklnk(40121) + ", and " + Card.mklnk(40122) + "."
			),
			'2014/03/23': new Array(
				"Added " + Card.mklnk(40135) + ", " + Card.mklnk(40136) + ", " + Card.mklnk(40137) + ", and " + Card.mklnk(40138) + "."
			),
			'2014/03/18': new Array(
				"Added " + Card.mklnk(40132) + " and " + Card.mklnk(40133) + "."			
			),

			'2014/03/16': new Array(
				"Added " + Card.mklnk(40098) + ", " + Card.mklnk(40099) + ", " + Card.mklnk(40087) + ", " + Card.mklnk(40088) + ", and " + Card.mklnk(40157) + "."
			),
			'2014/03/03': new Array(
				"Added " + Card.mklnk(40095) + " and " + Card.mklnk(40096) + ".  Still need skills for Almighty Behemoth and Mighty Behemoth."
			),
			'2014/02/26': new Array(
				"Still need skills for (Al)Mighty Behemoth.  I'll put him up as soon as we have his skills."
			),
			'2014/02/19': new Array(
				"Added skills for " + Card.mklnk(40444) + ".",
				"Added RB skills for " + Card.mklnk(40444) + ", " + Card.mklnk(44002) + ", " + Card.mklnk(44003) + ", " + Card.mklnk(44001) + ", and " + Card.mklnk(40445) + "."
			),
			'2014/02/17': new Array(
				"Added " + Card.mklnk(40150) + " and " + Card.mklnk(40151) + "."
			),
			'2014/02/13': new Array(
				"Added " + Card.mklnk(45000) + "."
			),
			'2014/02/12': new Array(
				"Added " + Card.mklnk(40070) + " and " + Card.mklnk(40071) + ".",
				"Added the FFXIII Eidolons.  However, due note that we don't have all the skills for all the cards.  IN CASES WHERE THE SKILLS OTHER THAN THE RB SKILLS ARE UNKNOWN, I USED SLASH +1 AS A PLACEHOLDER.  NONE OF THEM TO MY KNOWLEGE ACTUALLY USE IT.",
				"Added " + Card.mklnk(40429) + ", " + Card.mklnk(40445) + ", " + Card.mklnk(44001) + ", " + Card.mklnk(40444) + ", " + Card.mklnk(40446) + ", " + Card.mklnk(44003) + ", and " + Card.mklnk(44002) + "."
			),
			'2014/02/06': new Array(
				"Fixed " + Card.mklnk(30054) + ".",
				"Added RB skill for " + Card.mklnk(44004) + "."
			),
			'2014/02/03': new Array(
				"Added " + Card.mklnk(40082) + " and " + Card.mklnk(40083) + "."
			),
			'2014/02/02': new Array(
				"Found the RB skill for " + Card.mklnk(40020) + "."
			),
			'2014/01/30': new Array(
				"Rebirth is here!  I'm still looking for the RB skills of " + Card.mklnk(40020) + ", " + Card.mklnk(44004) + ", and " + Card.mklnk(40336) + " (The cards that changed enough from iOS to warrant another look, but that no one seems to have RBed yet)."
			),
			'2014/01/29': new Array(
				"Added support for Bossman's guide build right into the site!  If you go to options, you can select to use None, or Bossman's guide for Type classification.  What this will do is change the color of the text of the type above the stat box.  Ace appears yellow, best types are green, good types blue, and bad types red.  Right now, only the 5*s are Bossman-compliant, the 4*s and borders are from a much older guide, but I'm going to work them in as I get time.",
				"Fixed a bug where Fire+4x and other skills that aren't currently in the Android version of the game were affecting the One-Shot-Killed by calculation.",
				"Fixed an awkward corner case of the comparison page which counted the card selected as stoned, but it's opponents as unstoned.  Now, both count as stoned for the purpose of showing one-shot-kills."
			),
			'2014/01/27': new Array(
				"Added " + Card.mklnk(40079) + " and " + Card.mklnk(40080) + "."
			),
			'2014/01/21': new Array(
				"Added " + Card.mklnk(40065) + " and " + Card.mklnk(40066) + ".",
				"Added flavor text to " + Card.mklnk(40060) + " and " + Card.mklnk(40061) + "."
			),
			'2014/01/20': new Array(
				"Fixed a bug where " + Card.mklnk(44005) + " was being counted by the simulation system as Death type rather than Poison type."
			),
			'2014/01/16': new Array(
				"Fixed skills on " + Card.mklnk(40031) + " and " + Card.mklnk(40032) + ".",
				"Fixed stats on " + Card.mklnk(40047) + "."
			),
			'2014/01/14': new Array(
				"Added " + Card.mklnk(40060) + " and " + Card.mklnk(40061) + ".",
				"Fixed " + Card.mklnk(40092) + ".",
				"Added " + Card.mklnk(40078) + ", " + Card.mklnk(30053) + ", " + Card.mklnk(30054) + ", " + Card.mklnk(30055) + ", " + Card.mklnk(30056) + "."
			),
			'2014/01/12': new Array(
				"Added " + Card.mklnk(40085) + "."
			),
			'2014/01/11': new Array(
				"Added the 3* cards up to this point.  As I'm not really up to the task of checking all of them, and I doubt SqEnix made any changes to them, all stats are from the iOS version, but I highly doubt they changed."
			),
			'2014/01/10': new Array(
				"Added " + Card.mklnk(40092) + ".  Sorry that took so long to get this out."
			),
			'2014/01/09': new Array(
				"Added " + Card.mklnk(40090) + ".  Still need the stats and skills of Thor, so if anyone has the level 1 cool stats and skills for him, send me a PM."
			),
			'2014/01/08': new Array(
				"Added " + Card.mklnk(40093) + "."
			),
			'2014/01/07': new Array(
				"Added " + Card.mklnk(40091) + ", " + Card.mklnk(30057) + ", and " + Card.mklnk(30058) + ".",
				"The rest of the new snowfield cards will be added when we get confirmation on their stats and skills."
			),
			'2014/01/06': new Array(
				"Fixed " + Card.mklnk(40023) + ".",
				"Added " + Card.mklnk(40488) + " and " + Card.mklnk(40489) + ".",
				"Added images for " + Card.mklnk(40112) + ", " + Card.mklnk(40113) + ", " + Card.mklnk(40109) + ", " + Card.mklnk(40110) + ", " + Card.mklnk(40075) + ", " + Card.mklnk(40076) + "."
			),
			'2014/01/03': new Array(
				"Fixed stats on " + Card.mklnk(40110) + ".",
				"Card images are up!  Let me know if there are any problems."
			),
			'2014/01/02': new Array(
				"In the card page, you can now select wether your card or the enemy cards are stoned or not.  As will all things I try to do, there are bound to be bugs, so let me know if you find any.",
				"Fixed the issue where some cards had the wrong IDs.  If anyone catches any other mistake, don't be afraid to send me a PM on the forum (Purplemandown, link's at the bottom of the page)."
			),
            '2014/01/01': new Array(
				"Sorry, I had 4* Ace's disabled by accident.  Still learning this system.  They should be back up now.",
				"I had to completely remove the iOS 1, 2, and 3 star cards from the site, as they were causing errors with my fix for the massive list of hunting locations that we don't have.  There shouldn't be any problems when I put the Android version up for real.",
				"Removed the Aura cards that were leftover from the iOS version of the site",
				"Fixed an issue where certain bordered cards were showing the wrong colliseum number",
                "Added all the 4*, 5* and Bordered cards."
            )
            
        };
    };

/*
    var past_whatisnew = {
        '2013/9/30': new Array(
            "Add " + Card.mklnk(20112) + ", " + Card.mklnk(20113) + ", " + Card.mklnk(30089) + " and " + Card.mklnk(40392),
            "Add " + Card.mklnk(40374) + ", " + Card.mklnk(40375) + ", and " + Card.mklnk(40376) + ".",
            "Add " + Card.mklnk(40386) + ", " + Card.mklnk(40387) + ", and " + Card.mklnk(40388) + ".",
            "(the data of most 55-th coliseum rewards are missing)"
        ),
        '2013/9/23': new Array(
            "Add " + Card.mklnk(40377) + ", " + Card.mklnk(40378) + ", and " + Card.mklnk(40379) + ".",
            "Add " + Card.mklnk(40383) + ", " + Card.mklnk(40384) + ", and " + Card.mklnk(40385) + "."
        ),
        '2013/9/18': new Array(
            "Add 1*, 2*, and 3* cards in Glaverow Volcanic Zone (Night).",
            "Add " + Card.mklnk(30083) + ", " + Card.mklnk(30084) + ", " + Card.mklnk(30085) + ", " + Card.mklnk(30086) + ", " + Card.mklnk(30087) + ", and " + Card.mklnk(30088) + ".",
            "Add " + Card.mklnk(40262) + ", " + Card.mklnk(40263) + ", " + Card.mklnk(40264) + ", " + Card.mklnk(40265) + ", and " + Card.mklnk(40266) + "."
        ),
        '2013/9/16': new Array(
            "Add " + Card.mklnk(40249) + ", " + Card.mklnk(40250) + ", and " + Card.mklnk(40251) + "."
        ),
        '2013/9/9': new Array(
            "Add " + Card.mklnk(40224) + ", " + Card.mklnk(40225) + ", and " + Card.mklnk(40226) + "."
        ),
        '2013/9/2': new Array(
            "Add " + Card.mklnk(40234) + ", " + Card.mklnk(40235) + ", and " + Card.mklnk(40236) + "."
        ),
        '2013/8/26': new Array(
            "Add " + Card.mklnk(40334) + ", " + Card.mklnk(40335) + ", " + Card.mklnk(40336) + ", " + Card.mklnk(40337) + ", and " + Card.mklnk(40338) + ". (All data missing.)",
            "Add " + Card.mklnk(40194) + ", " + Card.mklnk(40195) + ", and " + Card.mklnk(40196) + "."
        ),
        '2013/8/19': new Array(
            "Add " + Card.mklnk(40227) + ", " + Card.mklnk(40228) + ", and " + Card.mklnk(40229) + "."
        ),
        '2013/8/2': new Array(
            "Add " + Card.mklnk("00095") + ", " + Card.mklnk(10100) + ", " + Card.mklnk(20110) + ", and " + Card.mklnk(20111) + ".",
            "Add " + Card.mklnk(40327) + " and " + Card.mklnk(40328) + ".",
            "Add " + Card.mklnk(40218) + ", " + Card.mklnk(40219) + ", and " + Card.mklnk(40220) + "."
        ),
        '2013/8/6': new Array(
            "Add selection of guardians for 1st Berneside Cup."
        ),
        '2013/8/5': new Array(
            "Add " + Card.mklnk(40272) + " and " + Card.mklnk(40273) + ".",
            "Add " + Card.mklnk(40174) + ", " + Card.mklnk(40175) + ", and " + Card.mklnk(40176) + "."
        ),
        '2013/7/9': new Array(
            "Add " + Card.mklnk(40208) + ", " + Card.mklnk(40209) + ", and " + Card.mklnk(40210) + "."
        ),
        '2013/7/24': new Array(
            "Fix a bug in applying EP."
        ),
        '2013/7/22': new Array(
            "Add the selection of eligible guardians for the 46th Special Coliseum (Unlimited Cup XVII).",
            "Add " + Card.mklnk(40233) + ".",
            "Add " + Card.mklnk(30082) + ".",
            "Add " + Card.mklnk(40252) + ", " + Card.mklnk(40253) + ", " + Card.mklnk(40254) + ", and " + Card.mklnk(40255) + ".",
            "Add " + Card.mklnk(40237) + ", " + Card.mklnk(40238) + ", " + Card.mklnk(40239) + ", " + Card.mklnk(40240) + ", " + Card.mklnk(40241) + ", "
                + Card.mklnk(40242) + ", " + Card.mklnk(40243) + ", " + Card.mklnk(40244) + ", " + Card.mklnk(40245) + ", " + Card.mklnk(40246) + ", "
                + Card.mklnk(40247) + ", and " + Card.mklnk(40248) + "."
        ),
        '2013/7/16': new Array(
            "Add " + Card.mklnk(40231) + " and " + Card.mklnk(40232) + ".",
            "Add " + Card.mklnk(40161) + ", " + Card.mklnk(40162) + ", and " + Card.mklnk(40163) + "."
        ),
        '2013/7/8': new Array(
            "Add " + Card.mklnk(40197) + ", " + Card.mklnk(40198) + ", and " + Card.mklnk(40199) + "."
        ),
        '2013/7/1': new Array( 
            "Add " + Card.mklnk(40191) + ", " + Card.mklnk(40192) + ", and " + Card.mklnk(40193) + "."
        ),
        '2013/6/25': new Array(
            "Add 1* cards in Berneside Plains (Night)."
        ),
        '2013/6/24': new Array(
            "Add " + Card.mklnk(10076) + ", " + Card.mklnk(10077) + ", " + Card.mklnk(10078) + ", " + Card.mklnk(10079) + ", " + Card.mklnk(10080) + ", " + Card.mklnk(10081) + ", " + Card.mklnk(10082) + ", " + Card.mklnk(10083) + ", and " + Card.mklnk(10084) + ".",
            "Add " + Card.mklnk(20085) + ", " + Card.mklnk(20086) + ", " + Card.mklnk(20087) + ", " + Card.mklnk(20088) + ", " + Card.mklnk(20089) + ", " + Card.mklnk(20090) + ", " + Card.mklnk(20092) + ", " + Card.mklnk(20093) + ", " + Card.mklnk(20094) + ", and " + Card.mklnk(20095) + ".",
            "Add " + Card.mklnk(30077) + ", " + Card.mklnk(30078) + ", " + Card.mklnk(30079) + ", " + Card.mklnk(30080) + ", and " + Card.mklnk(30081) + ".",
            "Add " + Card.mklnk(40211) + ", " + Card.mklnk(40212) + ", " + Card.mklnk(40213) + ", " + Card.mklnk(40214) + ", " + Card.mklnk(40215) + ", and " + Card.mklnk(40217) + ".",
            "Add " + Card.mklnk(40177) + ", " + Card.mklnk(40178) + ", and " + Card.mklnk(40179) + "."
        ),
        '2013/6/17': new Array(
            "Add " + Card.mklnk(40185) + ", " + Card.mklnk(40186) + ", and " + Card.mklnk(40187) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us' target='_blank'>this thread</a> on GCF)",
            "Add " + Card.mklnk("00083") + ", " + Card.mklnk(10085) + ", " + Card.mklnk(10086) + ", " + Card.mklnk(10087) + ", " + Card.mklnk(20096) + ", and " + Card.mklnk(20097) + "."
        ),
        '2013/6/10': new Array(
            "Add " + Card.mklnk(40168) + ", " + Card.mklnk(40169) + ", and " + Card.mklnk(40170) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us' target='_blank'>this thread</a> on GCF)",
            "Fix the skillset order of " + Card.mklnk(40181) + ". (Thanks cykrix for reporting on the <a href='http://gccards.bbs.fc2.com'>BBS</a>.)"
        ),
        '2013/6/7': new Array(
            "Add " + Card.mklnk(40202) + " and " + Card.mklnk(40203) + "."
        ),
        '2013/6/5': new Array(
            "Fix the description of the calculation of max states. (Thanks chkkrt for reporting on the <a href='http://gccards.bbs.fc2.com'>BBS</a>.)",
            "Move " + Card.mklnk(40042) + " from Almighty to Mighty. (Thanks Cielo for reporting on the <a href='http://gccards.bbs.fc2.com'>BBS</a>.)"
        ),
        '2013/6/4': new Array(
            "Add " + Card.mklnk(40221) + ", " + Card.mklnk(40222) + ", and " + Card.mklnk(40223) + "."
        ),
        '2013/6/3': new Array(
            "Add " + Card.mklnk(40171) + ", " + Card.mklnk(40172) + ", and " + Card.mklnk(40173) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us' target='_blank'>this thread</a> on GCF)",
            "Fix the skillset of " + Card.mklnk(10045) + ". (Thanks <a href='http://guardiancross-forum.com/User-Krudd'>Krudd</a> from GCF.)",
            "Add the skillset and profile of " + Card.mklnk(10073) + ". (Thanks <a href='http://guardiancross-forum.com/User-Krudd'>Krudd</a> from GCF.)"
        ),
        '2013/5/30': new Array(
            "Add an option to avoid loading cards that you never want to see."
        ),
        '2013/5/27': new Array(
            "Add an option to add the damage by one Normal Attack after LS. (AGI is ignored.)",
            "Add " + Card.mklnk(40164) + ", " + Card.mklnk(40165) + ", and " + Card.mklnk(40166) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us' target='_blank'>this thread</a> on GCF)"
        ),
        '2013/5/23': new Array(
            "Add 6 new ocean 4*, 3*, and 2* cards.",
            "Add 4 new ocean 5* cards: " + Card.mklnk(40204) + ", " + Card.mklnk(40205) + ", " + Card.mklnk(40206) + ", " + Card.mklnk(40207) + "."
        ),
        '2013/5/22': new Array(
            "Add " + Card.mklnk(40155) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us'>this thread</a> on GCF)"
        ),
        '2013/5/21': new Array(
            "Sort available type classification systems by name. If you use one of them, please re-select it in Options.",
            "Add " + Card.mklnk(40154) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us'>this thread</a> on GCF)"
        ),
        '2013/5/20': new Array(
            "Fix the MP cost of +25% buff skills. (Thanks eunihorn and nutmagz on <a href='http://guardiancross-forum.com/Thread-GCCards-a-website-with-GC-cards-information?page=6'>GCF</a>.)",
            "Add " + Card.mklnk(40153) + ". (Based on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us'>this thread</a> on GCF)",
            "Add another type classification made by <a href='http://gc-compendium.blogspot.co.uk/2013/04/v-behaviorurldefaultvmlo.html'>Alan Vaz</a>.",
            "Add " + Card.mklnk(20066) + " and " + Card.mklnk(20067) + ".",
            "Make type classification disabled by default."
        ),
        '2013/5/19': new Array(
            "Add the profile of Ungur. (Thanks LeandroNH on <a href='http://guardiancross-forum.com/Thread-Help-for-GCX-important-for-all-of-us?page=22'>GCF</a>.)"
        ),
        '2013/5/18': new Array(
            "Display classification of types into good, decent, and bad types based on <a href='http://guardiancross-forum.com/Thread-Guardian-Cross-5-Guide-FFV-Gilgamesh-Added' target='_blank'>this thread</a>. See <a href='javascript:openDialog(\"faq_qa\")'>Q&A</a></div> for more details."
        ),
        '2013/05/14': new Array(
            "Add " + Card.mklnk(40141) + "."
        ),
        '2013/05/13': new Array(
            "Add 1* cards.",
            "Add " + Card.mklnk(40139) + " and " + Card.mklnk(40140) + ".",
            "Add 2* cards.",
            "Fix the ID of 4* " + Card.mklnk(30021) + ".",
            "Sort coliseum rewards by time.",
            "Fix a skill of " + Card.mklnk(40159) + ".",
            "Allow merging of the one-shot-by results.",
            "Allow loading of future cards with the query string \"with=new\"."
        ),
        '2013/05/11': new Array(
            "Add profiles of Abaddon and Poseidon. (Thanks eunihorn on <a href='http://guardiancross-forum.com/Thread-GCCards-a-website-with-GC-cards-information?page=4'>GC Forum</a>)",
            "Allow custom selection of opponents."
        ),
        '2013/05/10': new Array(
            "Add one shot by.",
            "Add " + Card.mklnk(30019) + ".",
            "Ignore QS by default.",
            "Fix the skill set of " + Card.mklnk(30049) + ". (Thanks V.Iyce on <a href='http://guardiancross-forum.com/Thread-GCCards-a-website-with-GC-cards-information?page=2'>GC Forum</a>.)",
            "Fix the skill set of " + Card.mklnk(30056) + ". (Thanks Yahra  on <a href='http://guardiancross-forum.com/Thread-GCCards-a-website-with-GC-cards-information?page=2'>GC Forum</a>.)"
        ),
        '2013/05/09': new Array(
            "Update the damage formula for Gigant Smash.",
            "Add 3* cards in Cerulean Deep.",
            "Add cards in the Sevenstone Serpents Event.",
            "Add cards in the Seven Deadly Weapons Event.",
            "Add coliseum conditions.",
            "Fix the skills of " + Card.mklnk(30056) + "."
        ),
        '2013/05/08': new Array(
            "Add " + Card.mklnk(40159) + ", " + Card.mklnk(40160) + ", and " + Card.mklnk(30071) + " (3rd invitation bonus).",
            "Add top 100.",
            "Add damage formula and skills table.",
            "Add " + Card.mklnk(40129) + ", " + Card.mklnk(40130) + ", and " + Card.mklnk(40131) + ".")
    };
*/

    return {
        get: whatisnew
    };
})();

function showWhatIsNew() {
    $("#selected-guardian").html("").append(
        $("<div id='whatisnew'></div>")
            .append("<span class='title'>What's New</span>")
            .append("<p><dl id='whatisnewlist'></dl></p>")
    );
    var whatisnew = WhatIsNew.get();
    for (var date in whatisnew) {
        var items = whatisnew[date];
        $("#whatisnewlist")
          .append("<dt><time>" + date + "</time></dt>")
          .append("<dd><ul></ul></dd>");
        for (var i = 0; i < items.length; i++) {
            $("#whatisnewlist dd ul").last().append("<li>" + items[i] + "</li>");
        }
    }
}
