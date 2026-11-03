const paths={refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-2l2 3M4 16l2 3a7 7 0 0 0 12-2"/>',
 dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 diagonal:'<path d="M7 17 17 7M7 7h10v10"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
 folder:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 9h18"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-5"/>',
 sparkle:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
 alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 3v1"/>'
};
export function icon(name){return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`}
export function icons(root=document){const glyphs={'◈':'dashboard','▤':'file','♧':'users','◷':'clock','✓':'check','↗':'diagonal','↓':'download','✉':'mail','▰':'folder','☰':'menu','✕':'close','→':'arrow'};const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let nodes=[],n;while(n=walker.nextNode())if(n.parentElement&&!['SCRIPT','STYLE','TEXTAREA','OPTION','INPUT'].includes(n.parentElement.tagName)&&Object.keys(glyphs).some(g=>n.textContent.includes(g)))nodes.push(n);for(const node of nodes){const frag=document.createDocumentFragment();for(const chunk of node.textContent.split(/([◈▤♧◷✓↗↓✉▰☰✕→])/)){if(glyphs[chunk]){const t=document.createElement('template');t.innerHTML=icon(glyphs[chunk]);frag.append(t.content)}else frag.append(document.createTextNode(chunk))}node.replaceWith(frag)}}
export function collectionPanel(ds){let count=s=>ds.filter(d=>d.status===s).length,rec=count('Received')+count('Approved'),pending=count('Pending')+count('Changes requested'),unknown=count('Unknown'),pct=ds.length?Math.round(rec/ds.length*100):0;return `<aside class="collection-panel"><div class="collection-label">${icon('shield')} COLLECTION SNAPSHOT</div><div class="collection-chart" style="--received:${ds.length?rec/ds.length*100:0}%;--pending:${ds.length?(rec+pending)/ds.length*100:0}%"><div><strong>${pct}<sup>%</sup></strong><span>received</span></div></div><div class="chart-legend"><span><i class="received-dot"></i>Received <b>${rec}</b></span><span><i class="pending-dot"></i>Pending <b>${pending}</b></span><span><i class="unknown-dot"></i>Unknown <b>${unknown}</b></span></div><button class="snapshot-action" id="snapshotReview">Review collection ${icon('arrow')}</button></aside>`}
export function priorityStrip(ds){const unassigned=ds.filter(d=>!d.assignee).length,review=ds.filter(d=>d.status==='Received').length;return `<div class="priority-strip"><div class="priority-intro">${icon('sparkle')}<div><b>Needs attention</b><span>Documents that need a follow-up.</span></div></div><button id="priorityAssign"><span class="priority-symbol">${icon('users')}</span><span><b>${unassigned} need an assignee</b><small>Assign a colleague to collect these</small></span>${icon('arrow')}</button><button id="priorityReview"><span class="priority-symbol green">${icon('check')}</span><span><b>${review} ready for review</b><small>Review the documents received</small></span>${icon('arrow')}</button></div>`}
