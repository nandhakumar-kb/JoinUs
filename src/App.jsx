import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './App.css'
import useFormHandler from './hooks/useFormHandler'
import useScrollAnimations from './hooks/useScrollAnimations'
import useBackToTop from './hooks/useBackToTop'

function App() {
  const { saveSubmission, checkAdminAccess } = useFormHandler()
  const { showBackToTop, scrollToTop } = useBackToTop()
  useScrollAnimations()

  const [selectedAmount, setSelectedAmount] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formMessage, setFormMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    checkAdminAccess()
  }, [checkAdminAccess])

  const copyUPIId = async () => {
    const upiId = 'nandhakumarkb2005@okaxis'
    try {
      await navigator.clipboard.writeText(upiId)
      showCopySuccess('copy-gpay-btn')
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const showCopySuccess = (btnId) => {
    const btn = document.getElementById(btnId)
    if (btn) {
      const originalHTML = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
      btn.style.background = 'linear-gradient(135deg, var(--secondary), #38a169)'
      btn.disabled = true
      setTimeout(() => {
        btn.innerHTML = originalHTML
        btn.style.background = ''
        btn.disabled = false
      }, 2000)
    }
  }

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount)
    const buttons = document.querySelectorAll('.preset-btn')
    buttons.forEach(btn => btn.classList.remove('active'))
    event.target.classList.add('active')
    setTimeout(() => {
      event.target.classList.remove('active')
    }, 1000)
  }

  const openUPIApp = (app) => {
    const upiId = 'nandhakumarkb2005@okaxis'
    const name = 'JoinUs'
    let upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}`
    
    if (selectedAmount) {
      upiUrl += `&am=${selectedAmount}`
    }
    
    upiUrl += `&tn=${encodeURIComponent('Support for Hope, Trust & Unity')}`
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      window.location.href = upiUrl
    } else {
      alert('UPI deep links work on mobile devices. Please use the QR code or copy the UPI ID on desktop.')
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.message) {
      showFormMessage('Please enter your thoughts or message.', 'error')
      return
    }

    try {
      saveSubmission(formData)
      setFormData({ name: '', email: '', message: '' })
      showFormMessage('Thank you for sharing your thoughts! Your message has been saved. ✨', 'success')
    } catch (error) {
      console.error('Form submission error:', error)
      showFormMessage('Oops! There was a problem submitting your form. Please try again later.', 'error')
    }
  }

  const showFormMessage = (message, type) => {
    setFormMessage({ text: message, type })
    setTimeout(() => {
      setFormMessage({ text: '', type: '' })
    }, 5000)
  }

  const handleShare = (platform) => {
    const pageUrl = encodeURIComponent(window.location.href)
    const pageTitle = encodeURIComponent('JoinUs - Support Hope, Trust & Unity')
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${pageTitle}%20-%20${pageUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank')
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied! Open Instagram app, create a post/story, and paste the link in your bio or caption.')
      })
    } else if (platform === 'link') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = event.target.closest('.share-btn')
        const originalHTML = btn.innerHTML
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
        setTimeout(() => {
          btn.innerHTML = originalHTML
        }, 2000)
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>JoinUs - Support Hope, Trust & Unity | Community Donations</title>
        <meta name="description" content="Support an individual dedicated to fostering hope, trust, and unity. Donate via Ko-fi or UPI to help build a community that helps others." />
        <meta name="keywords" content="donation, support, community, hope, trust, unity, ko-fi, UPI, Google Pay, crowdfunding" />
        <meta name="author" content="JoinUs" />
        <meta name="theme-color" content="#667eea" />
        
        <meta property="og:title" content="JoinUs - Support Hope, Trust & Unity" />
        <meta property="og:description" content="Support an individual dedicated to fostering hope, trust, and unity in the world. Your contribution makes a difference." />
        <meta property="og:image" content="/assets/images/JoinUs.png" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JoinUs - Support Hope, Trust & Unity" />
        <meta name="twitter:description" content="Support an individual dedicated to fostering hope, trust, and unity in the world." />
        <meta name="twitter:image" content="/assets/images/JoinUs.png" />
      </Helmet>

      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      
      <header className="site-header" role="banner">
        <div className="container">
          <div className="brand">
            <img src="/assets/images/JoinUs.png" alt="Personal Mission Logo" className="site-logo" />
            <div>
              <h1 className="site-title">JoinUs</h1>
              <p className="site-tag">💖 Living a life dedicated to Hope, Trust, and Unity</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container" id="main-content" role="main">
        <section className="hero" aria-labelledby="hero-heading">
          <h2 id="hero-heading">💙 Support My Dedication</h2>
          <p>I am an individual committed to embodying and fostering hope, trust, and unity in the world. To sustain myself and dedicate my life fully to this personal mission, I rely on the direct support of those who believe in these values. Your contribution helps me live.</p>
          <div className="stats">
            <div className="stat-item stat-hope" role="article" aria-labelledby="hope-title">
              <i className="fas fa-lightbulb" aria-hidden="true"></i>
              <div className="stat-number" id="hope-title">Hope</div>
              <div className="stat-label">My Foundation</div>
            </div>
            <div className="stat-item stat-trust" role="article" aria-labelledby="trust-title">
              <i className="fas fa-handshake" aria-hidden="true"></i>
              <div className="stat-number" id="trust-title">Trust</div>
              <div className="stat-label">My Connection</div>
            </div>
            <div className="stat-item stat-unity" role="article" aria-labelledby="unity-title">
              <i className="fas fa-heart" aria-hidden="true"></i>
              <div className="stat-number" id="unity-title">Unity</div>
              <div className="stat-label">My Goal</div>
            </div>
          </div>
        </section>

        <section className="donate-cards" aria-labelledby="donation-heading">
          <h2 id="donation-heading" className="sr-only">Donation Options</h2>
          <div className="card card-kofi" role="article" aria-labelledby="kofi-title">
            <h3 id="kofi-title">Support via Ko-fi (Via PayPal)</h3>
            <p>Offer your support securely through Ko-fi. Payments use PayPal Business, helping protect supporter privacy.</p>
            <a className="btn btn-kofi" id="kofi-btn" href="https://ko-fi.com/joinus" target="_blank" rel="noopener noreferrer" aria-label="Support on Ko-fi via PayPal">
              <i className="fas fa-coffee" aria-hidden="true"></i> Support on Ko-fi
            </a>
          </div>

          <div className="card card-upi" role="article" aria-labelledby="upi-title">
            <h3 id="upi-title">Support via UPI (Google Pay, PhonePe, etc.)</h3>
            <p>You can send contributions directly using UPI. Choose a preset amount or enter your own.</p>
            
            <div className="donation-presets">
              {[50, 100, 500, 1000].map(amount => (
                <button 
                  key={amount}
                  className="preset-btn" 
                  data-amount={amount}
                  onClick={() => handlePresetClick(amount)}
                  aria-label={`Donate ${amount} rupees`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            
            <div className="qr-container">
              <img src="/assets/images/Gpay.jpg" alt="UPI QR Code for payment - nandhakumarkb2005@okaxis" className="qr-code" />
            </div>
            
            <div className="gpay">
              <input id="gpay-id" readOnly value="nandhakumarkb2005@okaxis" aria-label="UPI ID for payment" />
              <button className="btn small btn-gpay" id="copy-gpay-btn" onClick={copyUPIId} aria-label="Copy UPI ID to clipboard">
                <i className="fas fa-copy" aria-hidden="true"></i> Copy UPI ID
              </button>
            </div>
            
            <div className="upi-app-btns">
              <button className="upi-app-btn" onClick={() => openUPIApp('gpay')} aria-label="Pay with Google Pay">
                <i className="fab fa-google" aria-hidden="true"></i> Google Pay
              </button>
              <button className="upi-app-btn" onClick={() => openUPIApp('phonepe')} aria-label="Pay with PhonePe">
                <i className="fas fa-mobile-alt" aria-hidden="true"></i> PhonePe
              </button>
            </div>
          </div>
        </section>

        <section className="feedback-section" aria-labelledby="feedback-heading">
          <div className="section-header">
            <i className="fas fa-comments" aria-hidden="true"></i>
            <h3 id="feedback-heading">Share Your Thoughts</h3>
          </div>
          <p className="feedback-intro">Your feedback, thoughts, and messages are valuable. Share what's on your mind or let me know how this mission resonates with you.</p>
          
          <form className="feedback-form" onSubmit={handleFormSubmit} aria-labelledby="feedback-heading">
            <input type="text" name="_gotcha" style={{display:'none'}} aria-hidden="true" />
            
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user" aria-hidden="true"></i> Name (Optional)
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                aria-describedby="name-hint" 
              />
              <small id="name-hint" className="sr-only">Enter your name if you wish to be identified</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope" aria-hidden="true"></i> Email (Optional)
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your.email@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                aria-describedby="email-hint" 
              />
              <small id="email-hint" className="sr-only">Enter your email if you'd like a response</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-message" aria-hidden="true"></i> Your Thoughts <span className="required" aria-label="required">*</span>
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Share your thoughts, feedback, or any message you'd like to convey..." 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                aria-required="true" 
                aria-describedby="message-hint"
              ></textarea>
              <small id="message-hint" className="sr-only">This field is required. Share your thoughts or feedback</small>
            </div>
            
            <button type="submit" className="btn btn-submit" aria-label="Submit your feedback">
              <i className="fas fa-paper-plane" aria-hidden="true"></i> Send Your Thoughts
            </button>
            
            {formMessage.text && (
              <div className={`form-message ${formMessage.type}`} role="status" aria-live="polite">
                {formMessage.text}
              </div>
            )}
          </form>
        </section>

        <section className="share-section" aria-labelledby="share-heading">
          <div className="section-header">
            <i className="fas fa-share-nodes" aria-hidden="true"></i>
            <h3 id="share-heading">Share</h3>
          </div>
          <p className="share-intro">Help spread hope, trust, and unity by sharing this page with others</p>
          
          <div className="share-buttons">
            <button className="share-btn share-whatsapp" onClick={() => handleShare('whatsapp')} aria-label="Share on WhatsApp">
              <i className="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp
            </button>
            <button className="share-btn share-twitter" onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
              <i className="fab fa-twitter" aria-hidden="true"></i> Twitter
            </button>
            <button className="share-btn share-facebook" onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
              <i className="fab fa-facebook" aria-hidden="true"></i> Facebook
            </button>
            <button className="share-btn share-instagram" onClick={() => handleShare('instagram')} aria-label="Share on Instagram">
              <i className="fab fa-instagram" aria-hidden="true"></i> Instagram
            </button>
            <button className="share-btn share-link" onClick={() => handleShare('link')} aria-label="Copy link to clipboard">
              <i className="fas fa-link" aria-hidden="true"></i> Copy Link
            </button>
          </div>
        </section>
      </main>

      {showBackToTop && (
        <button 
          id="back-to-top" 
          className="back-to-top visible" 
          onClick={scrollToTop}
          aria-label="Back to top" 
          title="Back to top"
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
        </button>
      )}

      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <small>Supporting an individual dedicated to Hope, Trust, and Unity. Thank you for your consideration.</small>
        </div>
      </footer>
    </>
  )
}

export default App
