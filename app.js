/* ===== Syntax Highlighter ===== */
function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightCode(code) {
  var h = escapeHtml(code);
  var all = /(&lt;[\w.\-\s]+&gt;)|(--?[\w-]+)|"([^"]*)"|(#.*$)|\|/gm;
  h = h.replace(all, function(m, var_, fl, strContent, cm) {
    if (var_) return "<span class='var'>" + var_ + "</span>";
    if (fl) return "<span class='fl'>" + fl + "</span>";
    if (strContent !== undefined) return "<span class='str'>\"" + strContent + "\"</span>";
    if (cm) return "<span class='cm'>" + cm + "</span>";
    return "<span class='p'>" + m + "</span>";
  });
  h = h.replace(/^(\s*)([a-zA-Z][\w.-]*)/gm, function(m, sp, cmd) {
    return sp + "<span class='kw'>" + cmd + "</span>";
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
    html += '<h2 onclick="toggleSection(this)" style="cursor:pointer;user-select:none"><span class="emoji">' + section.emoji + '</span> ' + section.title + ' <span class="section-icon" style="font-size:0.6em;color:var(--text-muted);margin-left:auto">\u25BC</span></h2>';
    html += '<div class="section-body">';
    html += '<div class="cmd-grid">';
    section.commands.forEach(function(cmd) {
      var badge = '';
      if (cmd.diff) {
        badge = '<span class="badge-' + cmd.diff + '">' + cmd.diff + '</span>';
      }
      var lines = renderCode(cmd.code);
      html += '<div class="cmd' + (cmd.diff ? ' diff-' + cmd.diff : '') + '">';
      html += '<div class="cmd-header" onclick="toggleCmd(this)">';
      html += '<div><div class="cmd-title">' + cmd.title + badge + '</div><div class="cmd-desc">' + cmd.desc + '</div></div>';
      html += '<span class="expand-icon">\u25B6</span>';
      html += '</div>';
      html += '<div class="cmd-body" style="display:none">';
      html += '<pre>' + lines + '<button class="copy-btn" onclick="copyCmd(this)">copy</button></pre>';
      if (cmd.output) {
        html += '<div class="cmd-output" style="display:none"><div class="output-label">Example output</div><pre class="output-pre">' + escapeHtml(cmd.output) + '</pre></div>';
        html += '<button class="run-btn" onclick="toggleOutput(this)">▶ Run</button>';
      }
      html += '</div>';
      html += '</div>';
    });
    html += '</div></div></div>';
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

function toggleOutput(btn) {
  var output = btn.parentElement.querySelector('.cmd-output');
  if (!output) return;
  var expanded = output.style.display !== 'none';
  output.style.display = expanded ? 'none' : '';
  btn.textContent = expanded ? '▶ Run' : '▼ Hide output';
}

function escapeHtml(text) {
  var d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function toggleSection(header) {
  var body = header.nextElementSibling;
  var icon = header.querySelector('.section-icon');
  var expanded = body.style.display !== 'none';
  body.style.display = expanded ? 'none' : '';
  icon.textContent = expanded ? '\u25B6' : '\u25BC';
}

function expandAll() {
  document.querySelectorAll('.cmd-body').forEach(function(el) { el.style.display = ''; });
  document.querySelectorAll('.expand-icon').forEach(function(el) { el.textContent = '\u25BC'; });
  document.querySelectorAll('.section-body').forEach(function(el) { el.style.display = ''; });
  document.querySelectorAll('.section-icon').forEach(function(el) { el.textContent = '\u25BC'; });
}

function collapseAll() {
  document.querySelectorAll('.cmd-body').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('.expand-icon').forEach(function(el) { el.textContent = '\u25B6'; });
  document.querySelectorAll('.section-body').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('.section-icon').forEach(function(el) { el.textContent = '\u25B6'; });
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
      var code = (cmd.querySelector('.cmd-body pre')?.textContent || '').toLowerCase().replace('copy', '');
      var output = (cmd.querySelector('.output-pre')?.textContent || '').toLowerCase();
      var match = !q || title.indexOf(q) !== -1 || desc.indexOf(q) !== -1 || code.indexOf(q) !== -1 || output.indexOf(q) !== -1;
      cmd.style.display = match ? '' : 'none';
      if (match) cardHasMatch = true;
    });
    card.style.display = cardHasMatch ? '' : 'none';
    if (cardHasMatch) anyVisible = true;
  });
  var noRes = document.getElementById('noResults');
  noRes.classList.toggle('visible', !anyVisible && q.length > 0);
}

/* ===== Difficulty Filter ===== */
var currentDiff = 'all';
function filterDifficulty(diff) {
  currentDiff = diff;
  document.querySelectorAll('.diff-filter button').forEach(function(b) { b.classList.remove('active'); });
  document.getElementById('diff' + diff.charAt(0).toUpperCase() + diff.slice(1)).classList.add('active');
  var cards = document.querySelectorAll('.section-card');
  cards.forEach(function(card) {
    var cmds = card.querySelectorAll('.cmd');
    var cardHasMatch = false;
    cmds.forEach(function(cmd) {
      if (diff === 'all') { cmd.style.display = ''; cardHasMatch = true; }
      else { var match = cmd.classList.contains('diff-' + diff); cmd.style.display = match ? '' : 'none'; if (match) cardHasMatch = true; }
    });
    card.style.display = cardHasMatch ? '' : 'none';
  });
  var q = document.getElementById('searchInput');
  if (q.value) filterCommands();
}

/* ===== Copy ===== */
function copyCmd(btn) {
  var pre = btn.parentElement;
  var text = pre.textContent.replace('copy', '').trim();
  if (navigator.clipboard) navigator.clipboard.writeText(text);
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
  if (e.key === 'Escape') document.getElementById('searchInput').blur();
});

/* ===== Scroll-to-top button ===== */
function initScrollToTop() {
  var btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function() { btn.classList.toggle('visible', window.scrollY > 400); });
  btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ===== Active TOC highlighting ===== */
function initTocHighlight() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc a').forEach(function(a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + entry.target.id) a.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });
  document.querySelectorAll('.section-card').forEach(function(section) { observer.observe(section); });
}

/* ===== Init ===== */
renderSections();
loadTheme();
initScrollToTop();
initTocHighlight();
