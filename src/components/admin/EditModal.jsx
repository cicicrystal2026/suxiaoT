import { useState } from 'react';
import AIcon from './AIcon';

// 通用编辑/新建弹窗：按 fields 配置渲染表单
// fields: [{ key, label, type?: 'text'|'textarea'|'number'|'select', options?: [], placeholder?, width? }]
export default function EditModal({ title, fields, value, onSave, onClose, saving }) {
  const [form, setForm] = useState(() => {
    const init = { ...(value || {}) };
    fields.forEach((f) => { if (init[f.key] === undefined) init[f.key] = ''; });
    return init;
  });
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const inputCss = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,28,48,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} className="adm-card" style={{ width: 560, maxWidth: '92vw', maxHeight: '88vh', overflow: 'auto', padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center' }}>
          <div className="adm-display" style={{ fontSize: 17, color: 'var(--ink)' }}>{title}</div>
          <span style={{ flex: 1 }} />
          <span onClick={onClose} style={{ cursor: 'pointer', color: 'var(--ink-3)', fontSize: 20, fontWeight: 800, lineHeight: 1 }}>×</span>
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {fields.map((f) => (
            <div key={f.key} style={{ width: f.width === 'full' ? '100%' : 'calc(50% - 7px)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 6 }}>{f.label}</div>
              {f.type === 'textarea' ? (
                <textarea value={form[f.key]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} rows={3} style={{ ...inputCss, resize: 'vertical', fontFamily: 'inherit' }} />
              ) : f.type === 'select' ? (
                <select value={form[f.key]} onChange={(e) => set(f.key, e.target.value)} style={inputCss}>
                  <option value="">请选择</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input value={form[f.key]} onChange={(e) => set(f.key, f.type === 'number' ? e.target.value.replace(/[^\d]/g, '') : e.target.value)} placeholder={f.placeholder} style={inputCss} />
              )}
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button className="adm-btn ghost" onClick={onClose}>取消</button>
          <button className="adm-btn primary" style={{ opacity: saving ? 0.6 : 1 }} onClick={() => onSave(form)}>
            <AIcon n="check" s={15} c="#fff" />{saving ? '保存中…' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
