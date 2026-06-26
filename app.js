/* ===== Syntax Highlighter ===== */
function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightCode(code) {
  var h = escapeHtml(code);
  h = h.replace(/(&lt;[\w.\-\s]+&gt;)/g, '<span class="var">$1</span>');
  h = h.replace(/(--?[\w-]+)/g, '<span class="fl">$1</span>');
  h = h.replace(/"([^"]*)"/g, '<span class="str">"$1"</span>');
  h = h.replace(/(#.*$)/gm, '<span class="cm">$1</span>');
  h = h.replace(/([|>&;]|&amp;&amp;|\|\|)/g, '<span class="p">$1</span>');
  h = h.replace(/^(\s*)([a-zA-Z][\w.-]*)/gm, function(m, sp, cmd) {
    return sp + '<span class="kw">' + cmd + '</span>';
  });
  return h;
}

function renderCode(code) {
  if (Array.isArray(code)) {
    return code.map(function(line) { return highlightCode(line); }).join('\n');
  }
  return highlightCode(code);
}

/* ===== Renderer ===== */
function renderSections() {
  var container = document.getElementById('commandsContainer');
  var html = '';
  SECTIONS.forEach(function(section) {
    html += '<div class="section-card" id="' + section.id + '">';
    html += '<h2><span class="emoji">' + section.emoji + '</span> ' + section.title + '</h2>';
    html += '<div class="cmd-grid">';
    section.commands.forEach(function(cmd) {
      var badge = '';
      if (cmd.diff) {
        badge = '<span class="badge-' + cmd.diff + '">' + cmd.diff + '</span>';
      }
      var lines = renderCode(cmd.code);
      html += '<div class="cmd">';
      html += '<div class="cmd-header" onclick="toggleCmd(this)">';
      html += '<div><div class="cmd-title">' + cmd.title + badge + '</div><div class="cmd-desc">' + cmd.desc + '</div></div>';
      html += '<span class="expand-icon">\u25BC</span>';
      html += '</div>';
      html += '<div class="cmd-body">';
      html += '<pre>' + lines + '<button class="copy-btn" onclick="copyCmd(this)">copy</button></pre>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div></div>';
  });
  container.innerHTML = html;
}

/* ===== Expand / Collapse ===== */
function toggleCmd(header) {
  var body = header.nextElementSibling;
  var icon = header.querySelector('.expand-icon');
  var expanded = body.style.display !== 'none';
  body.style.display = expanded ? 'none' : '';
  icon.textContent = expanded ? '\u25B6' : '\u25BC';
}

function expandAll() {
  document.querySelectorAll('.cmd-body').forEach(function(el) {
    el.style.display = '';
  });
  document.querySelectorAll('.expand-icon').forEach(function(el) {
    el.textContent = '\u25BC';
  });
}

function collapseAll() {
  document.querySelectorAll('.cmd-body').forEach(function(el) {
    el.style.display = 'none';
  });
  document.querySelectorAll('.expand-icon').forEach(function(el) {
    el.textContent = '\u25B6';
  });
}

/* ===== Theme ===== */
function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById('themeBtn');
  body.classList.toggle('light');
  btn.textContent = body.classList.contains('light') ? '\u2600\uFE0F' : '\uD83C\uDF19';
  try { localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark'); } catch(e) {}
}

function loadTheme() {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      document.getElementById('themeBtn').textContent = '\u2600\uFE0F';
    }
  } catch(e) {}
}

/* ===== Search ===== */
function filterCommands() {
  var q = document.getElementById('searchInput').value.toLowerCase();
  var cards = document.querySelectorAll('.section-card');
  var anyVisible = false;
  cards.forEach(function(card) {
    var cmds = card.querySelectorAll('.cmd');
    var cardHasMatch = false;
    cmds.forEach(function(cmd) {
      var title = (cmd.querySelector('.cmd-title')?.textContent || '').toLowerCase();
      var desc = (cmd.querySelector('.cmd-desc')?.textContent || '').toLowerCase();
      var match = !q || title.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
      cmd.style.display = match ? '' : 'none';
      if (match) cardHasMatch = true;
    });
    card.style.display = cardHasMatch ? '' : 'none';
    if (cardHasMatch) anyVisible = true;
  });
  var noRes = document.getElementById('noResults');
  noRes.classList.toggle('visible', !anyVisible && q.length > 0);
}

/* ===== Copy ===== */
function copyCmd(btn) {
  var pre = btn.parentElement;
  var text = pre.textContent.replace('copy', '').trim();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
  var orig = btn.textContent;
  btn.textContent = '\u2713 copied';
  setTimeout(function() { btn.textContent = orig; }, 1500);
}

/* ===== Keyboard shortcuts ===== */
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') {
    document.getElementById('searchInput').blur();
  }
});

/* ===== Scroll-to-top button ===== */
function initScrollToTop() {
  var btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Active TOC highlighting ===== */
function initTocHighlight() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc a').forEach(function(a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });
  document.querySelectorAll('.section-card').forEach(function(section) {
    observer.observe(section);
  });
}

/* ===== Init ===== */
renderSections();
loadTheme();
initScrollToTop();
initTocHighlight();
