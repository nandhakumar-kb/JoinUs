import { useState, useEffect, useCallback } from 'react'

const useFormHandler = () => {
  const storageKey = 'joinus_feedback_submissions'

  const getSubmissions = () => {
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
  }

  const saveSubmission = useCallback((data) => {
    const submissions = getSubmissions()
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: data.name || 'Anonymous',
      email: data.email || 'Not provided',
      message: data.message,
      read: false
    }
    
    submissions.unshift(submission)
    localStorage.setItem(storageKey, JSON.stringify(submissions))
    
    return submission
  }, [])

  const deleteSubmission = (id) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      let submissions = getSubmissions()
      submissions = submissions.filter(s => s.id != id)
      localStorage.setItem(storageKey, JSON.stringify(submissions))
      return true
    }
    return false
  }

  const replyViaEmail = (id) => {
    const submissions = getSubmissions()
    const submission = submissions.find(s => s.id == id)
    
    if (submission && submission.email !== 'Not provided') {
      const subject = encodeURIComponent('Re: Your feedback on JoinUs')
      const body = encodeURIComponent(
        `Hi ${submission.name},\n\n` +
        `Thank you for your feedback!\n\n` +
        `Your message:\n"${submission.message}"\n\n` +
        `---\n` +
        `Best regards,\n` +
        `JoinUs Team`
      )
      
      window.open(`mailto:${submission.email}?subject=${subject}&body=${body}`, '_blank')
      
      submission.read = true
      localStorage.setItem(storageKey, JSON.stringify(submissions))
    } else {
      alert('No email provided for this submission')
    }
  }

  const exportSubmissions = () => {
    const submissions = getSubmissions()
    
    if (submissions.length === 0) {
      alert('No submissions to export')
      return
    }
    
    const headers = ['ID', 'Date', 'Name', 'Email', 'Message', 'Read']
    const rows = submissions.map(sub => [
      sub.id,
      new Date(sub.timestamp).toLocaleString(),
      sub.name,
      sub.email,
      `"${sub.message.replace(/"/g, '""')}"`,
      sub.read ? 'Yes' : 'No'
    ])
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `joinus-feedback-${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const checkAdminAccess = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('admin') === 'view') {
      showAdminPanel()
    }
  }, [])

  const showAdminPanel = () => {
    const submissions = getSubmissions()
    
    const renderSubmission = (sub) => `
      <div class="submission" data-id="${sub.id}">
        <div class="submission-header">
          <div>
            <strong style="font-size: 16px; color: #667eea;">${sub.name}</strong>
            <div class="submission-meta">
              📧 ${sub.email}<br>
              📅 ${new Date(sub.timestamp).toLocaleString()}
            </div>
          </div>
          <div>
            ${!sub.read ? '<span style="background: #fc8181; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px;">NEW</span>' : ''}
          </div>
        </div>
        
        <div class="submission-message">
          ${sub.message}
        </div>
        
        <div class="action-btns">
          <button class="email-btn" onclick="window.formHandler.replyViaEmail('${sub.id}')">
            ✉️ Reply via Email
          </button>
          <button class="delete-btn" onclick="if(window.formHandler.deleteSubmission('${sub.id}')) window.location.reload()">
            🗑️ Delete
          </button>
        </div>
      </div>
    `
    
    const panel = document.createElement('div')
    panel.id = 'admin-panel'
    panel.innerHTML = `
      <style>
        #admin-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 10000;
          overflow-y: auto;
          padding: 20px;
        }
        #admin-panel .panel-header {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #admin-panel .close-btn {
          background: #fc8181;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        #admin-panel .submission {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 15px;
        }
        #admin-panel .submission-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eee;
        }
        #admin-panel .submission-meta {
          font-size: 14px;
          color: #666;
        }
        #admin-panel .submission-message {
          background: #f7fafc;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
          white-space: pre-wrap;
        }
        #admin-panel .action-btns {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }
        #admin-panel .action-btns button {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        #admin-panel .email-btn {
          background: #667eea;
          color: white;
        }
        #admin-panel .delete-btn {
          background: #fc8181;
          color: white;
        }
        #admin-panel .export-btn {
          background: #48bb78;
          color: white;
        }
        #admin-panel .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        #admin-panel .stat-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        #admin-panel .stat-number {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        #admin-panel .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }
        #admin-panel .empty-state {
          background: white;
          padding: 60px 20px;
          text-align: center;
          border-radius: 10px;
          color: #666;
        }
      </style>
      
      <div class="panel-header">
        <div>
          <h2 style="margin: 0; color: #667eea;">📬 Feedback Submissions</h2>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">View and manage all form submissions</p>
        </div>
        <button class="close-btn" onclick="document.getElementById('admin-panel').remove()">✕ Close</button>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">${submissions.length}</div>
          <div class="stat-label">Total Submissions</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${submissions.filter(s => s.email !== 'Not provided').length}</div>
          <div class="stat-label">With Email</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${submissions.filter(s => !s.read).length}</div>
          <div class="stat-label">Unread</div>
        </div>
      </div>
      
      <div class="panel-header" style="justify-content: flex-end;">
        <button class="export-btn" onclick="window.formHandler.exportSubmissions()">
          📥 Export All (CSV)
        </button>
      </div>
      
      <div id="submissions-list">
        ${submissions.length === 0 ? 
          '<div class="empty-state"><h3>📭 No submissions yet</h3><p>Feedback submissions will appear here</p></div>' :
          submissions.map(sub => renderSubmission(sub)).join('')
        }
      </div>
    `
    
    document.body.appendChild(panel)
  }

  // Expose methods to window for admin panel buttons
  useEffect(() => {
    window.formHandler = {
      replyViaEmail,
      deleteSubmission,
      exportSubmissions
    }
  }, [])

  return {
    saveSubmission,
    getSubmissions,
    deleteSubmission,
    replyViaEmail,
    exportSubmissions,
    checkAdminAccess
  }
}

export default useFormHandler
