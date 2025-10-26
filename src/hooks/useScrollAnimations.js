import { useEffect } from 'react'

const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.card, .about, .contact, .hero, .stats, .feedback-section, .faq-section, .share-section')
    
    elements.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
      observer.observe(el)
    })

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])
}

export default useScrollAnimations
