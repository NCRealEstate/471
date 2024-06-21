(function(){
    var script = {
 "mobileMipmappingEnabled": false,
 "paddingBottom": 0,
 "id": "rootPlayer",
 "overflow": "visible",
 "defaultVRPointer": "laser",
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Image_B44E6FBD_BAA2_0E15_41E1_F18F1E555CBE"
 ],
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.playList_00CDA792_3B5D_D4E6_41B1_B52023F56E0A.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }; this.playAudioList([this.audio_0806EC79_3BB2_B422_4189_E64AF4BDB03C])",
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Player",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scrollBarColor": "#000000",
 "scripts": {
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "existsKey": function(key){  return key in window; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "registerKey": function(key, value){  window[key] = value; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getKey": function(key){  return window[key]; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } }
 },
 "minHeight": 20,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "backgroundPreloadEnabled": true,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 20,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "height": "100%",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "downloadEnabled": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "definitions": [{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -6.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07F4387C_3B5D_DC22_419E_1052654ACF49",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 36.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_076B090A_3B5D_DDE6_41BC_1B8254D32531",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 55.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05048B57_3B5D_DC6E_415F_A6D0B41C9626",
 "class": "PanoramaCamera"
},
{
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer",
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer"
},
{
 "overlays": [
  "this.overlay_1074A83B_3BF2_FC27_41BD_215551029404",
  "this.overlay_17033974_3BF3_BC22_41CC_88483DB9F1CD",
  "this.overlay_15121E93_3BF3_B4E7_41A5_74448E652228",
  "this.overlay_16AFB8C8_3BED_7C61_41BA_1B824A904548",
  "this.overlay_14BE250C_3BED_55E2_41B9_8A2810E3A4FC",
  "this.overlay_164D7870_3BEF_5C21_41BB_F0BAB62BBED9",
  "this.overlay_0A048EF9_3BEF_5422_4194_601963A4F49E"
 ],
 "label": "IMG_20240619_105849_00_169_PureShot",
 "id": "panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 834.5,
   "angle": -44.66,
   "y": 657.45,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87"
  }
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "IMG_20240619_113816_00_214_PureShot",
 "id": "panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9",
 "partial": false,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfov": 360
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 126.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07E3C88C_3B5D_DCE2_41BC_4414FBEFB6DA",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 119.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_006287F0_3B5D_D421_41A9_24210358DF32",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "IMG_20240619_111353_00_198_PureShot",
 "id": "panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA",
 "partial": false,
 "overlays": [
  "this.overlay_197639A3_3BD3_BC26_419D_7FA5A72A2C55",
  "this.overlay_1869C29D_3BD3_4CE2_418F_D0EDAB0135C0",
  "this.overlay_13DC420E_3BED_4FE1_4184_0C7A854BB6FD",
  "this.overlay_109EEB41_3BED_BC62_41B2_F20FA809B124"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": -84.05,
   "yaw": -60.69,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "backwardYaw": -30.75,
   "yaw": -154.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 49.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07157929_3B5D_DC22_41C2_E870BE4798AF",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 41.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0765C91A_3B5D_DDE1_41C4_8917C0995501",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_201A6968_3B55_5C22_41A4_476E3933424E",
  "this.overlay_216C0089_3B55_4CE2_41CB_961185B09CA3",
  "this.overlay_21F27336_3B55_CC21_41C4_C168D38DEEC1",
  "this.overlay_15AF3221_3BDD_CC23_4195_7977E81ABB15"
 ],
 "label": "10",
 "id": "panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 1293.92,
   "angle": 45.31,
   "y": 156.55,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 88.89,
   "yaw": -123.3,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
   "distance": 1
  },
  {
   "backwardYaw": 21.63,
   "yaw": -154.67,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "backwardYaw": -16.84,
   "yaw": 142.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": 62.75,
   "yaw": -145.37,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "distance": 1
  }
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "4",
 "id": "panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
 "partial": false,
 "overlays": [
  "this.overlay_2BD16C62_3B56_D421_41C8_73FD4B326992",
  "this.overlay_2B806F24_3B53_5421_41B3_7C72A9AA9801",
  "this.overlay_2F6AE648_3B7D_D462_41C8_C44EA4CA1EC8",
  "this.overlay_28900DD2_3B77_F461_41C7_8BE9897BAFD0",
  "this.overlay_1A2C2621_3BAE_B423_4191_8CE4387AC419"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": 61.18,
   "yaw": 155.5,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "distance": 1
  },
  {
   "backwardYaw": 61.86,
   "yaw": 153.83,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "distance": 1
  },
  {
   "backwardYaw": 176.06,
   "yaw": -11.52,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "distance": 1
  },
  {
   "backwardYaw": -109.38,
   "yaw": -145.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": 156.29,
   "yaw": -23.61,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 41.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06A999D5_3B5D_DC62_41B8_E8296D8B36A8",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 25.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0636AA57_3B5D_DC6F_41C5_29396CCAF0E2",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_1E0D17BC_3BD2_D422_41BE_DCC77BB57906",
  "this.overlay_1211DE28_3BF2_B421_41B1_DD9B3A0595F7",
  "this.overlay_121739E5_3BF5_5C22_41C4_1661162EE36F",
  "this.overlay_1527BB5E_3BDF_7C61_41C0_8F59261DA84B",
  "this.overlay_14690D3E_3BD6_B421_41A7_2BE5F47174A3"
 ],
 "label": "IMG_20240619_113706_00_211_PureShot",
 "id": "panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 1063.03,
   "angle": 0,
   "y": 174.67,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -123.3,
   "yaw": 88.89,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5"
  },
  {
   "backwardYaw": -78,
   "yaw": 121.65,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "backwardYaw": -146.8,
   "yaw": -126.82,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -106.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_064899F4_3B5D_DC22_41A5_EB371E2CDB39",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -34.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0537BB6A_3B5D_DC21_41C1_D807FC4EA0D7",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 135.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05D0FA76_3B5D_DC21_41C3_E08BA3BFCCE4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 47.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06148A33_3B5D_DC27_41BE_540DE857A5C3",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_camera",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_10A2CA24_3BF5_BC22_41A3_B71200D6877A",
  "this.overlay_111CCC59_3BF6_F463_417A_EE52FA75D6CF",
  "this.overlay_110341C5_3BF7_4C63_41B8_8A9A0215DFFA",
  "this.overlay_1008CD7D_3BF6_F422_41C0_8C632587B095"
 ],
 "label": "IMG_20240619_105947_00_170_PureShot",
 "id": "panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 845.06,
   "angle": 71.52,
   "y": 575.81,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5"
  },
  {
   "backwardYaw": -146.73,
   "yaw": -56.88,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 7.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_066B6A14_3B5D_DFE1_41B0_38532DC42D6B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 149.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06E2599A_3B5D_DCE1_41BD_4B7A3470BC96",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -128.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_051A3B36_3B5D_DC2E_41CB_2FE7589CF41C",
 "class": "PanoramaCamera"
},
{
 "mouseControlMode": "drag_acceleration",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "touchControlMode": "drag_rotation",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_0806EC79_3BB2_B422_4189_E64AF4BDB03C.mp3",
  "oggUrl": "media/audio_0806EC79_3BB2_B422_4189_E64AF4BDB03C.ogg",
  "class": "AudioResource"
 },
 "id": "audio_0806EC79_3BB2_B422_4189_E64AF4BDB03C",
 "class": "MediaAudio",
 "data": {
  "label": "mornings-swoop-main-version-02-03-12897"
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 40.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0749D8EB_3B5D_DC27_41BF_26B513DC9E5A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 168.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_056AAB2A_3B5D_DC21_4182_0767B35689A1",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -118.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05BCFAD6_3B5D_DC6F_41CB_CD3DA2BF00B4",
 "class": "PanoramaCamera"
},
{
 "items": [
  "this.PanoramaPlayListItem_00C2B792_3B5D_D4E6_41A6_EB465C2F4E61",
  "this.PanoramaPlayListItem_00C38792_3B5D_D4E6_41A6_C1A578B2887B",
  "this.PanoramaPlayListItem_00C01792_3B5D_D4E6_418C_081F346F76F5",
  {
   "media": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA",
   "camera": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "camera": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "camera": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "camera": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "camera": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  "this.PanoramaPlayListItem_00C77792_3B5D_D4E6_41AD_659508BB48B6",
  {
   "media": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "camera": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "camera": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  "this.PanoramaPlayListItem_00C48792_3B5D_D4E6_41B7_E0C468B93F8B",
  {
   "media": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "camera": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  "this.PanoramaPlayListItem_00C58792_3B5D_D4E6_41C5_10A0C145D626",
  "this.PanoramaPlayListItem_00FA0792_3B5D_D4E6_41B9_01C20DFECBF0",
  "this.PanoramaPlayListItem_00FAA792_3B5D_D4E6_41C6_6E5BC4CFA690",
  {
   "media": "this.panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9",
   "camera": "this.panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  "this.PanoramaPlayListItem_00FBB792_3B5D_D4E6_41A0_7546190FD89D"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -158.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0027E83E_3B5D_DC21_41C6_31089BE03058",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "player": "this.MapViewerMapPlayer",
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_00C24792_3B5D_D4E6_417A_DAD04944939C",
 "class": "PlayList"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -162.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05E28AA8_3B5D_DC22_41A9_52717E8B3805",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_2D31B238_3B55_CC22_41BE_50F091DBB81D",
  "this.overlay_2EA98231_3B55_4C23_41B3_609CB102DB31",
  "this.overlay_2D7867C4_3B55_7461_41BF_75EBD16C4812",
  "this.overlay_2D5A0149_3B55_4C62_41C6_0A65124B6A38",
  "this.overlay_20B0A82C_3BAE_BC22_4199_57674A19C314",
  "this.overlay_11B856F2_3BF7_D426_41C2_D0EC5E6C5153"
 ],
 "label": "8",
 "id": "panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 1176.27,
   "angle": 37.46,
   "y": 231.29,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -132.11,
   "yaw": -154.24,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "distance": 1
  },
  {
   "backwardYaw": 121.65,
   "yaw": -78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
   "distance": 1
  },
  {
   "backwardYaw": -154.67,
   "yaw": 21.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
   "distance": 1
  },
  {
   "backwardYaw": -35.08,
   "yaw": -130.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "distance": 1
  },
  {
   "backwardYaw": -44.56,
   "yaw": 122.72,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": -89.04,
   "yaw": 17.5,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -141.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06BFD9C6_3B5D_DC61_41A1_19765FE2120D",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 90.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05C0FA83_3B5D_DCE7_41C1_CD61D6B64550",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 33.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05261B77_3B5D_DC2F_41BA_20EBE1484E90",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 4.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0019B7F0_3B5D_D421_41C9_A77F51F4FBDA",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -58.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06077A45_3B5D_DC63_41B5_05BCDECF1D2B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -131.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_050A4B49_3B5D_DC62_41BA_57816F65095F",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -57.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0792C89C_3B5D_DCE1_41AD_CA4B37A78414",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 129.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_005F07D1_3B5D_D463_41BD_193C38FEE501",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -24.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_009667A2_3B5D_D421_41CC_E85BB3A69B0C",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_1E31E0CA_3BDE_CC66_41CD_47252AD31F0F",
  "this.overlay_1EC6C22D_3BDF_4C23_4162_1EB1F34167E0",
  "this.overlay_1CA8CE21_3BDE_F422_41C7_04C44370132F",
  "this.overlay_1D0A0FC7_3BD7_D46E_41CB_BD274E72A8A0",
  "this.overlay_14A720C2_3BD3_4C66_41C2_505533144855"
 ],
 "label": "IMG_20240619_110734_00_193_PureShot",
 "id": "panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 790.23,
   "angle": 202.22,
   "y": 424.72,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -175.18,
   "yaw": 30.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5",
   "distance": 1
  },
  {
   "backwardYaw": -51.62,
   "yaw": -50.24,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "backwardYaw": -154.73,
   "yaw": -30.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA",
   "distance": 1
  },
  {
   "backwardYaw": -126.82,
   "yaw": -146.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 156.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05F34A96_3B5D_DCE1_41B0_A7E8BF9552A9",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "3",
 "id": "panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
 "partial": false,
 "overlays": [
  "this.overlay_2BE56E3F_3B57_741F_4191_CB7BC8403916",
  "this.overlay_2AAF63FE_3B6E_CC1E_41C2_F5E83657C7EB",
  "this.overlay_29C5FCD2_3B73_5466_41C8_8DF649AF1F97",
  "this.overlay_2887C7C1_3B7E_F462_41BD_E731B7446FA1",
  "this.overlay_1A3FBB3D_3BAF_7C22_41C5_AF9E44FA9A27"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": -11.52,
   "yaw": 176.06,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "distance": 1
  },
  {
   "backwardYaw": 51.53,
   "yaw": -172.83,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "distance": 1
  },
  {
   "backwardYaw": 48.57,
   "yaw": -17.81,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "backwardYaw": -124.84,
   "yaw": -139.17,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": 145.48,
   "yaw": -6.69,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 95.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06F3B987_3B5D_DCEF_41C3_36D13964E4CC",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "2",
 "id": "panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
 "partial": false,
 "overlays": [
  "this.overlay_2A0F7C91_3B55_D4E2_41C8_4201D65818EB",
  "this.overlay_291C6B33_3B6D_5C27_41AE_A16CE20F6784",
  "this.overlay_2ABEA054_3B6D_CC61_41A6_1FF72C323D84",
  "this.overlay_1A3E2125_3BAF_CC23_41C0_270A05BBCFFC",
  "this.overlay_1646AD3F_3BD5_B41E_41C2_BB0AA56BD6FA"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": -23.61,
   "yaw": 156.29,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "distance": 1
  },
  {
   "backwardYaw": -6.69,
   "yaw": 145.48,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "distance": 1
  },
  {
   "backwardYaw": 38.85,
   "yaw": -35.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "backwardYaw": -138.74,
   "yaw": -161.77,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_301146D3_3B55_5466_4186_E9E3E312A398_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -18.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_067B7A04_3B5D_DFE2_41CB_91B2B5A10061",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 123.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_007787F0_3B5D_D421_41C7_3F18C191E116",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 162.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_007E27E0_3B5D_D422_41BB_B1918584CD6B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 33.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06C07977_3B5D_DC2E_41CC_21C5AA61A4C7",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 128.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_001417FF_3B5D_D41E_41B3_AAF9E728B42D",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "7",
 "id": "panorama_301146D3_3B55_5466_4186_E9E3E312A398",
 "partial": false,
 "overlays": [
  "this.overlay_2890CC82_3B7E_D4E1_41CA_0C82FC857EFA",
  "this.overlay_2F8BCE7D_3B6E_B423_41CC_1546B74D4859",
  "this.overlay_2E7B2ADA_3B53_FC66_41C2_54FCC2EFBD5D",
  "this.overlay_2C0F7481_3B52_D4E2_41C9_5B5D8D5A95F9",
  "this.overlay_20B7D0C1_3BAD_4C62_41B3_15BCE4DA4611",
  "this.overlay_166A7EBB_3BDD_5427_4188_B85B0401507B"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": -143.91,
   "yaw": 173.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "distance": 1
  },
  {
   "backwardYaw": -138.01,
   "yaw": 161.17,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "distance": 1
  },
  {
   "backwardYaw": -130.04,
   "yaw": -35.08,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF"
  },
  {
   "backwardYaw": -106.72,
   "yaw": -23.69,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "distance": 1
  },
  {
   "backwardYaw": -60.66,
   "yaw": 68.06,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 27.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0043D7E0_3B5D_D422_41C6_8346B3C98D35",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -111.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_075988DB_3B5D_DC67_41C7_B8DB3913F6E3",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 36.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0087D7B1_3B5D_D422_41A0_F8337E9D4A1D",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 73.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07049939_3B5D_DC23_41C6_F96E5ED5EA89",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -117.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07CCA85D_3B5D_DC62_41C5_49DEAF1AECDF",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 144.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_004A67D1_3B5D_D463_41C5_A847905C34DE",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "9",
 "id": "panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
 "partial": false,
 "overlays": [
  "this.overlay_2FEB70D3_3B6F_4C67_41C8_812A2D0E01E3",
  "this.overlay_239CD4E8_3B53_7422_41BF_7D5F72521186",
  "this.overlay_22598546_3B53_B46E_41B3_C0B6B44EBEA0",
  "this.overlay_20CCB269_3BAE_CC23_41A8_4AEDB4EA7EE9",
  "this.overlay_166B13E0_3BD2_CC22_41BF_43BA19CCA804"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF"
  },
  {
   "backwardYaw": -23.69,
   "yaw": -106.72,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "distance": 1
  },
  {
   "backwardYaw": 17.5,
   "yaw": -89.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "backwardYaw": -30.17,
   "yaw": 173.56,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": -145.37,
   "yaw": 62.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -37.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07BF98BB_3B5D_DC27_41BD_1C5688F9CF16",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 149.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_059D5AB6_3B5D_DC2E_41AC_36B1428395FE",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_068FA9B6_3B5D_DC21_418B_4D343041D62E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -6.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_008937A2_3B5D_D421_41C0_9C9AC19B5CE8",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 18.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_077B88FA_3B5D_DC26_41B1_8DA8C0DB68F0",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 102,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06D0F96D_3B5D_DC22_41B9_3A65D7BFDCB4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "player": "this.MapViewerMapPlayer",
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_00CDA792_3B5D_D4E6_41B1_B52023F56E0A",
 "class": "PlayList"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -91.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0028F80F_3B5D_DBFE_41C5_73CB97134E0E",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_270653F5_3BBF_4C23_41BC_DB3DDB35EE52",
  "this.overlay_273D4AFD_3BBE_DC23_41C4_656184DF055C",
  "this.overlay_25796032_3BBD_CC26_41C2_30331677B1DD",
  "this.overlay_241613B0_3BBD_4C21_41B4_717AA4B988A8",
  "this.overlay_1BF94071_3BB2_CC23_41C8_9A2E82C54EC7",
  "this.overlay_27499DBD_3BB3_B422_41B4_3F610693C35C",
  "this.overlay_26849035_3BB3_4C23_4184_90CEAFCB5858",
  "this.overlay_26E182A6_3BB3_4C21_41C3_435877F39BBC",
  "this.overlay_25E79307_3BB2_CDEF_419C_117C0EDA6546",
  "this.overlay_1FF493FE_3BB5_4C1E_4190_98D7F96B263D",
  "this.overlay_158F287C_3BD7_5C22_41C3_2DB733550443"
 ],
 "label": "11",
 "id": "panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 1194.95,
   "angle": 10.6,
   "y": 448.04,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -26.5,
   "yaw": -78.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "distance": 1
  },
  {
   "backwardYaw": 173.56,
   "yaw": -30.17,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "distance": 1
  },
  {
   "backwardYaw": -53.49,
   "yaw": -95.6,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "distance": 1
  },
  {
   "backwardYaw": 122.72,
   "yaw": -44.56,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "backwardYaw": 96.61,
   "yaw": -152.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "distance": 1
  },
  {
   "backwardYaw": 142.64,
   "yaw": -16.84,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
   "distance": 1
  },
  {
   "backwardYaw": -145.64,
   "yaw": -109.38,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "distance": 1
  },
  {
   "backwardYaw": 68.06,
   "yaw": -60.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "distance": 1
  },
  {
   "backwardYaw": -139.17,
   "yaw": -124.84,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5"
  },
  {
   "backwardYaw": -161.77,
   "yaw": -138.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -26.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_065939E5_3B5D_DC23_41C0_9667E3F1339A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 101.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_00AB17C1_3B5D_D463_41C2_098095343EFD",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 34.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07AFE8CB_3B5D_DC66_41C3_8E1A8843FCEC",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 156.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_069DD9A6_3B5D_DC2E_41C3_C51EB8FBC736",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -149.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_00A0C7C1_3B5D_D463_41AA_B9922E9E5361",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "1",
 "id": "panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
 "partial": false,
 "overlays": [
  "this.overlay_2B6CA511_3B57_75E3_41A4_E2F79B708A02",
  "this.overlay_2BF4D548_3B53_5461_41B1_457B85123B9A",
  "this.overlay_1A21E51B_3BAE_D5E7_41B9_60B2DEDDBEC4",
  "this.overlay_1C8B5DBB_3BEE_D427_41AC_DF21B5CCD8BD",
  "this.overlay_1C27150A_3BEF_B5E6_41C2_FF7D260B244E",
  "this.overlay_12968FD0_3BEF_B461_41C4_9E3956C75972"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": -50.24,
   "yaw": -51.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
   "distance": 1
  },
  {
   "backwardYaw": -35.62,
   "yaw": 38.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "distance": 1
  },
  {
   "backwardYaw": -152.62,
   "yaw": 96.61,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  },
  {
   "backwardYaw": -17.81,
   "yaw": 48.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "distance": 1
  },
  {
   "backwardYaw": -56.88,
   "yaw": -146.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87",
   "distance": 1
  },
  {
   "backwardYaw": -60.69,
   "yaw": -84.05,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -83.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_078C38AB_3B5D_DC26_41B0_9C6AABF7336E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 25.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_00BC97B1_3B5D_D422_419F_CEE7C2AE2FF8",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 84.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_06655A23_3B5D_DC26_41C0_B5C8C5F94149",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -118.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05AF4AE9_3B5D_DC22_41B4_94FFB5FB6DC4",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "label": "6",
 "id": "panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
 "partial": false,
 "overlays": [
  "this.overlay_2947A476_3B6D_5421_41BC_DD574069983C",
  "this.overlay_28E54DD7_3B7F_546F_41CA_48F7F7D211B6",
  "this.overlay_2FD0069B_3B73_54E6_41BA_8DFD0F676D80",
  "this.overlay_2F18BD28_3B77_5421_419B_31C8F1B9908E",
  "this.overlay_20B2ECA6_3BAD_742E_41C1_3F0C22A33D0B"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "backwardYaw": 155.5,
   "yaw": 61.18,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "distance": 1
  },
  {
   "backwardYaw": 173.04,
   "yaw": -143.91,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "distance": 1
  },
  {
   "backwardYaw": -143.91,
   "yaw": 73.27,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "distance": 1
  },
  {
   "backwardYaw": -154.24,
   "yaw": -132.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "distance": 1
  },
  {
   "backwardYaw": -78.4,
   "yaw": -26.5,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 25.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0000A7FF_3B5D_D41E_41BA_B83DAA1E5A31",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28",
   "camera": "this.panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87",
   "camera": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
   "camera": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA",
   "camera": "this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC",
   "camera": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741",
   "camera": "this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "camera": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "camera": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
   "camera": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "camera": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "camera": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
   "camera": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8",
   "camera": "this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
   "camera": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "camera": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
   "camera": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9",
   "camera": "this.panorama_3012FE4E_3B56_D47E_4180_6CD83225A3A9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5",
   "camera": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_camera",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_11725616_3BFF_D7E1_41C1_542262F664FB",
  "this.overlay_11CC956D_3BFF_5422_41A4_A65A366F2A1B",
  "this.overlay_165B1BB6_3BFE_BC2E_41BD_7FB43CC92557"
 ],
 "label": "IMG_20240619_115224_00_220_PureShot-2",
 "id": "panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 993.58,
   "angle": 125.14,
   "y": 982.37,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC"
  },
  {
   "backwardYaw": 30.78,
   "yaw": -175.18,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -3.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_055EEAF7_3B5D_DC2E_41B6_07BAF61C5993",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_0A1E1AD1_3BB5_DC62_41BA_CE90226FA1BB",
  "this.overlay_0846059A_3BB3_54E1_41CB_C5B3E2EC212C",
  "this.overlay_08F5D89C_3BAF_BCE2_41C8_F6FCA36BD5C1",
  "this.overlay_0E0FE1CA_3BAE_CC66_41C2_17B415963A1F",
  "this.overlay_0FF72318_3BAD_4DE2_41BC_B2E58BD08FBC",
  "this.overlay_0ED8C64E_3BAD_547E_41C0_240E968B14C6",
  "this.overlay_0FD79F49_3B53_5462_41C6_6C3E4A29D0E7",
  "this.overlay_0FA8FDD7_3B53_746F_41C7_CDEF85267834",
  "this.overlay_0E1D467D_3B55_5423_41CA_76624BB50A7E"
 ],
 "fieldOfViewOverlayRadiusScale": 0.3,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "label": "Screenshot 2024-06-21 101739",
 "id": "map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
 "width": 1584,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58.png",
    "width": 1584,
    "class": "ImageResourceLevel",
    "height": 1162
   },
   {
    "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_lq.png",
    "width": 298,
    "class": "ImageResourceLevel",
    "height": 219,
    "tags": "preload"
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "thumbnailUrl": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_t.png",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 1162
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 144.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0626CA64_3B5D_DC21_41AE_AFD358AF701B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 34.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_058CFAC9_3B5D_DC63_41C9_F240949D665A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 56.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07263958_3B5D_DC61_41B7_032F0C103862",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 163.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07D0584E_3B5D_DC61_41CC_4630762AB1F4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 153.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_07FBB86D_3B5D_DC23_41A3_658C3B2FDB11",
 "class": "PanoramaCamera"
},
{
 "overlays": [
  "this.overlay_2BA24778_3B52_B422_41B3_1CE53A121F22",
  "this.overlay_296992C4_3B6D_CC61_41B3_4602E4A68A66",
  "this.overlay_28B5D630_3B75_5422_41C4_66393DFC78DE",
  "this.overlay_2F24E157_3B75_4C6E_41B8_1D27CA9E4074",
  "this.overlay_1A25B6C7_3BAD_F46E_41B2_CE0ADC264AB0"
 ],
 "label": "5",
 "id": "panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096,
      "rowCount": 8,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58",
   "x": 1010.56,
   "angle": 177.8,
   "y": 354.35,
   "class": "PanoramaMapLocation"
  }
 ],
 "thumbnailUrl": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 153.83,
   "yaw": 61.86,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1",
   "distance": 1
  },
  {
   "backwardYaw": 73.27,
   "yaw": -143.91,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC",
   "distance": 1
  },
  {
   "backwardYaw": 161.17,
   "yaw": -138.01,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301146D3_3B55_5466_4186_E9E3E312A398",
   "distance": 1
  },
  {
   "backwardYaw": -172.83,
   "yaw": 51.53,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F",
   "distance": 1
  },
  {
   "backwardYaw": -95.6,
   "yaw": -53.49,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
   "distance": 1
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 70.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_05488B09_3B5D_DDE2_41A3_74046F128D4E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_301E61C1_3B55_CC62_41C8_6761113D806F_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_003C680F_3B5D_DBFE_41C9_B3935BE4DEBF",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 119.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0736D948_3B5D_DC62_41B7_F3450DC187A4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -23.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0578EB17_3B5D_DDEE_4197_B9E4542036C5",
 "class": "PanoramaCamera"
},
{
 "toolTipShadowSpread": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "MainViewer",
 "left": 0,
 "width": "100%",
 "toolTipFontSize": 13,
 "progressBackgroundColorDirection": "vertical",
 "toolTipFontFamily": "Georgia",
 "toolTipOpacity": 0.5,
 "toolTipBorderRadius": 3,
 "progressRight": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBottom": 5,
 "toolTipPaddingLeft": 10,
 "toolTipFontStyle": "normal",
 "transitionDuration": 500,
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressOpacity": 1,
 "playbackBarLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionColor": "#FF6600",
 "height": "100%",
 "paddingTop": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 7,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadow": true,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "firstTransitionDuration": 0,
 "toolTipPaddingRight": 10,
 "playbackBarOpacity": 1,
 "progressBottom": 55,
 "paddingRight": 0,
 "progressHeight": 6,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "progressLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontWeight": "normal",
 "playbackBarProgressOpacity": 1,
 "propagateClick": true,
 "toolTipShadowBlurRadius": 3,
 "top": 0,
 "toolTipTextShadowColor": "#000000",
 "borderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowOpacity": 0,
 "minWidth": 100,
 "playbackBarHeight": 10,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderColor": "#0066FF",
 "progressBorderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowColor": "#333333",
 "borderSize": 0,
 "toolTipPaddingBottom": 7,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadOpacity": 1,
 "toolTipFontColor": "#FFFFFF",
 "progressBarBorderRadius": 0,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676"
},
{
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "width": 115.05,
 "right": "0%",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "gap": 10,
 "class": "Container",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "shadow": false,
 "height": 641,
 "top": "0%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "backgroundOpacity": 0.64,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "bottom": 0,
 "shadow": false,
 "height": 118,
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--MENU"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photo"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photoalbum"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--LOCATION"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM + text"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "right": "0%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--REALTOR"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 1258,
 "id": "Image_B44E6FBD_BAA2_0E15_41E1_F18F1E555CBE",
 "left": "0%",
 "maxHeight": 953,
 "width": "5.398%",
 "verticalAlign": "middle",
 "class": "Image",
 "url": "skin/Image_B44E6FBD_BAA2_0E15_41E1_F18F1E555CBE.png",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "7.606%",
 "minWidth": 1,
 "click": "this.openLink('http://NicholasC.JohnLScott.com', '_blank')",
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "visible": false,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "Image4523"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "toolTipShadowSpread": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "MapViewer",
 "width": "100%",
 "toolTipFontSize": 12,
 "progressBackgroundColorDirection": "vertical",
 "toolTipFontFamily": "Arial",
 "toolTipOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "progressRight": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingLeft": 6,
 "toolTipFontStyle": "normal",
 "transitionDuration": 500,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "progressOpacity": 1,
 "playbackBarLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionColor": "#FF6600",
 "height": "100%",
 "paddingTop": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadow": true,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "firstTransitionDuration": 0,
 "toolTipPaddingRight": 6,
 "playbackBarOpacity": 1,
 "progressBottom": 2,
 "paddingRight": 0,
 "progressHeight": 6,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "progressLeft": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontWeight": "normal",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "borderRadius": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowOpacity": 1,
 "minWidth": 1,
 "playbackBarHeight": 10,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderColor": "#0066FF",
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "progressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBorderRadius": 0,
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676"
},
{
 "id": "overlay_1074A83B_3BF2_FC27_41BD_215551029404",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_0_0.png",
      "width": 78,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   },
   "pitch": 0.26,
   "yaw": 102.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.36
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 102.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.26,
   "hfov": 2.36
  }
 ]
},
{
 "id": "overlay_17033974_3BF3_BC22_41CC_88483DB9F1CD",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_1_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": 1.76,
   "yaw": 51.93,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.95
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 51.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_1_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.76,
   "hfov": 2.95
  }
 ]
},
{
 "id": "overlay_15121E93_3BF3_B4E7_41A5_74448E652228",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_2_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -1.99,
   "yaw": 41.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.95
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 41.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_2_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.99,
   "hfov": 2.95
  }
 ]
},
{
 "id": "overlay_16AFB8C8_3BED_7C61_41BA_1B824A904548",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_3_0.png",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   },
   "pitch": 1.49,
   "yaw": 29.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.74
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 29.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 1.49,
   "hfov": 1.74
  }
 ]
},
{
 "id": "overlay_14BE250C_3BED_55E2_41B9_8A2810E3A4FC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_4_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 87
     }
    ]
   },
   "pitch": 5.87,
   "yaw": -175.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.13
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -175.18,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.87,
   "hfov": 3.13
  }
 ]
},
{
 "id": "overlay_164D7870_3BEF_5C21_41BB_F0BAB62BBED9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_5_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   },
   "pitch": 1.8,
   "yaw": 83.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.22
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 83.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 1.8,
   "hfov": 1.22
  }
 ]
},
{
 "id": "overlay_0A048EF9_3BEF_5422_4194_601963A4F49E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_6_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   },
   "pitch": 1.75,
   "yaw": 69.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.22
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 69.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 1.75,
   "hfov": 1.22
  }
 ]
},
{
 "id": "overlay_197639A3_3BD3_BC26_419D_7FA5A72A2C55",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_06F3B987_3B5D_DCEF_41C3_36D13964E4CC); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_0_0.png",
      "width": 229,
      "class": "ImageResourceLevel",
      "height": 218
     }
    ]
   },
   "pitch": 8.03,
   "yaw": -60.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.82
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -60.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 8.03,
   "hfov": 6.82
  }
 ]
},
{
 "id": "overlay_1869C29D_3BD3_4CE2_418F_D0EDAB0135C0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3011CCB2_3B53_7421_419B_A0E03B98BF70, this.camera_08E35CA3_3BFD_D427_41BF_5A6D22C509DB)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_1_0.png",
      "width": 229,
      "class": "ImageResourceLevel",
      "height": 225
     }
    ]
   },
   "pitch": 8.9,
   "yaw": 7.37,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.81
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "yaw": 7.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 8.9,
   "hfov": 6.81
  }
 ]
},
{
 "id": "overlay_13DC420E_3BED_4FE1_4184_0C7A854BB6FD",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6, this.camera_06E2599A_3B5D_DCE1_41BD_4B7A3470BC96); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_2_0.png",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": -11.55,
   "yaw": -154.73,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.67
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -154.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.55,
   "hfov": 3.67
  }
 ]
},
{
 "id": "overlay_109EEB41_3BED_BC62_41B2_F20FA809B124",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_3_0.png",
      "width": 111,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": 11.57,
   "yaw": -98.27,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.28
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -98.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 11.57,
   "hfov": 3.28
  }
 ]
},
{
 "id": "overlay_201A6968_3B55_5C22_41A4_476E3933424E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_0027E83E_3B5D_DC21_41C6_31089BE03058); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_0_0.png",
      "width": 114,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": -9.49,
   "yaw": -154.67,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.39
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -154.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_0_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.49,
   "hfov": 3.39
  }
 ]
},
{
 "id": "overlay_216C0089_3B55_4CE2_41CB_961185B09CA3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8, this.camera_07CCA85D_3B5D_DC62_41C5_49DEAF1AECDF); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_1_0.png",
      "width": 163,
      "class": "ImageResourceLevel",
      "height": 172
     }
    ]
   },
   "pitch": -16.07,
   "yaw": -145.37,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.74
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -145.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.07,
   "hfov": 4.74
  }
 ]
},
{
 "id": "overlay_21F27336_3B55_CC21_41C4_C168D38DEEC1",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_07D0584E_3B5D_DC61_41CC_4630762AB1F4); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_2_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -2.3,
   "yaw": 142.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.54
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 142.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": -2.3,
   "hfov": 2.54
  }
 ]
},
{
 "id": "overlay_15AF3221_3BDD_CC23_4195_7977E81ABB15",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF, this.camera_0028F80F_3B5D_DBFE_41C5_73CB97134E0E); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0_HS_3_0.png",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -6.51,
   "yaw": -123.3,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.21
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -123.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": -6.51,
   "hfov": 2.21
  }
 ]
},
{
 "id": "overlay_2BD16C62_3B56_D421_41C8_73FD4B326992",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741, this.camera_0578EB17_3B5D_DDEE_4197_B9E4542036C5); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_0_0.png",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 132
     }
    ]
   },
   "pitch": 1.84,
   "yaw": -23.61,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.34
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -23.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.84,
   "hfov": 4.34
  }
 ]
},
{
 "id": "overlay_2B806F24_3B53_5421_41B3_7C72A9AA9801",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F, this.camera_055EEAF7_3B5D_DC2E_41B6_07BAF61C5993); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_1_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -6.93,
   "yaw": -11.52,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.79
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -11.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.93,
   "hfov": 8.79
  }
 ]
},
{
 "id": "overlay_2F6AE648_3B7D_D462_41C8_C44EA4CA1EC8",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA, this.camera_05AF4AE9_3B5D_DC22_41B4_94FFB5FB6DC4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_2_0.png",
      "width": 208,
      "class": "ImageResourceLevel",
      "height": 192
     }
    ]
   },
   "pitch": -9.49,
   "yaw": 153.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.2
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 153.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.49,
   "hfov": 6.2
  }
 ]
},
{
 "id": "overlay_28900DD2_3B77_F461_41C7_8BE9897BAFD0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC, this.camera_05BCFAD6_3B5D_DC6F_41CB_CD3DA2BF00B4); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_3_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": -1.81,
   "yaw": 155.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.55
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 155.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.81,
   "hfov": 2.55
  }
 ]
},
{
 "id": "overlay_1A2C2621_3BAE_B423_4191_8CE4387AC419",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_05488B09_3B5D_DDE2_41A3_74046F128D4E); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0_HS_4_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": -4.62,
   "yaw": -145.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.16
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -145.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -4.62,
   "hfov": 2.16
  }
 ]
},
{
 "id": "overlay_1E0D17BC_3BD2_D422_41BE_DCC77BB57906",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6, this.camera_06C07977_3B5D_DC2E_41CC_21C5AA61A4C7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_0_0.png",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   },
   "pitch": -2.14,
   "yaw": -126.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.19
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -126.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_0_0_0_map.gif",
      "width": 23,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.14,
   "hfov": 1.19
  }
 ]
},
{
 "id": "overlay_1211DE28_3BF2_B421_41B1_DD9B3A0595F7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_1_0.png",
      "width": 23,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 0.53,
   "yaw": -131.98,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 0.69
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -131.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.53,
   "hfov": 0.69
  }
 ]
},
{
 "id": "overlay_121739E5_3BF5_5C22_41C4_1661162EE36F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_06D0F96D_3B5D_DC22_41B9_3A65D7BFDCB4); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_2_0.png",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 62
     }
    ]
   },
   "pitch": 5.23,
   "yaw": 121.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.87
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 121.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.23,
   "hfov": 1.87
  }
 ]
},
{
 "id": "overlay_1527BB5E_3BDF_7C61_41C0_8F59261DA84B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_3_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   },
   "pitch": -0.93,
   "yaw": -135.88,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 0.9
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -135.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_3_0_0_map.gif",
      "width": 23,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.93,
   "hfov": 0.9
  }
 ]
},
{
 "id": "overlay_14690D3E_3BD6_B421_41A7_2BE5F47174A3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A, this.camera_07263958_3B5D_DC61_41B7_032F0C103862); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_4_0.png",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 30
     }
    ]
   },
   "pitch": 3.9,
   "yaw": 88.89,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.18
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 88.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_0_HS_4_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.9,
   "hfov": 1.18
  }
 ]
},
{
 "id": "overlay_10A2CA24_3BF5_BC22_41A3_B71200D6877A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_0_0.png",
      "width": 82,
      "class": "ImageResourceLevel",
      "height": 108
     }
    ]
   },
   "pitch": -8.05,
   "yaw": -101.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.47
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -101.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "pitch": -8.05,
   "hfov": 2.47
  }
 ]
},
{
 "id": "overlay_111CCC59_3BF6_F463_417A_EE52FA75D6CF",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_05261B77_3B5D_DC2F_41BA_20EBE1484E90); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_1_0.png",
      "width": 156,
      "class": "ImageResourceLevel",
      "height": 179
     }
    ]
   },
   "pitch": -3.48,
   "yaw": -56.88,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.71
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -56.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -3.48,
   "hfov": 4.71
  }
 ]
},
{
 "id": "overlay_110341C5_3BF7_4C63_41B8_8A9A0215DFFA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_2_0.png",
      "width": 156,
      "class": "ImageResourceLevel",
      "height": 179
     }
    ]
   },
   "pitch": 1.54,
   "yaw": 13.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.72
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 13.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 1.54,
   "hfov": 4.72
  }
 ]
},
{
 "id": "overlay_1008CD7D_3BF6_F422_41C0_8C632587B095",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_3_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": 3.51,
   "yaw": 95.79,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.14
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 95.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": 3.51,
   "hfov": 3.14
  }
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton HS "
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "push",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 49,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "right": 30,
 "maxHeight": 37,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "bottom": 8,
 "mode": "push",
 "shadow": false,
 "height": 75,
 "transparencyActive": true,
 "minWidth": 1,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "media": "this.panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28",
 "camera": "this.panorama_30B6E12F_3B53_4C3E_41C8_348F1B7C1B28_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C2B792_3B5D_D4E6_41A6_EB465C2F4E61, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C2B792_3B5D_D4E6_41A6_EB465C2F4E61",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87",
 "camera": "this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C38792_3B5D_D4E6_41A6_C1A578B2887B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C38792_3B5D_D4E6_41A6_C1A578B2887B",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6",
 "camera": "this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C01792_3B5D_D4E6_418C_081F346F76F5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C01792_3B5D_D4E6_418C_081F346F76F5",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA",
 "camera": "this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C77792_3B5D_D4E6_41AD_659508BB48B6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C77792_3B5D_D4E6_41AD_659508BB48B6",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B",
 "camera": "this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C48792_3B5D_D4E6_41B7_E0C468B93F8B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C48792_3B5D_D4E6_41B7_E0C468B93F8B",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A",
 "camera": "this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00C58792_3B5D_D4E6_41C5_10A0C145D626, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00C58792_3B5D_D4E6_41C5_10A0C145D626",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070",
 "camera": "this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00FA0792_3B5D_D4E6_41B9_01C20DFECBF0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00FA0792_3B5D_D4E6_41B9_01C20DFECBF0",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF",
 "camera": "this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00FAA792_3B5D_D4E6_41C6_6E5BC4CFA690, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00FAA792_3B5D_D4E6_41C6_6E5BC4CFA690",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5",
 "end": "this.trigger('tourEnded')",
 "camera": "this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_00FBB792_3B5D_D4E6_41A0_7546190FD89D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 17, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_00FBB792_3B5D_D4E6_41A0_7546190FD89D",
 "class": "PanoramaPlayListItem"
},
{
 "id": "overlay_2D31B238_3B55_CC22_41BE_50F091DBB81D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC, this.camera_06148A33_3B5D_DC27_41BE_540DE857A5C3); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_0_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -8.2,
   "yaw": -154.24,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.76
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -154.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -8.2,
   "hfov": 8.76
  }
 ]
},
{
 "id": "overlay_2EA98231_3B55_4C23_41B3_609CB102DB31",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301146D3_3B55_5466_4186_E9E3E312A398, this.camera_0626CA64_3B5D_DC21_41AE_AFD358AF701B); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_1_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -31.51,
   "yaw": -130.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.55
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -130.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.51,
   "hfov": 7.55
  }
 ]
},
{
 "id": "overlay_2D7867C4_3B55_7461_41BF_75EBD16C4812",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8, this.camera_05C0FA83_3B5D_DCE7_41C1_CD61D6B64550); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_2_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -19.41,
   "yaw": 17.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.35
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 17.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.41,
   "hfov": 8.35
  }
 ]
},
{
 "id": "overlay_2D5A0149_3B55_4C62_41C6_0A65124B6A38",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A, this.camera_0636AA57_3B5D_DC6F_41C5_29396CCAF0E2); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_3_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -4.36,
   "yaw": 21.63,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.83
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 21.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.36,
   "hfov": 8.83
  }
 ]
},
{
 "id": "overlay_20B0A82C_3BAE_BC22_4199_57674A19C314",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_05D0FA76_3B5D_DC21_41C3_E08BA3BFCCE4); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0_HS_4_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -1.31,
   "yaw": 122.72,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.54
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 122.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": -1.31,
   "hfov": 2.54
  }
 ]
},
{
 "id": "overlay_11B856F2_3BF7_D426_41C2_D0EC5E6C5153",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF, this.camera_06077A45_3B5D_DC63_41B5_05BCDECF1D2B); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0_HS_5_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -11.28,
   "yaw": -78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.92
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B_0_HS_5_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.28,
   "hfov": 2.92
  }
 ]
},
{
 "id": "overlay_1E31E0CA_3BDE_CC66_41CD_47252AD31F0F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA, this.camera_0000A7FF_3B5D_D41E_41BA_B83DAA1E5A31); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_0_0.png",
      "width": 99,
      "class": "ImageResourceLevel",
      "height": 113
     }
    ]
   },
   "pitch": 2.58,
   "yaw": -30.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.98
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -30.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 2.58,
   "hfov": 2.98
  }
 ]
},
{
 "id": "overlay_1EC6C22D_3BDF_4C23_4162_1EB1F34167E0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_001417FF_3B5D_D41E_41B3_AAF9E728B42D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_1_0.png",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   },
   "pitch": 5.52,
   "yaw": -50.24,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.87
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -50.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.52,
   "hfov": 1.87
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "id": "overlay_1CA8CE21_3BDE_F422_41C7_04C44370132F",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_2_0.png",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 63
     }
    ]
   },
   "pitch": 7.37,
   "yaw": -20.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.95
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "yaw": -20.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 7.37,
   "hfov": 1.95
  }
 ]
},
{
 "id": "overlay_1D0A0FC7_3BD7_D46E_41CB_BD274E72A8A0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5, this.camera_0019B7F0_3B5D_D421_41C9_A77F51F4FBDA); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_3_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 87
     }
    ]
   },
   "pitch": 4.29,
   "yaw": 30.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.94
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 30.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_3_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.29,
   "hfov": 2.94
  }
 ]
},
{
 "id": "overlay_14A720C2_3BD3_4C66_41C2_505533144855",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015D7BE_3B56_D41E_419A_23B053F6CABF, this.camera_003C680F_3B5D_DBFE_41C9_B3935BE4DEBF); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_4_0.png",
      "width": 108,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -3.36,
   "yaw": -146.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.26
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -146.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3015045C_3B52_F461_41BF_CDA9F32480B6_0_HS_4_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.36,
   "hfov": 3.26
  }
 ]
},
{
 "id": "overlay_2BE56E3F_3B57_741F_4191_CB7BC8403916",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741, this.camera_0537BB6A_3B5D_DC21_41C1_D807FC4EA0D7); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_0_0.png",
      "width": 189,
      "class": "ImageResourceLevel",
      "height": 185
     }
    ]
   },
   "pitch": -1.61,
   "yaw": -6.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.71
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -6.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.61,
   "hfov": 5.71
  }
 ]
},
{
 "id": "overlay_2AAF63FE_3B6E_CC1E_41C2_F5E83657C7EB",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1, this.camera_056AAB2A_3B5D_DC21_4182_0767B35689A1); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_1_0.png",
      "width": 222,
      "class": "ImageResourceLevel",
      "height": 224
     }
    ]
   },
   "pitch": -5.34,
   "yaw": 176.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.67
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 176.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.34,
   "hfov": 6.67
  }
 ]
},
{
 "id": "overlay_29C5FCD2_3B73_5466_41C8_8DF649AF1F97",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_050A4B49_3B5D_DC62_41BA_57816F65095F); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_2_0.png",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 146
     }
    ]
   },
   "pitch": 3.4,
   "yaw": -17.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.33
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -17.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.4,
   "hfov": 4.33
  }
 ]
},
{
 "id": "overlay_2887C7C1_3B7E_F462_41BD_E731B7446FA1",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA, this.camera_051A3B36_3B5D_DC2E_41CB_2FE7589CF41C); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_3_0.png",
      "width": 91,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   },
   "pitch": -2.31,
   "yaw": -172.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.74
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -172.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_1_HS_3_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.31,
   "hfov": 2.74
  }
 ]
},
{
 "id": "overlay_1A3FBB3D_3BAF_7C22_41C5_AF9E44FA9A27",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_05048B57_3B5D_DC6E_415F_A6D0B41C9626); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0_HS_4_0.png",
      "width": 74,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": -3.96,
   "yaw": -139.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.23
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -139.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301E61C1_3B55_CC62_41C8_6761113D806F_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -3.96,
   "hfov": 2.23
  }
 ]
},
{
 "id": "overlay_2A0F7C91_3B55_D4E2_41C8_4201D65818EB",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F, this.camera_068FA9B6_3B5D_DC21_418B_4D343041D62E); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_0_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -7.52,
   "yaw": 145.48,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.78
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 145.48,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.52,
   "hfov": 8.78
  }
 ]
},
{
 "id": "overlay_291C6B33_3B6D_5C27_41AE_A16CE20F6784",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_06BFD9C6_3B5D_DC61_41A1_19765FE2120D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_1_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -4.46,
   "yaw": -35.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.83
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -35.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.46,
   "hfov": 8.83
  }
 ]
},
{
 "id": "overlay_2ABEA054_3B6D_CC61_41A6_1FF72C323D84",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1, this.camera_069DD9A6_3B5D_DC2E_41C3_C51EB8FBC736); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_2_0.png",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 139
     }
    ]
   },
   "pitch": -3.77,
   "yaw": 156.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.33
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 156.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.77,
   "hfov": 4.33
  }
 ]
},
{
 "id": "overlay_1A3E2125_3BAF_CC23_41C0_270A05BBCFFC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_06A999D5_3B5D_DC62_41B8_E8296D8B36A8); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0_HS_3_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -3.18,
   "yaw": -161.77,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.52
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -161.77,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.18,
   "hfov": 4.52
  }
 ]
},
{
 "id": "overlay_1646AD3F_3BD5_B41E_41C2_BB0AA56BD6FA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0_HS_4_0.png",
      "width": 82,
      "class": "ImageResourceLevel",
      "height": 64
     }
    ]
   },
   "pitch": -2.56,
   "yaw": -49.02,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.47
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -49.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301FC483_3B55_D4E6_41A6_52AF09D70741_0_HS_4_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.56,
   "hfov": 2.47
  }
 ]
},
{
 "id": "overlay_2890CC82_3B7E_D4E1_41CA_0C82FC857EFA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA, this.camera_0765C91A_3B5D_DDE1_41C4_8917C0995501); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_0_0.png",
      "width": 110,
      "class": "ImageResourceLevel",
      "height": 94
     }
    ]
   },
   "pitch": -2.7,
   "yaw": 161.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.33
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 161.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.7,
   "hfov": 3.33
  }
 ]
},
{
 "id": "overlay_2F8BCE7D_3B6E_B423_41CC_1546B74D4859",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_07157929_3B5D_DC22_41C2_E870BE4798AF); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_1_0.png",
      "width": 236,
      "class": "ImageResourceLevel",
      "height": 245
     }
    ]
   },
   "pitch": -15.93,
   "yaw": -35.08,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.84
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -35.08,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.93,
   "hfov": 6.84
  }
 ]
},
{
 "id": "overlay_2E7B2ADA_3B53_FC66_41C2_54FCC2EFBD5D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8, this.camera_07049939_3B5D_DC23_41C6_F96E5ED5EA89); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_2_0.png",
      "width": 145,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": -3.72,
   "yaw": -23.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.36
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -23.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.72,
   "hfov": 4.36
  }
 ]
},
{
 "id": "overlay_2C0F7481_3B52_D4E2_41C9_5B5D8D5A95F9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC, this.camera_076B090A_3B5D_DDE6_41BC_1B8254D32531); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_3_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 173
     }
    ]
   },
   "pitch": -17.2,
   "yaw": 173.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.92
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 173.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -17.2,
   "hfov": 4.92
  }
 ]
},
{
 "id": "overlay_20B7D0C1_3BAD_4C62_41B3_15BCE4DA4611",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_0736D948_3B5D_DC62_41B7_F3450DC187A4); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0_HS_4_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": 0.29,
   "yaw": 68.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.55
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 68.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": 0.29,
   "hfov": 2.55
  }
 ]
},
{
 "id": "overlay_166A7EBB_3BDD_5427_4188_B85B0401507B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0_HS_5_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -6.38,
   "yaw": -60.87,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.96
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -60.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301146D3_3B55_5466_4186_E9E3E312A398_0_HS_5_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.38,
   "hfov": 2.96
  }
 ]
},
{
 "id": "overlay_2FEB70D3_3B6F_4C67_41C8_812A2D0E01E3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_05E28AA8_3B5D_DC22_41A9_52717E8B3805); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_0_0.png",
      "width": 267,
      "class": "ImageResourceLevel",
      "height": 270
     }
    ]
   },
   "pitch": -30.61,
   "yaw": -89.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.93
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -89.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.61,
   "hfov": 6.93
  }
 ]
},
{
 "id": "overlay_239CD4E8_3B53_7422_41BF_7D5F72521186",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301146D3_3B55_5466_4186_E9E3E312A398, this.camera_05F34A96_3B5D_DCE1_41B0_A7E8BF9552A9); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_1_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 152
     }
    ]
   },
   "pitch": -11.84,
   "yaw": -106.72,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.43
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -106.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.84,
   "hfov": 4.43
  }
 ]
},
{
 "id": "overlay_22598546_3B53_B46E_41B3_C0B6B44EBEA0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A, this.camera_058CFAC9_3B5D_DC63_41C9_F240949D665A); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_2_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -1.62,
   "yaw": 62.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.85
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 62.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.62,
   "hfov": 8.85
  }
 ]
},
{
 "id": "overlay_20CCB269_3BAE_CC23_41A8_4AEDB4EA7EE9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_059D5AB6_3B5D_DC2E_41AC_36B1428395FE); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_3_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -5.39,
   "yaw": 173.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.53
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 173.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": -5.39,
   "hfov": 2.53
  }
 ]
},
{
 "id": "overlay_166B13E0_3BD2_CC22_41BF_43BA19CCA804",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0_HS_4_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -9.26,
   "yaw": -53.15,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.94
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -53.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8_0_HS_4_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.26,
   "hfov": 2.94
  }
 ]
},
{
 "id": "overlay_270653F5_3BBF_4C23_41BC_DB3DDB35EE52",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC, this.camera_078C38AB_3B5D_DC26_41B0_9C6AABF7336E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_0_0.png",
      "width": 172,
      "class": "ImageResourceLevel",
      "height": 168
     }
    ]
   },
   "pitch": -2.28,
   "yaw": -152.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.19
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -152.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.28,
   "hfov": 5.19
  }
 ]
},
{
 "id": "overlay_273D4AFD_3BBE_DC23_41C4_656184DF055C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741, this.camera_077B88FA_3B5D_DC26_41B1_8DA8C0DB68F0); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_1_0.png",
      "width": 210,
      "class": "ImageResourceLevel",
      "height": 213
     }
    ]
   },
   "pitch": -1.92,
   "yaw": -138.74,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.33
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -138.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.92,
   "hfov": 6.33
  }
 ]
},
{
 "id": "overlay_25796032_3BBD_CC26_41C2_30331677B1DD",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1, this.camera_07AFE8CB_3B5D_DC66_41C3_8E1A8843FCEC); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_2_0.png",
      "width": 204,
      "class": "ImageResourceLevel",
      "height": 187
     }
    ]
   },
   "pitch": -1.54,
   "yaw": -109.38,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.14
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -109.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": -1.54,
   "hfov": 6.14
  }
 ]
},
{
 "id": "overlay_241613B0_3BBD_4C21_41B4_717AA4B988A8",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F, this.camera_0749D8EB_3B5D_DC27_41BF_26B513DC9E5A); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_3_0.png",
      "width": 236,
      "class": "ImageResourceLevel",
      "height": 213
     }
    ]
   },
   "pitch": -1.63,
   "yaw": -124.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.11
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -124.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.63,
   "hfov": 7.11
  }
 ]
},
{
 "id": "overlay_1BF94071_3BB2_CC23_41C8_9A2E82C54EC7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA, this.camera_07E3C88C_3B5D_DCE2_41BC_4414FBEFB6DA); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_4_0.png",
      "width": 198,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "pitch": -1.34,
   "yaw": -95.6,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.96
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -95.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.34,
   "hfov": 5.96
  }
 ]
},
{
 "id": "overlay_27499DBD_3BB3_B422_41B4_3F610693C35C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC, this.camera_07FBB86D_3B5D_DC23_41A3_658C3B2FDB11); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_5_0.png",
      "width": 191,
      "class": "ImageResourceLevel",
      "height": 219
     }
    ]
   },
   "pitch": -0.88,
   "yaw": -78.4,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.75
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -78.4,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -0.88,
   "hfov": 5.75
  }
 ]
},
{
 "id": "overlay_26849035_3BB3_4C23_4184_90CEAFCB5858",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301146D3_3B55_5466_4186_E9E3E312A398, this.camera_075988DB_3B5D_DC67_41C7_B8DB3913F6E3); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_6_0.png",
      "width": 208,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": -0.53,
   "yaw": -60.66,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.29
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -60.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_6_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.53,
   "hfov": 6.29
  }
 ]
},
{
 "id": "overlay_26E182A6_3BB3_4C21_41C3_435877F39BBC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_0792C89C_3B5D_DCE1_41AD_CA4B37A78414); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_7_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 197
     }
    ]
   },
   "pitch": 0.19,
   "yaw": -44.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.53
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -44.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 0.19,
   "hfov": 5.53
  }
 ]
},
{
 "id": "overlay_25E79307_3BB2_CDEF_419C_117C0EDA6546",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_206F9A9C_3B5D_7CE1_4186_958B5C102E8A, this.camera_07BF98BB_3B5D_DC27_41BD_1C5688F9CF16); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_8_0.png",
      "width": 227,
      "class": "ImageResourceLevel",
      "height": 248
     }
    ]
   },
   "pitch": 1.64,
   "yaw": -16.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.84
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -16.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 1.64,
   "hfov": 6.84
  }
 ]
},
{
 "id": "overlay_1FF493FE_3BB5_4C1E_4190_98D7F96B263D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3019D0D8_3B55_4C61_4199_5E5401CF40E8, this.camera_07F4387C_3B5D_DC22_419E_1052654ACF49); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_9_0.png",
      "width": 227,
      "class": "ImageResourceLevel",
      "height": 248
     }
    ]
   },
   "pitch": 0.48,
   "yaw": -30.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.84
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -30.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 0.48,
   "hfov": 6.84
  }
 ]
},
{
 "id": "overlay_158F287C_3BD7_5C22_41C3_2DB733550443",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_10_0.png",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   },
   "pitch": -0.29,
   "yaw": -175.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.19
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -175.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070_0_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": -0.29,
   "hfov": 1.19
  }
 ]
},
{
 "id": "overlay_2B6CA511_3B57_75E3_41A4_E2F79B708A02",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301FC483_3B55_D4E6_41A6_52AF09D70741, this.camera_004A67D1_3B5D_D463_41C5_A847905C34DE); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_1_HS_0_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": -4.17,
   "yaw": 38.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.83
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 38.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.17,
   "hfov": 8.83
  }
 ]
},
{
 "id": "overlay_2BF4D548_3B53_5461_41B1_457B85123B9A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F, this.camera_007E27E0_3B5D_D422_41BB_B1918584CD6B); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_1_HS_1_0.png",
      "width": 110,
      "class": "ImageResourceLevel",
      "height": 126
     }
    ]
   },
   "pitch": 2.42,
   "yaw": 48.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.33
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 48.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 2.42,
   "hfov": 3.33
  }
 ]
},
{
 "id": "overlay_1A21E51B_3BAE_D5E7_41B9_60B2DEDDBEC4",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_0043D7E0_3B5D_D422_41C6_8346B3C98D35); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_2_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -0.5,
   "yaw": 96.61,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.52
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 96.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.5,
   "hfov": 4.52
  }
 ]
},
{
 "id": "overlay_1C8B5DBB_3BEE_D427_41AC_DF21B5CCD8BD",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3048500A_3B53_4BE6_41AD_9FDE80345F87, this.camera_007787F0_3B5D_D421_41C7_3F18C191E116); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_3_0.png",
      "width": 105,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -6.61,
   "yaw": -146.73,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.15
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -146.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.61,
   "hfov": 3.15
  }
 ]
},
{
 "id": "overlay_1C27150A_3BEF_B5E6_41C2_FF7D260B244E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6, this.camera_005F07D1_3B5D_D463_41BD_193C38FEE501); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_4_0.png",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -7.3,
   "yaw": -51.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.26
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -51.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.3,
   "hfov": 2.26
  }
 ]
},
{
 "id": "overlay_12968FD0_3BEF_B461_41C4_9E3956C75972",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000EC38_3B55_7421_41BF_1E97B5E5DBEA, this.camera_006287F0_3B5D_D421_41A9_24210358DF32); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_5_0.png",
      "width": 75,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": -11.18,
   "yaw": -84.05,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.23
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -84.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3000B76F_3B55_B43E_41A8_D4E70E0FBBCC_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.18,
   "hfov": 2.23
  }
 ]
},
{
 "id": "overlay_2947A476_3B6D_5421_41BC_DD574069983C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1, this.camera_009667A2_3B5D_D421_41CC_E85BB3A69B0C); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_0_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": 3.31,
   "yaw": 61.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.55
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 61.18,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.31,
   "hfov": 3.55
  }
 ]
},
{
 "id": "overlay_28E54DD7_3B7F_546F_41CA_48F7F7D211B6",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA, this.camera_0087D7B1_3B5D_D422_41A0_F8337E9D4A1D); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_1_0.png",
      "width": 208,
      "class": "ImageResourceLevel",
      "height": 192
     }
    ]
   },
   "pitch": -8.31,
   "yaw": 73.27,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.22
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 73.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -8.31,
   "hfov": 6.22
  }
 ]
},
{
 "id": "overlay_2FD0069B_3B73_54E6_41BA_8DFD0F676D80",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301146D3_3B55_5466_4186_E9E3E312A398, this.camera_008937A2_3B5D_D421_41C0_9C9AC19B5CE8); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_2_0.png",
      "width": 267,
      "class": "ImageResourceLevel",
      "height": 270
     }
    ]
   },
   "pitch": -17.93,
   "yaw": -143.91,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.66
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -143.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -17.93,
   "hfov": 7.66
  }
 ]
},
{
 "id": "overlay_2F18BD28_3B77_5421_419B_31C8F1B9908E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301DB3C7_3B55_4C6F_41C5_87B4E366458B, this.camera_00BC97B1_3B5D_D422_419F_CEE7C2AE2FF8); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_3_0.png",
      "width": 267,
      "class": "ImageResourceLevel",
      "height": 270
     }
    ]
   },
   "pitch": -6.13,
   "yaw": -132.11,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.01
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -132.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.13,
   "hfov": 8.01
  }
 ]
},
{
 "id": "overlay_20B2ECA6_3BAD_742E_41C1_3F0C22A33D0B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_00AB17C1_3B5D_D463_41C2_098095343EFD); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_4_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -0.51,
   "yaw": -26.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.55
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -26.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   },
   "pitch": -0.51,
   "hfov": 2.55
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "id": "overlay_11725616_3BFF_D7E1_41C1_542262F664FB",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_0_0.png",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": 6.02,
   "yaw": -167.55,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.21
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "yaw": -167.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_0_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 6.02,
   "hfov": 2.21
  }
 ]
},
{
 "id": "overlay_11CC956D_3BFF_5422_41A4_A65A366F2A1B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_1_0.png",
      "width": 49,
      "class": "ImageResourceLevel",
      "height": 42
     }
    ]
   },
   "pitch": 6.44,
   "yaw": -163.03,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.49
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -163.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_1_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 6.44,
   "hfov": 1.49
  }
 ]
},
{
 "id": "overlay_165B1BB6_3BFE_BC2E_41BD_7FB43CC92557",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3015045C_3B52_F461_41BF_CDA9F32480B6, this.camera_00A0C7C1_3B5D_D463_41AA_B9922E9E5361); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_2_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 38
     }
    ]
   },
   "pitch": 10.87,
   "yaw": -175.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 0.88
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -175.18,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_354E4522_3B5E_D421_41B3_07601DE4DFD5_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   },
   "pitch": 10.87,
   "hfov": 0.88
  }
 ]
},
{
 "map": {
  "width": 32.86,
  "x": 1277.73,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 140.34,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 32.86,
  "offsetX": 0
 },
 "id": "overlay_0A1E1AD1_3BB5_DC62_41BA_CE90226FA1BB",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 1277.49,
  "y": 140.12,
  "width": 32.86,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_0.png",
     "width": 32,
     "class": "ImageResourceLevel",
     "height": 32
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 32.86
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 32.86,
  "x": 1178.78,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 431.71,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 32.86,
  "offsetX": 0
 },
 "id": "overlay_0846059A_3BB3_54E1_41CB_C5B3E2EC212C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 1178.52,
  "y": 431.61,
  "width": 32.86,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_1.png",
     "width": 32,
     "class": "ImageResourceLevel",
     "height": 32
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 32.86
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 31.12,
  "x": 819.02,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 641.57,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 31.99,
  "offsetX": 0
 },
 "id": "overlay_08F5D89C_3BAF_BCE2_41C8_F6FCA36BD5C1",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 818.94,
  "y": 641.45,
  "width": 31.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_2.png",
     "width": 31,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 31.99
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 31.12,
  "x": 829.65,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 560.01,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 31.99,
  "offsetX": 0
 },
 "id": "overlay_0E0FE1CA_3BAE_CC66_41C2_17B415963A1F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 829.5,
  "y": 559.82,
  "width": 31.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_3.png",
     "width": 31,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 31.99
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 31.12,
  "x": 978.07,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 966.51,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 31.99,
  "offsetX": 0
 },
 "id": "overlay_0FF72318_3BAD_4DE2_41BC_B2E58BD08FBC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 978.02,
  "y": 966.38,
  "width": 31.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_4.png",
     "width": 31,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 31.99
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 31.12,
  "x": 1047.61,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_5_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 158.86,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 31.99,
  "offsetX": 0
 },
 "id": "overlay_0ED8C64E_3BAD_547E_41C0_240E968B14C6",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 1047.47,
  "y": 158.67,
  "width": 31.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_5.png",
     "width": 31,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 31.99
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 31.12,
  "x": 774.82,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 408.91,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 31.99,
  "offsetX": 0
 },
 "id": "overlay_0FD79F49_3B53_5462_41C6_6C3E4A29D0E7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 774.67,
  "y": 408.73,
  "width": 31.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_6.png",
     "width": 31,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 31.99
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 32.86,
  "x": 1159.99,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_7_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 215.02,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 32.86,
  "offsetX": 0
 },
 "id": "overlay_0FA8FDD7_3B53_746F_41C7_CDEF85267834",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 1159.84,
  "y": 214.86,
  "width": 32.86,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_7.png",
     "width": 32,
     "class": "ImageResourceLevel",
     "height": 32
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 32.86
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 32.86,
  "x": 994.19,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_8_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 338.04,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 32.86,
  "offsetX": 0
 },
 "id": "overlay_0E1D467D_3B55_5423_41CA_76624BB50A7E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 994.13,
  "y": 337.92,
  "width": 32.86,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_081C7A04_3BB5_5FE2_41C1_6971C2BC3D58_HS_8.png",
     "width": 32,
     "class": "ImageResourceLevel",
     "height": 32
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 32.86
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 }
},
{
 "id": "overlay_2BA24778_3B52_B422_41B3_1CE53A121F22",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301E61C1_3B55_CC62_41C8_6761113D806F, this.camera_066B6A14_3B5D_DFE1_41B0_38532DC42D6B); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_0_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 132
     }
    ]
   },
   "pitch": 2.62,
   "yaw": 51.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.52
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 51.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.62,
   "hfov": 4.52
  }
 ]
},
{
 "id": "overlay_296992C4_3B6D_CC61_41B3_4602E4A68A66",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_3000CF08_3B55_F5E1_4198_42A165CDDCE1, this.camera_065939E5_3B5D_DC23_41C0_9667E3F1339A); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_1_0.png",
      "width": 222,
      "class": "ImageResourceLevel",
      "height": 224
     }
    ]
   },
   "pitch": -7.11,
   "yaw": 61.86,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.65
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": 61.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.11,
   "hfov": 6.65
  }
 ]
},
{
 "id": "overlay_28B5D630_3B75_5422_41C4_66393DFC78DE",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301146D3_3B55_5466_4186_E9E3E312A398, this.camera_067B7A04_3B5D_DFE2_41CB_91B2B5A10061); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_2_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 120
     }
    ]
   },
   "pitch": -0.92,
   "yaw": -138.01,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.92
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -138.01,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.92,
   "hfov": 3.92
  }
 ]
},
{
 "id": "overlay_2F24E157_3B75_4C6E_41B8_1D27CA9E4074",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_301939E0_3B55_BC21_4178_3086E7EF5FCC, this.camera_064899F4_3B5D_DC22_41A5_EB371E2CDB39); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_3_0.png",
      "width": 267,
      "class": "ImageResourceLevel",
      "height": 270
     }
    ]
   },
   "pitch": -17.93,
   "yaw": -143.91,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.66
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -143.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -17.93,
   "hfov": 7.66
  }
 ]
},
{
 "id": "overlay_1A25B6C7_3BAD_F46E_41B2_CE0ADC264AB0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_30183AC6_3B56_BC6E_41BA_38A32DB75070, this.camera_06655A23_3B5D_DC26_41C0_B5C8C5F94149); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0_HS_4_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": -1.11,
   "yaw": -53.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.52
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "maps": [
  {
   "yaw": -53.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3003BCFF_3B55_D41F_41B5_CD9C1E98B3DA_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.11,
   "hfov": 4.52
  }
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "width": 110,
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "gap": 10,
 "class": "Container",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "shadow": false,
 "height": 110,
 "top": "0%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "right": "0%",
 "width": "91.304%",
 "verticalAlign": "top",
 "gap": 3,
 "class": "Container",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "height": "85.959%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "visible": false,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 3000,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "maxHeight": 2,
 "right": "0%",
 "verticalAlign": "middle",
 "class": "Image",
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "bottom": 53,
 "shadow": false,
 "height": 2,
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "data": {
  "name": "white line"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "gap": 3,
 "class": "Container",
 "overflow": "scroll",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 30,
 "contentOpaque": false,
 "propagateClick": true,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "height": 51,
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "5%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "5%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "5%",
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "80%",
 "shadow": false,
 "minWidth": 1,
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "shadowColor": "#000000",
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "5%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "5%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "5%",
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "80%",
 "shadow": false,
 "minWidth": 1,
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "7%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "7%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorRatios": [
  0,
  1
 ],
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "shadowColor": "#000000",
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "5%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "5%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0,
 "overflow": "visible",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "5%",
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "80%",
 "shadow": false,
 "minWidth": 1,
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 }
},
{
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorRatios": [
  0,
  1
 ],
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "overflow": "visible",
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "7%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "7%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "7%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "7%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "7%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "7%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "propagateClick": false,
 "top": "5%",
 "borderRadius": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "shadowBlurRadius": 25,
 "shadow": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "5%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "right": "10%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "overflow": "visible",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "5%",
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "80%",
 "shadow": false,
 "minWidth": 1,
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "maxHeight": 60,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 60,
 "transparencyActive": true,
 "minWidth": 1,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "cursor": "hand",
 "data": {
  "name": "image button menu"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "push",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "click": "this.shareTwitter(window.location.href)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "visible": false,
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "width": 58,
 "maxHeight": 58,
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "borderRadius": 0,
 "mode": "push",
 "shadow": false,
 "height": 58,
 "transparencyActive": true,
 "minWidth": 1,
 "click": "this.shareFacebook(window.location.href)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "borderSize": 0,
 "horizontalAlign": "center",
 "visible": false,
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton FB"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "backgroundColorRatios": [
  0
 ],
 "width": 120,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 0,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "rollOverShadow": false,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "label": "HOUSE INFO",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "visible": false,
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button house info"
 },
 "gap": 5
},
{
 "paddingBottom": 0,
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 130,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PANORAMA LIST",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button panorama list"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 90,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "LOCATION",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button location"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 103,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "FLOORPLAN",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button floorplan"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 112,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PHOTOALBUM",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "visible": false,
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button photoalbum"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 90,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": true,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 0.8,
 "mode": "push",
 "shadow": false,
 "height": 40,
 "fontSize": 12,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "REALTOR",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "visible": false,
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "bold",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button realtor"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "overflow": "scroll",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "width": "85%",
 "verticalAlign": "middle",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 20,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "overflow": "visible",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "width": "50%",
 "verticalAlign": "top",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#0069A3",
 "minHeight": 1,
 "paddingLeft": 50,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 50,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxHeight": 60,
 "width": "25%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "overflow": "scroll",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "width": "85%",
 "verticalAlign": "middle",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 20,
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "overflow": "visible",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "width": "50%",
 "verticalAlign": "top",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#0069A3",
 "minHeight": 1,
 "paddingLeft": 50,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 50,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "maxHeight": 60,
 "width": "25%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 140,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "width": "100%",
 "scrollBarColor": "#04A3E1",
 "itemPaddingLeft": 3,
 "itemVerticalAlign": "top",
 "backgroundOpacity": 0.05,
 "itemThumbnailScaleMode": "fit_outside",
 "paddingLeft": 70,
 "rollOverItemThumbnailShadow": true,
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "itemBackgroundColor": [],
 "itemLabelFontColor": "#666666",
 "height": "100%",
 "paddingTop": 10,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemThumbnailOpacity": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "itemThumbnailWidth": 220,
 "itemLabelGap": 7,
 "selectedItemLabelFontColor": "#04A3E1",
 "horizontalAlign": "center",
 "itemPaddingRight": 3,
 "selectedItemThumbnailShadow": true,
 "scrollBarOpacity": 0.5,
 "itemThumbnailShadow": false,
 "itemBackgroundColorDirection": "vertical",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 70,
 "paddingRight": 70,
 "itemOpacity": 1,
 "itemMode": "normal",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "gap": 26,
 "itemThumbnailBorderRadius": 0,
 "itemMaxWidth": 1000,
 "itemLabelFontWeight": "normal",
 "class": "ThumbnailGrid",
 "itemHorizontalAlign": "center",
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemMinHeight": 50,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "minHeight": 1,
 "itemMaxHeight": 1000,
 "itemLabelTextDecoration": "none",
 "propagateClick": false,
 "selectedItemLabelFontWeight": "bold",
 "borderRadius": 5,
 "itemLabelFontSize": 14,
 "shadow": false,
 "itemPaddingBottom": 3,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "minWidth": 1,
 "itemMinWidth": 50,
 "itemLabelFontFamily": "Montserrat",
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemWidth": 220,
 "itemBackgroundOpacity": 0,
 "borderSize": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "scrollBarMargin": 2,
 "itemThumbnailHeight": 125,
 "itemLabelPosition": "bottom",
 "itemHeight": 156,
 "itemLabelFontStyle": "normal",
 "itemBorderRadius": 0,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelHorizontalAlign": "center",
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "overflow": "scroll",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "width": "85%",
 "verticalAlign": "middle",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 20,
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "overflow": "visible",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "width": "15%",
 "verticalAlign": "top",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#0069A3",
 "minHeight": 1,
 "paddingLeft": 50,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 400,
 "height": "100%",
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 50,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "width": "25%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 140,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 140,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "overflow": "visible",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "overflow": "visible",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "overflow": "scroll",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "width": "55%",
 "verticalAlign": "middle",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 20,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "overflow": "visible",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "width": "45%",
 "verticalAlign": "top",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 1,
 "scrollBarColor": "#0069A3",
 "minHeight": 1,
 "paddingLeft": 60,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 60,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxHeight": 60,
 "width": "25%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "verticalAlign": "middle",
 "class": "Image",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "data": {
  "name": "Image"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "overflow": "scroll",
 "verticalAlign": "top",
 "width": "100%",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 60,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 30,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#E73B2C",
 "minHeight": 520,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "overflow": "scroll",
 "width": 370,
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 40,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "toolTipShadowSpread": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "toolTipFontSize": 12,
 "progressBackgroundColorDirection": "vertical",
 "right": 0,
 "toolTipOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipFontFamily": "Arial",
 "toolTipBorderRadius": 3,
 "progressRight": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingLeft": 6,
 "toolTipFontStyle": "normal",
 "transitionDuration": 500,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "progressOpacity": 1,
 "playbackBarLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionColor": "#FF6600",
 "paddingTop": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadow": true,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "firstTransitionDuration": 0,
 "toolTipPaddingRight": 6,
 "playbackBarOpacity": 1,
 "progressBottom": 2,
 "paddingRight": 0,
 "progressHeight": 6,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "progressLeft": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipShadowBlurRadius": 3,
 "top": 0,
 "toolTipFontWeight": "normal",
 "borderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "bottom": 0,
 "shadow": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowOpacity": 1,
 "minWidth": 1,
 "playbackBarBorderSize": 0,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarBackgroundOpacity": 1,
 "progressBorderRadius": 0,
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeight": 10,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowColor": "#333333",
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBorderRadius": 0,
 "data": {
  "name": "Viewer info 1"
 },
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676"
},
{
 "paddingBottom": 0,
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "width": "100%",
 "verticalAlign": "middle",
 "gap": 10,
 "class": "Container",
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container arrows"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "overflow": "scroll",
 "verticalAlign": "top",
 "width": "100%",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 60,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 30,
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#E73B2C",
 "minHeight": 520,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "overflow": "scroll",
 "width": 370,
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 40,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 100,
 "paddingLeft": 80,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.15vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.15vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "right": 20,
 "width": "100%",
 "verticalAlign": "top",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 }
},
{
 "paddingBottom": 0,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "backgroundColorRatios": [
  0
 ],
 "right": "0%",
 "class": "WebFrame",
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d955.3966211946527!2d-123.92497314926648!3d47.23370168544711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1718989887343!5m2!1sen!2sus",
 "backgroundOpacity": 1,
 "insetBorder": false,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollEnabled": true,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "paddingRight": 0,
 "data": {
  "name": "WebFrame48191"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "overflow": "scroll",
 "verticalAlign": "top",
 "width": "100%",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 60,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 30,
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#E73B2C",
 "minHeight": 520,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "overflow": "scroll",
 "width": 370,
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 40,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 100,
 "paddingLeft": 80,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.15vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.15vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "right": 20,
 "width": "100%",
 "verticalAlign": "top",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 }
},
{
 "paddingBottom": 0,
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 100,
 "paddingLeft": 80,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.15vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.15vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "maxHeight": 60,
 "right": 20,
 "width": "100%",
 "verticalAlign": "top",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 }
},
{
 "toolTipShadowSpread": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "width": "100%",
 "toolTipFontSize": 12,
 "progressBackgroundColorDirection": "vertical",
 "toolTipFontFamily": "Arial",
 "toolTipOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "progressRight": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBottom": 0,
 "toolTipPaddingLeft": 6,
 "toolTipFontStyle": "normal",
 "transitionDuration": 500,
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressOpacity": 1,
 "playbackBarLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionColor": "#FF6600",
 "height": "100%",
 "paddingTop": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadow": true,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "firstTransitionDuration": 0,
 "toolTipPaddingRight": 6,
 "playbackBarOpacity": 1,
 "progressBottom": 2,
 "paddingRight": 0,
 "progressHeight": 6,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "progressLeft": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontWeight": "normal",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipShadowBlurRadius": 3,
 "top": "0%",
 "toolTipTextShadowColor": "#000000",
 "borderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowOpacity": 1,
 "minWidth": 1,
 "playbackBarHeight": 10,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderColor": "#0066FF",
 "progressBorderRadius": 0,
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowColor": "#333333",
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBorderRadius": 0,
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676"
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "minWidth": 50,
 "transparencyActive": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton <"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "maxHeight": 60,
 "right": 10,
 "width": "14.22%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "minWidth": 50,
 "transparencyActive": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton >"
 }
},
{
 "toolTipShadowSpread": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "width": "100%",
 "toolTipFontSize": 12,
 "progressBackgroundColorDirection": "vertical",
 "toolTipFontFamily": "Arial",
 "toolTipOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "progressRight": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBottom": 0,
 "toolTipPaddingLeft": 6,
 "toolTipFontStyle": "normal",
 "transitionDuration": 500,
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressOpacity": 1,
 "playbackBarLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionColor": "#FF6600",
 "height": "100%",
 "paddingTop": 0,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadow": true,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "firstTransitionDuration": 0,
 "toolTipPaddingRight": 6,
 "playbackBarOpacity": 1,
 "progressBottom": 2,
 "paddingRight": 0,
 "progressHeight": 6,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "progressLeft": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontWeight": "normal",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipShadowBlurRadius": 3,
 "top": "0%",
 "toolTipTextShadowColor": "#000000",
 "borderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowOpacity": 1,
 "minWidth": 1,
 "playbackBarHeight": 10,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderColor": "#0066FF",
 "progressBorderRadius": 0,
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowColor": "#333333",
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBorderRadius": 0,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676"
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "minWidth": 50,
 "transparencyActive": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton <"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxHeight": 60,
 "right": 10,
 "width": "14.22%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "borderRadius": 0,
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "minWidth": 50,
 "transparencyActive": false,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton >"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxHeight": 60,
 "right": 20,
 "width": "10%",
 "verticalAlign": "top",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "10%",
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "verticalAlign": "bottom",
 "class": "Image",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "data": {
  "name": "Image"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "overflow": "scroll",
 "verticalAlign": "top",
 "width": "100%",
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 60,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 20,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 30,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "overflow": "scroll",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#E73B2C",
 "minHeight": 520,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "paddingRight": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "overflow": "scroll",
 "width": 370,
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "height": 40,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 20,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.6vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.6vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.35vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.35vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.35vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.35vh;font-family:'Bebas Neue Bold';\"><B>lorem ipsum:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.58vh;font-family:'Bebas Neue Bold';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "paddingRight": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "verticalAlign": "middle",
 "fontFamily": "Bebas Neue Bold",
 "width": "46%",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0.7,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": false,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "backgroundColor": [
  "#04A3E1"
 ],
 "minWidth": 1,
 "mode": "push",
 "shadowSpread": 1,
 "fontSize": "3vh",
 "label": "lorem ipsum",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 6,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "height": "9%",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 150,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "maxHeight": 150,
 "width": "12%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 70,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "8%",
 "minWidth": 70,
 "mode": "push",
 "transparencyActive": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton <"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "80%",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "30%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "layout": "absolute",
 "paddingRight": 0,
 "data": {
  "name": "Container separator"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 150,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "maxHeight": 150,
 "width": "12%",
 "verticalAlign": "middle",
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 70,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "8%",
 "minWidth": 70,
 "mode": "push",
 "transparencyActive": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "cursor": "hand",
 "data": {
  "name": "IconButton >"
 }
},
{
 "paddingBottom": 20,
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.6vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.6vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.35vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.35vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.12vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "paddingRight": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "verticalAlign": "middle",
 "fontFamily": "Bebas Neue Bold",
 "width": "46%",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0.7,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": false,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "backgroundColor": [
  "#04A3E1"
 ],
 "minWidth": 1,
 "mode": "push",
 "shadowSpread": 1,
 "fontSize": "3vh",
 "label": "lorem ipsum",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 6,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "height": "9%",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 20,
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.6vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.79vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">47.233588, -123.925239</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "paddingRight": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "paddingBottom": 0,
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "width": 207,
 "fontFamily": "Bebas Neue Bold",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "class": "Button",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundOpacity": 0.7,
 "iconWidth": 32,
 "minHeight": 1,
 "paddingLeft": 0,
 "gap": 5,
 "propagateClick": false,
 "height": 59,
 "borderRadius": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 1,
 "mode": "push",
 "shadow": false,
 "fontSize": 34,
 "minWidth": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "label": "lorem ipsum",
 "paddingTop": 0,
 "borderColor": "#000000",
 "shadowBlurRadius": 6,
 "borderSize": 0,
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "textDecoration": "none",
 "visible": false,
 "pressedBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "paddingRight": 0,
 "fontWeight": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "cursor": "hand",
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "paddingBottom": 10,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "45%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.93vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "paddingRight": 0,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "overflow": "scroll",
 "children": [
  "this.Image_AAEAE258_BAF1_0DDD_41E6_FB144FCE6904",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "width": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "contentOpaque": false,
 "propagateClick": false,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "80%",
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "paddingBottom": 0,
 "maxWidth": 983,
 "id": "Image_AAEAE258_BAF1_0DDD_41E6_FB144FCE6904",
 "maxHeight": 1219,
 "width": "25.177%",
 "verticalAlign": "middle",
 "class": "Image",
 "url": "skin/Image_AAEAE258_BAF1_0DDD_41E6_FB144FCE6904.jpg",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "30.5%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "data": {
  "name": "Image4092"
 }
},
{
 "paddingBottom": 10,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarVisible": "rollOver",
 "width": "72.222%",
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "borderRadius": 0,
 "shadow": false,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#233142;font-size:2.35vh;font-family:'Bebas Neue Bold';\">NICHOLAS CUMMINGS</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.79vh;font-family:'Bebas Neue Bold';\">Licensed Realtor</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.79vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.79vh;font-family:'Bebas Neue Bold';\">Tlf.: +1 (253) 225-0548</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.79vh;font-family:'Bebas Neue Bold';\">NicholasC@JohnLScott.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.79vh;font-family:'Bebas Neue Bold';\">NicholasC.JohnLScott.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.12vh;font-family:'Bebas Neue Bold';\">Meet Nick Cummings, your trusted real estate advisor in Kitsap County, Washington. As a native of this beautiful region, I bring a deep understanding of its neighborhoods, communities, and market trends. While my experience in the real estate industry may be modest, my passion for helping clients achieve their homeownership dreams is boundless.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.12vh;font-family:'Bebas Neue Bold';\">With a genuine love for Kitsap County and its unique charm, I am committed to providing personalized service tailored to each client's needs and preferences. Whether you're buying, selling, or investing in real estate, I am here to guide you every step of the way. Holding a realtor license, I adhere to the highest standards of professionalism and ethics, ensuring a seamless and rewarding real estate experience for my clients.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.12vh;font-family:'Bebas Neue Bold';\">My approach is rooted in transparency, integrity, and open communication. I take the time to listen to my clients' goals and concerns, empowering them with the knowledge and resources they need to make informed decisions. From navigating the complexities of the local market to negotiating the best possible deals, I am dedicated to achieving exceptional results for my clients.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.12vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.12vh;font-family:'Bebas Neue Bold';\">As your local real estate expert, I am honored to serve the diverse communities of Kitsap County. Whether you're searching for your dream home, selling your property, or exploring investment opportunities, I am here to turn your real estate aspirations into reality. Contact me today, and let's embark on this exciting journey together</SPAN></SPAN></DIV></div>",
 "paddingRight": 10,
 "data": {
  "name": "HTMLText19460"
 }
}],
 "mouseWheelEnabled": true,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "vrPolyfillScale": 0.5,
 "layout": "absolute",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
