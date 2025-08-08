
(function(){
  const wrap = document.getElementById('wavewrap');
  if(!wrap) return;
  const c = document.createElement('canvas');
  wrap.appendChild(c);
  const goal = document.createElement('div');
  goal.className = 'goal';
  wrap.appendChild(goal);
  const ctx = c.getContext('2d');
  function resize(){
    c.width = wrap.clientWidth * devicePixelRatio;
    c.height = wrap.clientHeight * devicePixelRatio;
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();
  let t=0;
  function draw(){
    t += 0.02;
    ctx.clearRect(0,0,c.width,c.height);
    const W=c.width, H=c.height;
    const A = H*0.08;
    const base = H*0.6;
    ctx.lineWidth = 2*devicePixelRatio;
    ctx.lineCap = 'round';
    // Draw direction cue (subtle lines)
    ctx.strokeStyle = 'rgba(245,237,226,0.2)';
    for(let i=0;i<3;i++){
      ctx.beginPath();
      const yy = base + (i-1)*A*0.8 + Math.sin(t+i)*A*0.2;
      ctx.moveTo(W*0.05, yy);
      ctx.lineTo(W*0.95, yy);
      ctx.stroke();
    }
    // Main wave
    ctx.strokeStyle = 'rgba(245,237,226,0.92)';
    ctx.beginPath();
    for(let x=0;x<=W;x+=6*devicePixelRatio){
      const y = base + Math.sin((x/W)*8 + t)*A;
      if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();
    // Move goal along path (left to right and back)
    const phase = (Math.sin(t*0.6)+1)/2; // 0..1
    const gx = W*0.1 + phase * W*0.8;
    const gy = base + Math.sin((gx/W)*8 + t)*A;
    goal.style.left = (gx/devicePixelRatio)/ (W/devicePixelRatio) * wrap.clientWidth - 6 + 'px';
    goal.style.top = (gy/devicePixelRatio)/ (H/devicePixelRatio) * wrap.clientHeight - 6 + 'px';
    requestAnimationFrame(draw);
  }
  draw();
})();