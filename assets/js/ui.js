/**
 * Astrixa UI — Shared UI Components & Interactions
 */

const UI = {
  // Toast Notifications
  toast: (message, type = 'info', duration = 3000) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '✨'}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Modals
  modal: ({ title, body, footer, onClose }) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
      <div class="modal-header">
        <h2 class="text-xl font-bold">${title}</h2>
        <button class="btn-icon" id="modal-close">✕</button>
      </div>
      <div class="modal-body">${body}</div>
      <div class="modal-footer">${footer || ''}</div>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    const close = () => {
      backdrop.classList.add('opacity-0');
      setTimeout(() => {
        backdrop.remove();
        if (onClose) onClose();
      }, 200);
    };

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    
    modal.querySelector('#modal-close').addEventListener('click', close);

    return { close };
  },

  // Dropdowns
  createDropdown: (trigger, items, options = {}) => {
    const menu = document.createElement('div');
    menu.className = `dropdown-menu ${options.right ? 'right' : ''}`;
    
    items.forEach(item => {
      if (item.divider) {
        const div = document.createElement('div');
        div.className = 'dropdown-divider';
        menu.appendChild(div);
        return;
      }
      
      const el = document.createElement('div');
      el.className = `dropdown-item ${item.danger ? 'danger' : ''}`;
      el.innerHTML = `
        ${item.icon ? `<span>${item.icon}</span>` : ''}
        <span>${item.label}</span>
      `;
      el.addEventListener('click', () => {
        item.onClick();
        menu.remove();
      });
      menu.appendChild(el);
    });

    trigger.parentElement.appendChild(menu);

    const close = (e) => {
      if (!menu.contains(e.target) && e.target !== trigger) {
        menu.remove();
        document.removeEventListener('click', close);
      }
    };

    setTimeout(() => document.addEventListener('click', close), 0);
  },

  // Markdown Rendering (Simplified for vanilla JS)
  renderMarkdown: (text) => {
    if (!text) return '';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<div class="code-block-wrapper">
          <div class="code-block-header">
            <span>${lang || 'code'}</span>
            <button class="copy-code-btn" onclick="UI.copyToClipboard(this)">Copy</button>
          </div>
          <pre><code class="language-${lang}">${code.trim()}</code></pre>
        </div>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return `<div class="markdown-content"><p>${html}</p></div>`;
  },

  copyToClipboard: (btn) => {
    const code = btn.closest('.code-block-wrapper').querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      const originalText = btn.innerText;
      btn.innerText = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('copied');
      }, 2000);
    });
  }
};

window.UI = UI;
