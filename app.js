// app.js - 简单交互：搜索、分类、打开 iframe 播放窗口
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const gameGrid = document.getElementById('gameGrid');
  const categoryNav = document.getElementById('categoryNav');
  const modal = document.getElementById('playerModal');
  const gameFrame = document.getElementById('gameFrame');
  const closeModal = document.getElementById('closeModal');
  const featuredPlay = document.getElementById('featuredPlay');

  function filterGames() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const activeCatBtn = categoryNav.querySelector('.cat-btn.active');
    const cat = activeCatBtn ? activeCatBtn.dataset.cat : 'all';
    const cards = Array.from(gameGrid.querySelectorAll('.game-card'));

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const cardCat = card.dataset.cat || 'all';
      const matchQuery = !q || title.includes(q) || tags.includes(q);
      const matchCat = cat === 'all' || cardCat === cat;
      card.style.display = (matchQuery && matchCat) ? '' : 'none';
    });
  }

  // 搜索监听（节流简单实现）
  let searchTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(filterGames, 180);
  });

  // 分类切换
  categoryNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    categoryNav.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterGames();
  });

  // Play 按钮打开 modal
  gameGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.play-btn');
    if (!btn) return;
    const gamePath = btn.dataset.game;
    if (!gamePath) return alert('未配置游戏地���');
    openModal(gamePath);
  });

  // featured play
  featuredPlay.addEventListener('click', () => {
    const src = featuredPlay.dataset.game;
    openModal(src);
  });

  function openModal(src) {
    gameFrame.src = src;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // 防止 body 滚动
    document.body.style.overflow = 'hidden';
  }

  closeModal.addEventListener('click', () => {
    closePlayer();
  });
  // 点击模态外部关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePlayer();
  });

  function closePlayer() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    // 卸载 iframe 避免后台继续运行
    gameFrame.src = 'about:blank';
    document.body.style.overflow = '';
  }

  // 支持键盘 Esc 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closePlayer();
  });

  // 初始化一次过滤（显示所有）
  filterGames();
});
