/* Little Smart Kids animal sounds extension — no Firestore writes. */
(() => {
  'use strict';
  const files = {
    'แมว':'cat','สุนัข':'dog','วัว':'cow','หมู':'pig','ลูกเจี๊ยบ':'chick',
    'เป็ด':'duck','ไก่':'chicken','ม้า':'horse','แกะ':'sheep','แพะ':'goat',
    'ช้าง':'elephant','สิงโต':'lion','เสือ':'tiger','หมี':'bear',
    'ลิง':'monkey','สุนัขจิ้งจอก':'fox','หมาป่า':'wolf','กวาง':'deer',
    'ฮิปโป':'hippo','จระเข้':'crocodile','งู':'snake','กบ':'frog',
    'โลมา':'dolphin','วาฬ':'whale','ปู':'crab','ผึ้ง':'bee',
    'เพนกวิน':'penguin','นกฮูก':'owl','นกแก้ว':'parrot',
    'จิงโจ้':'kangaroo','นาก':'otter','กระรอก':'squirrel',
    'ไก่งวง':'turkey','หงส์':'swan','ฟลามิงโก':'flamingo',
    'นกยูง':'peacock','แมวน้ำ':'seal','กุ้ง':'shrimp',
    'ตั๊กแตน':'grasshopper'
  };
  const style = document.createElement('style');
  style.textContent = '.animal-sound-btn{display:block;margin:8px auto 0;padding:9px 11px;border:1px solid #bde7d7;border-radius:13px;background:#dff8ed;color:#205b48;font:700 14px system-ui,sans-serif;cursor:pointer;min-height:42px}.animal-sound-btn:disabled{opacity:.65}.animal-sound-btn.is-playing{background:#a9efd4}.animal-sound-btn:focus-visible{outline:3px solid #267c9e}';
  document.head.appendChild(style);
  let playing = null, playingButton = null;
  function stopSound(){
    if(playing){playing.pause();playing.currentTime=0;playing=null;}
    if(playingButton){playingButton.classList.remove('is-playing');playingButton.textContent='🐾 ฟังเสียงสัตว์';playingButton=null;}
  }
  function inject(){
    const heading = document.querySelector('.lesson-heading');
    if(!heading || !heading.textContent.includes('สัตว์')) { stopSound(); return; }
    for(const tile of document.querySelectorAll('.grid .tile')){
      if(tile.querySelector('.animal-sound-btn')) continue;
      const name = tile.querySelector('.thai')?.textContent?.trim();
      const slug = files[name];
      if(!slug) continue;
      const button=document.createElement('button');
      button.type='button';button.className='animal-sound-btn';
      button.textContent='🐾 ฟังเสียงสัตว์';
      button.setAttribute('aria-label','ฟังเสียงร้องของ'+name);
      const path='sounds/animals/'+slug+'.mp3';
      // HEAD checks that a genuine, supplied recording exists before showing a button.
      fetch(path,{method:'HEAD',cache:'no-store'}).then(r=>{
        if(!r.ok) return;
        if(!tile.isConnected) return;
        tile.appendChild(button);
      }).catch(()=>{});
      button.addEventListener('click',async ev=>{
        ev.preventDefault();ev.stopPropagation();
        if(playingButton===button){stopSound();return;}
        stopSound();
        if(typeof stopPlayback==='function')stopPlayback();
        const audio=new Audio(path);playing=audio;playingButton=button;
        button.classList.add('is-playing');button.textContent='⏹ หยุดเสียงสัตว์';
        const finish=()=>{if(playing===audio)stopSound()};
        audio.addEventListener('ended',finish,{once:true});
        audio.addEventListener('error',finish,{once:true});
        try{await audio.play()}catch(e){finish()}
      });
    }
  }
  // Prevent the previous animal sound from overlapping vocabulary speech.
  document.addEventListener('click',ev=>{
    if(ev.target.closest('.grid .tile') && !ev.target.closest('.animal-sound-btn') && !ev.target.closest('.photo-add')) stopSound();
  },true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSound()});
  const panel=document.getElementById('panel');
  if(panel){new MutationObserver(()=>queueMicrotask(inject)).observe(panel,{childList:true,subtree:false});inject();}
})();
