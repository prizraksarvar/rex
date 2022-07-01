import {regexHighlight} from './regexHighlighter.js'
import {regexHighlightAcrossTags} from './regexHighlighterAcrossTags.js'
import Profile from '../options/Profile.js'
import {collapseText} from './collapseText.js';

var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return;

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe foo for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }

    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})();

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

function init() {
    console.log('rex_extension.js loaded');
      // INIT
      const profileList = window.ext_rex_profile_list || []
      const activeProfiles = profileList
        .map(profile => Object.assign(new Profile(), profile))
        .filter(profile => profile.isActive(window.location.href))
      if (activeProfiles.length > 0)
        run(activeProfiles)
}

function run(profiles) {
  const highlightConfigs = []
  const collapseConfigs = []
  profiles.forEach(profile => {
    highlightConfigs.push(...profile.highlight)
    collapseConfigs.push(...profile.collapse)
  })

  let startTime = new Date()
  // Collapse first otherwise highlighting might break the search for collapsable text
  collapseConfigs.forEach(config => collapseText(config))
  console.log(`Collapse took ${new Date().getTime() - startTime.getTime()}ms`)

  // Then highlight
  startTime = new Date()
  regexHighlightAcrossTags(highlightConfigs)
  console.log(`Highlight took ${new Date().getTime() - startTime.getTime()}ms`)

  // Observe a specific DOM element:
  observeDOM( document.body, function(m){
     var addedNodes = [], removedNodes = [];
     m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
     m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
     // console.log('Added:', addedNodes, 'Removed:', removedNodes);
     addedNodes.forEach((node) => {
       if (!node || node.classList && (
            node.classList.contains("ext-rex-highlighted-text")
            || node.classList.contains("hc-collapsed")
            || node.classList.contains("collapse-header")
            || node.classList.contains("hc-collapse-body"))) {
         return;
       }
       collapseConfigs.forEach(config => collapseText(config, node))
       regexHighlightAcrossTags(highlightConfigs, node)
     })
  })
}