NAME=gccards
JS_SRC=json2.js jstorage.js \
	loader.js locale.js gc.js \
	1s.js 1s_jp.js 2s.js 2s_jp.js 3s.js 3s_jp.js \
	4s.js 4s_jp.js 5s.js 5s_jp.js \
	quests.js new.js new_jp.js evaluation.js \
	web.js battle.js cards.js excards.js comparison.js simulator.js \
	m_cards.js
JS_BIN:=$(addprefix js/,$(foreach js,$(JS_SRC),$(subst .js,.min.js,$(js))))
HTML=attributes.html battle.html battle2.html cards.html comparison.html \
	excards.html export.html faq.html index.html \
	lib.html quests.html skills.html \
	m_cards.html
CSS=css
IMAGE=attributes delim.jpg delim.png down.gif external-link.png \
	faq_direct_link.jpg question.jpg question.png rare_star.jpg \
	rare_star.png quest_star.png shapes up.gif \
	save_24x24.jpg save_all_24x24.jpg revert_24x24.jpg \
	revert_all_24x24.jpg comparison_24x24.jpg
RELEASE=release
ARGS=--compilation_level SIMPLE_OPTIMIZATIONS
OUTPUT_NAME=$(NAME)-$(shell date +%Y-%m-%d)
OUTPUT_DIR=$(RELEASE)/$(OUTPUT_NAME)

all: $(JS_BIN)

js/%.min.js: js/%.js
	closure-compiler $(ARGS) $< > $@

r: $(JS_BIN)
	mkdir -p $(OUTPUT_DIR)
	mkdir -p $(OUTPUT_DIR)/js
	mkdir -p $(OUTPUT_DIR)/images
	cp $(HTML) $(OUTPUT_DIR)
	cp $(JS_BIN) $(OUTPUT_DIR)/js
	cp -R $(CSS) $(OUTPUT_DIR)
	cp -R $(addprefix images/,$(IMAGE)) $(OUTPUT_DIR)/images
	sed -i bak 's/sitebase=localsite/sitebase=remotesite/' $(OUTPUT_DIR)/js/gc.min.js
	rm $(OUTPUT_DIR)/js/gc.min.jsbak
	cd $(RELEASE); zip -r -q $(OUTPUT_NAME).zip $(OUTPUT_NAME)

clean:
	rm $(JS_BIN)

.PHONY: all clean r
