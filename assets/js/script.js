document.addEventListener('DOMContentLoaded', function() {
  const copyBtn = document.getElementById('copy-gpay');
  const gpayInput = document.getElementById('gpay-id');

  if (copyBtn && gpayInput) {
    copyBtn.addEventListener('click', function() {
      const textToCopy = gpayInput.value.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopySuccess(copyBtn);
        }).catch(err => {
          console.error("Failed to copy using navigator.clipboard:", err);
          fallbackCopyText(gpayInput, copyBtn);
        });
      } else {
        fallbackCopyText(gpayInput, copyBtn);
      }
    });
  }

  function fallbackCopyText(inputElement, buttonElement) {
    const isReadOnly = inputElement.readOnly;
    inputElement.readOnly = false;
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);

    let success = false;
    try {
      success = document.execCommand('copy');
      if (success) {
        showCopySuccess(buttonElement);
      } else {
         console.error("Fallback copy failed: execCommand returned false.");
      }
    } catch (err) {
      console.error("Fallback copy failed with error:", err);
    }

    inputElement.readOnly = isReadOnly;

     if (window.getSelection) {
        window.getSelection().removeAllRanges();
     } else if (document.selection) {
        document.selection.empty();
     }
     inputElement.blur();
  }

  function showCopySuccess(buttonElement) {
    const originalHTML = buttonElement.innerHTML;
    const originalBackground = getComputedStyle(buttonElement).background;

    buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
    buttonElement.style.background = 'linear-gradient(135deg, var(--secondary), #38a169)';
    buttonElement.disabled = true;

    setTimeout(() => {
      buttonElement.innerHTML = originalHTML;
      buttonElement.style.background = '';
      buttonElement.disabled = false;
    }, 2000);
  }


  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .about, .contact, .hero, .stats, .feedback-section, .faq-section, .share-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  const feedbackForm = document.getElementById('feedback-form');
  const formMessage = document.getElementById('form-message');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!message) {
        showFormMessage('Please enter your thoughts or message.', 'error');
        return;
      }

      const submitBtn = feedbackForm.querySelector('.btn-submit');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        if (typeof formHandler !== 'undefined') {
          const submission = formHandler.saveSubmission({
            name: name,
            email: email,
            message: message
          });
          
          feedbackForm.reset();
          showFormMessage('Thank you for sharing your thoughts! Your message has been saved. ✨', 'success');
          
        } else {
          console.warn('Form handler not loaded, submission not saved');
          feedbackForm.reset();
          showFormMessage('Thank you for your feedback! (Note: Form handler not loaded)', 'success');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Oops! There was a problem submitting your form. Please try again later.', 'error');
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 5000);
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(button => {
    button.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answerId = this.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      
      this.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        answer.hidden = true;
      } else {
        answer.hidden = false;
      }
    });
  });

  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent('JoinUs - Support Hope, Trust & Unity');
      const pageDescription = encodeURIComponent('Support an individual dedicated to fostering hope, trust, and unity');
      
      if (button.classList.contains('share-whatsapp')) {
        window.open(`https://wa.me/?text=${pageTitle}%20-%20${pageUrl}`, '_blank');
      } else if (button.classList.contains('share-twitter')) {
        window.open(`https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`, '_blank');
      } else if (button.classList.contains('share-facebook')) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
      } else if (button.classList.contains('share-instagram')) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalHTML = button.innerHTML;
          button.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
          alert('Link copied! Open Instagram app, create a post/story, and paste the link in your bio or caption.');
          setTimeout(() => {
            button.innerHTML = originalHTML;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy link:', err);
          alert('To share on Instagram: Copy this link and paste in your Instagram bio or post caption: ' + window.location.href);
        });
      } else if (button.classList.contains('share-link')) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalHTML = button.innerHTML;
          button.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => {
            button.innerHTML = originalHTML;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy link:', err);
          alert('Failed to copy link. Please copy manually: ' + window.location.href);
        });
      }
    });
  });

  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  let selectedAmount = null;
  const presetButtons = document.querySelectorAll('.preset-btn');
  const upiId = 'nandhakumarkb2005@okaxis';
  const upiName = 'JoinUs';
  
  presetButtons.forEach(button => {
    button.addEventListener('click', function() {
      presetButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      selectedAmount = this.getAttribute('data-amount');
      
      const originalText = this.textContent;
      this.innerHTML = '<i class="fas fa-check"></i> Selected';
      setTimeout(() => {
        this.textContent = originalText;
      }, 1000);
    });
  });

  const gpayBtn = document.getElementById('gpay-btn');
  const phonepeBtn = document.getElementById('phonepe-btn');
  
  if (gpayBtn) {
    gpayBtn.addEventListener('click', function() {
      openUPIApp('gpay', upiId, upiName, selectedAmount);
    });
  }
  
  if (phonepeBtn) {
    phonepeBtn.addEventListener('click', function() {
      openUPIApp('phonepe', upiId, upiName, selectedAmount);
    });
  }
  
  function openUPIApp(app, upiId, name, amount) {
    let upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}`;
    
    if (amount) {
      upiUrl += `&am=${amount}`;
    }
    
    upiUrl += `&tn=${encodeURIComponent('Support for Hope, Trust & Unity')}`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = upiUrl;
      
      const originalHTML = (app === 'gpay' ? gpayBtn : phonepeBtn).innerHTML;
      const button = (app === 'gpay' ? gpayBtn : phonepeBtn);
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
      
      setTimeout(() => {
        button.innerHTML = originalHTML;
      }, 3000);
    } else {
      alert('UPI deep links work on mobile devices. Please use the QR code or copy the UPI ID on desktop.');
    }
  }
});


