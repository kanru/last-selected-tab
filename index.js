// Copyright (C) 2014  Kan-Ru Chen (陳侃如)

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

var tabs = require('sdk/tabs');
var simplePrefs = require('sdk/simple-prefs')
var { Hotkey } = require("sdk/hotkeys");
var lastTab;

tabs.on('deactivate', function (tab) {
  lastTab = tab;
});

tabs.on('close', function (tab) {
  if (tab === lastTab) {
    lastTab = null;
  }
});

var flipTabHotKey = null;
function redefineHotkey() {
  if (flipTabHotKey) {
    flipTabHotKey.destroy();
    flipTabHotKey = null;
  }
  try {
    flipTabHotKey = Hotkey({
      combo: simplePrefs.prefs['hotkey'],
      onPress: function() {
        if (lastTab) {
          lastTab.activate();
        }
      }
    });
  } catch (e) {}
}
redefineHotkey();
simplePrefs.on('hotkey', redefineHotkey);
