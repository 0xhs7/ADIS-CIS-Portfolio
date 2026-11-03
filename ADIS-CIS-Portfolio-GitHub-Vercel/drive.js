export function driveTarget(value){
  try{const u=new URL(value);if(u.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(u.hostname))return null;
    const folder=u.pathname.match(/\/folders\/([\w-]+)/);if(folder)return {url:u.href,kind:'folder',preview:'https://drive.google.com/embeddedfolderview?id='+folder[1]+'#grid'};
    const file=u.pathname.match(/\/d\/([\w-]+)/);const id=file?.[1]||u.searchParams.get('id');if(!id||!/^[-\w]+$/.test(id))return null;
    return {url:u.href,kind:'file',preview:'https://drive.google.com/file/d/'+id+'/preview'};
  }catch{return null}
}
export function folderSummary(f,esc,icon){return `<section class="drive-summary"><span class="drive-summary-icon">${icon('folder')}</span><div><strong>Google Drive folder</strong><p>${f.driveConfirmed?'Existence confirmed by '+esc(f.driveConfirmedBy||'Hiloni'):'Folder existence has not been confirmed yet.'}</p></div><span class="existence ${f.driveConfirmed?'confirmed':''}">${f.driveConfirmed?'Confirmed':'Not confirmed'}</span><button class="btn" data-drive-folder="${f.id}">${icon('diagonal')} ${f.driveUrl?'Open folder & preview':'Drive details'}</button></section>`}
