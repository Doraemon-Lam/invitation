// 访问历史记录
let visitHistory = [];

const music = document.getElementById('backgroundMusic');

// 在用户点击页面任意按钮时播放音乐
document.body.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch((error) => {
      console.error('音乐播放被阻止:', error);
    });
  }
}, { once: true }); // 确保只触发一次

// 显示下一节
function showNextSection(currentIndex) {
  visitHistory.push(currentIndex);
  const currentSection = document.getElementById(`section${currentIndex}`);
  const nextIndex = currentIndex + 1;
  const nextSection = document.getElementById(`section${nextIndex}`);
  
  currentSection.classList.remove('active');
  
  if (nextSection) {
    nextSection.classList.add('active');
    setTimeout(() => {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

// 返回上一节
function goBack(currentIndex) {
  if (visitHistory.length > 0) {
    const prevIndex = visitHistory.pop();
    document.getElementById(`section${currentIndex}`).classList.remove('active');
    document.getElementById(`section${prevIndex}`).classList.add('active');
    
    setTimeout(() => {
      document.getElementById(`section${prevIndex}`).scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }, 50);
  }
}

// 显示回应消息
function showResponse(choice) {
  const responseDiv = document.getElementById('responseMessage');

  // 显示respondmeassge
  responseDiv.style.display = 'block';
  
  if (choice === 'positive') {
    responseDiv.innerHTML = `
      <h3>❤️ 感谢你的喜欢</h3>
      <p>期待与你的每一次对话</p>
      <p>这是为你准备的网页哦:D <br> <a href="https://doraemon-lam.github.io/for_yanfei/" target="_blank">https://doraemon-lam.github.io/for_yanfei/</a></p>
    `;
  } else {
    responseDiv.innerHTML = `
      <h3>☀️ 感谢你的阅读</h3>
      <p>看完一个小笨蛋的胡言乱语</p>
      <p><small>本页面将在<span id="countdown">10</span>秒后自动销毁</small></p>
    `;
    startCountdown();
  }
  
  // 滚动到消息区域
  setTimeout(() => {
    responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// 倒计时关闭
function startCountdown() {
  let count = 10;
  const countdownElement = document.getElementById('countdown');
  const countdown = setInterval(() => {
    countdownElement.textContent = --count;
    if (count <= 0) {
      clearInterval(countdown);
      document.querySelector('.container').style.opacity = '0';
      setTimeout(() => {
        alert('页面已关闭，感谢你的阅读');
      }, 500);
    }
  }, 1000);
}

// 键盘导航支持
document.addEventListener('keydown', (e) => {
  const activeSection = document.querySelector('.section.active');
  if (!activeSection) return;
  
  const currentId = activeSection.id;
  const currentIndex = parseInt(currentId.replace('section', ''));
  
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    showNextSection(currentIndex);
  } else if (e.key === 'ArrowLeft') {
    goBack(currentIndex);
  }
});