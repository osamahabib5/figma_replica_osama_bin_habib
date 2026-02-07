import React from 'react'
import { SIDEBAR_TOKENS } from '@styles/tokens'

export const RightSidebar: React.FC = () => {
  return (
    <aside
      style={{
        width: 240,
        minWidth: 240,
        backgroundColor: SIDEBAR_TOKENS.colors.bg,
        color: SIDEBAR_TOKENS.colors.textPrimary,
        borderLeft: `1px solid ${SIDEBAR_TOKENS.colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px',
          borderBottom: `1px solid ${SIDEBAR_TOKENS.colors.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: SIDEBAR_TOKENS.colors.bgSectionHover,
            }}
          />
          <div style={{ fontSize: 13, fontWeight: 600 }}>Design</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            title="Share"
            style={{
              background: '#18a0ff',
              color: 'white',
              border: 'none',
              padding: '6px 10px',
              borderRadius: 6,
            //   cursor: 'pointer',
            }}
          >
            Share
          </button>
        </div>
      </div>

      {/* Content sections */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Page section */}
        <section>
          <div style={{ fontSize: 12, color: SIDEBAR_TOKENS.colors.textSecondary, marginBottom: 8 }}>Page</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 36, height: 28, background: '#e5e5e5', borderRadius: 6, border: '1px solid rgba(0,0,0,0.06)' }} />
                <input
                  placeholder="E5E5E5"
                  className="right-sidebar-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div style={{ width: 48, textAlign: 'right', color: SIDEBAR_TOKENS.colors.textSecondary }}>100%</div>
          </div>
        </section>

        {/* Variables */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: SIDEBAR_TOKENS.colors.textSecondary }}>Variables</div>
            <div style={{ fontSize: 14, color: SIDEBAR_TOKENS.colors.textSecondary }}>⚙</div>
          </div>
        </section>

        {/* Styles */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: SIDEBAR_TOKENS.colors.textSecondary }}>Styles</div>
            <button style={{ background: 'transparent', border: 'none', color: SIDEBAR_TOKENS.colors.textSecondary, cursor: 'pointer' }}>+</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, color: SIDEBAR_TOKENS.colors.textPrimary }}><span style={{ fontWeight: 600 }}>Header 1</span> · 34/Auto</div>
            <div style={{ fontSize: 11, color: SIDEBAR_TOKENS.colors.textPrimary }}><span style={{ fontWeight: 600 }}>Header 2</span> · 20/Auto</div>
            <div style={{ fontSize: 11, color: SIDEBAR_TOKENS.colors.textPrimary }}><span style={{ fontWeight: 600 }}>Body</span> · 13/Auto</div>
          </div>
        </section>

        {/* Color styles (collapsible look) */}
        <section>
          <div style={{ fontSize: 12, color: SIDEBAR_TOKENS.colors.textSecondary, marginBottom: 8 }}>Color styles</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: SIDEBAR_TOKENS.colors.textPrimary }}>
              <div>Fuschia</div>
              <div style={{ color: SIDEBAR_TOKENS.colors.textSecondary }}>▸</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: SIDEBAR_TOKENS.colors.textPrimary }}>
              <div>Iris</div>
              <div style={{ color: SIDEBAR_TOKENS.colors.textSecondary }}>▸</div>
            </div>
          </div>
        </section>

        {/* Export */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <div style={{ fontSize: 12, color: SIDEBAR_TOKENS.colors.textSecondary }}>Export</div>
            <button style={{ background: 'transparent', border: 'none', color: SIDEBAR_TOKENS.colors.textSecondary, cursor: 'pointer' }}>+</button>
          </div>
        </section>
      </div>

      <div style={{ flex: 1 }} />
    </aside>
  )
}

export default RightSidebar
