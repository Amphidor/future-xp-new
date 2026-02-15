'use client'

import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import toast from 'react-hot-toast'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import DashboardSidebar from '@/components/DashboardSidebar'
import { RootState } from '@/store'
import './swiper-page.css'

const DUMMY_IMAGES = ['/frontend/img-11.jpg', '/frontend/img-12.jpg', '/frontend/img-14.jpg', '/frontend/img-13.jpg', '/frontend/img-15.jpg', '/frontend/img-16.jpg']

const SPARK_QUESTION_INTERVAL = typeof process.env.NEXT_PUBLIC_SPARK_QUESTION_INTERVAL !== 'undefined'
  ? Number(process.env.NEXT_PUBLIC_SPARK_QUESTION_INTERVAL) || 7
  : 7

type CardItem = { cardId: number; img: string; title: string; desc: string; points: string[] }

type QuestionOption = { option_id: number; option_text: string }
type QuestionData = {
  question_id: number
  question_text: string
  question_image: string | null
  question_type: string
  options: QuestionOption[]
}

function stripHtml(html: string | null | undefined): string {
  if (html == null) return ''
  const s = String(html).trim()
  if (!s) return ''
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function mapApiToCard(item: any, index: number): CardItem {
  const cardId = item?.career_id != null ? Number(item.career_id) : 0
  const title = (item.job_title && String(item.job_title).trim()) || 'Career'
  const desc = stripHtml(item.summary) || 'No description available.'

  const points: string[] = []
  if (item.job_function_short) points.push(`Job function: ${stripHtml(item.job_function_short)}`)
  if (item.personality_match_short) points.push(`Personality: ${stripHtml(item.personality_match_short)}`)
  if (item.academic_requirement_short) points.push(`Academic: ${stripHtml(item.academic_requirement_short)}`)
  if (item.job_functions) points.push(`Functions: ${stripHtml(item.job_functions)}`)
  if (item.skills) points.push(`Skills: ${String(item.skills).trim()}`)
  if (item.avg_salary != null && item.avg_salary !== '') {
    const salary = `${item.currency || ''} ${item.avg_salary}`.trim()
    if (salary) points.push(`Avg. salary: ${salary}`)
  }
  if (Array.isArray(item.personality_traits) && item.personality_traits.length > 0) {
    const traits = item.personality_traits
      .map((t: any) => t.personality_trait_name || t.personality_trait_description)
      .filter(Boolean)
    if (traits.length) points.push(`Traits: ${traits.join(', ')}`)
  }
  if (points.length === 0) points.push(desc)

  return {
    cardId,
    img: DUMMY_IMAGES[index % DUMMY_IMAGES.length],
    title,
    desc,
    points,
  }
}

export default function CareersPage() {
  const token = useSelector((state: RootState) => state.auth.token)
  const verticalSwiperRef = useRef<SwiperType>()
  const fadeSwiperRef = useRef<SwiperType>()
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const verticalWrapperRef = useRef<HTMLDivElement>(null)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [cards, setCards] = useState<CardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [swiping, setSwiping] = useState(false)
  const [questionModalOpen, setQuestionModalOpen] = useState(false)
  const [questionData, setQuestionData] = useState<QuestionData | null>(null)
  const [questionLoading, setQuestionLoading] = useState(false)
  const [submittingResponse, setSubmittingResponse] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
  const cardsRef = useRef(cards)
  cardsRef.current = cards

  const submitQuestionResponse = async (questionId: number, optionId: number) => {
    if (!token || submittingResponse) return
    setSubmittingResponse(true)
    try {
      const res = await fetch('/api/sparkResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question_id: questionId, option_id: optionId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.message ?? 'Failed to submit')
        return
      }
      toast.success(data?.message ?? 'Response submitted!')
      setQuestionModalOpen(false)
      setQuestionData(null)
      setSelectedOptionId(null)
    } catch {
      toast.error('Failed to submit response.')
    } finally {
      setSubmittingResponse(false)
    }
  }

  const handleContinueQuestion = async () => {
    if (!questionData) return
    if (selectedOptionId == null) {
      toast.error('Please select an option')
      return
    }
    await submitQuestionResponse(questionData.question_id, selectedOptionId)
  }

  const closeQuestionCard = () => {
    setQuestionModalOpen(false)
    setQuestionData(null)
    setSelectedOptionId(null)
  }

  const fetchAndShowQuestion = async () => {
    if (!token) return
    setQuestionLoading(true)
    try {
      const res = await fetch('/api/questions/one', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json().catch(() => ({}))
      const data = json?.data ?? json
      if (data?.question_id != null && data?.question_text != null) {
        setQuestionData({
          question_id: data.question_id,
          question_text: data.question_text,
          question_image: data.question_image ?? null,
          question_type: data.question_type ?? '',
          options: Array.isArray(data.options)
            ? data.options.map((o: any) => ({ option_id: o.option_id, option_text: o.option_text ?? '' }))
            : [],
        })
        setSelectedOptionId(null)
        setQuestionModalOpen(true)
      }
    } catch {
      toast.error('Could not load question.')
    } finally {
      setQuestionLoading(false)
    }
  }

  const performSwipe = async (card: CardItem, swipeAction: 'left' | 'right', activeIndex: number) => {
    if (!token || swiping) return
    setSwiping(true)
    try {
      const res = await fetch('/api/swipeCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ card_id: card.cardId, swipe_action: swipeAction }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.message ?? 'Swipe failed')
        return
      }
      if (swipeAction === 'right') toast.success(`Liked ${card.title}!`)
      else toast(`Disliked ${card.title}`)
      setCards((prev) => prev.filter((_, i) => i !== activeIndex))

      const sparkReset = data?.data?.spark_reset_counter
      if (typeof sparkReset === 'number' && sparkReset >= SPARK_QUESTION_INTERVAL && sparkReset % SPARK_QUESTION_INTERVAL === 0) {
        await fetchAndShowQuestion()
      }
    } catch {
      toast.error('Swipe failed. Please try again.')
    } finally {
      setSwiping(false)
    }
  }

  const handleSwipeAction = (isLike: boolean, activeIndex: number) => {
    const currentCards = cardsRef.current
    const card = currentCards[activeIndex]
    if (!card) return
    const msg = isLike ? `Like ${card.title}?` : `Dislike ${card.title}?`
    if (window.confirm(msg)) {
      performSwipe(card, isLike ? 'right' : 'left', activeIndex)
    }
  }

  const handleSwipeActionRef = useRef(handleSwipeAction)
  handleSwipeActionRef.current = handleSwipeAction

  useEffect(() => {
    if (!token) {
      setLoading(false)
      setError('Please log in to see career cards.')
      return
    }
    setLoading(true)
    setError(null)
    fetch('/api/career_cards', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? 'Session expired. Please log in again.' : 'Failed to load career cards')
        return res.json()
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.data ?? data?.cards ?? data?.items ?? [])
        const mapped = list.map((item: any, i: number) => mapApiToCard(item, i))
        if (process.env.NODE_ENV === 'development' && list.length > 0) {
          console.log('Career cards API sample:', list[0], '→ mapped:', mapped[0])
        }
        setCards(mapped)
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load career cards')
        setCards([])
      })
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    const wrapper = verticalWrapperRef.current
    if (!wrapper) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        touchStartX.current = touch.clientX
        touchStartY.current = touch.clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const currentCards = cardsRef.current
      if (touch && verticalSwiperRef.current && touchStartX.current !== 0 && currentCards.length > 0) {
        const deltaX = touch.clientX - touchStartX.current
        const deltaY = touch.clientY - touchStartY.current
        const absDeltaX = Math.abs(deltaX)
        const absDeltaY = Math.abs(deltaY)
        const threshold = 50
        if (absDeltaX > absDeltaY && absDeltaX > threshold) {
          const activeIndex = Math.min(verticalSwiperRef.current.activeIndex ?? 0, currentCards.length - 1)
          const isLike = deltaX > 0
          handleSwipeActionRef.current(isLike, activeIndex)
        } else if (absDeltaY > absDeltaX && absDeltaY > threshold) {
          if (deltaY < 0) verticalSwiperRef.current.slidePrev()
          else verticalSwiperRef.current.slideNext()
        }
        touchStartX.current = 0
        touchStartY.current = 0
      }
    }
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true })
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="careers-layout">
      <div className="my-main-grid careers-grid">
        <DashboardSidebar />
        <main className="careers-main">
          <div className="careers-header">
            <h1 className="careers-title">Explore Careers</h1>
            <p className="careers-subtitle">Web: left = dislike, right = like. Mobile: swipe left/right = dislike/like. Swipe up/down to change cards. Tap or hover to flip.</p>
          </div>

          <section className="careers-section">
            {/* Question card (when spark_reset_counter is 7, 14, 21, …) – inline card */}
            {questionModalOpen && (
              <div className="careers-question-card">
                {questionLoading ? (
                  <p className="careers-question-card-loading">Loading question...</p>
                ) : questionData ? (
                  <>
                    <h3 className="careers-question-card-title">{questionData.question_text}</h3>
                    {questionData.question_image && (
                      <img src={questionData.question_image} alt="" className="careers-question-card-image" />
                    )}
                    <div className="careers-question-card-options">
                      {questionData.options.map((opt) => (
                        <button
                          key={opt.option_id}
                          type="button"
                          className={`careers-question-card-option ${selectedOptionId === opt.option_id ? 'careers-question-card-option-selected' : ''}`}
                          disabled={submittingResponse}
                          onClick={() => setSelectedOptionId(opt.option_id)}
                        >
                          {opt.option_text}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="careers-question-card-close"
                      disabled={submittingResponse}
                      onClick={handleContinueQuestion}
                    >
                      Continue
                    </button>
                  </>
                ) : null}
              </div>
            )}

            {/* Hide career cards while question is showing; show again after Continue */}
            {!questionModalOpen && (
            <div className="careers-swiper-wrapper" ref={verticalWrapperRef}>
              {loading ? (
                <div className="careers-empty">
                  <p className="careers-empty-title">Loading career cards...</p>
                </div>
              ) : error ? (
                <div className="careers-empty">
                  <p className="careers-empty-title">Unable to load cards</p>
                  <p className="careers-empty-desc">{error}</p>
                </div>
              ) : cards.length === 0 ? (
                <div className="careers-empty">
                  <p className="careers-empty-title">No more cards</p>
                  <p className="careers-empty-desc">You&apos;ve liked or disliked all careers. Refresh the page to start again.</p>
                </div>
              ) : (
                <Swiper
                  direction="vertical"
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={false}
                  pagination={false}
                  className="careers-swiper"
                  onSwiper={(swiper) => { verticalSwiperRef.current = swiper }}
                  onSlideChangeTransitionEnd={() => setFlippedIndex(null)}
                >
                  {cards.map((card, idx) => (
                    <SwiperSlide key={`${card.cardId}-${idx}`}>
                      <div
                        className={`card careers-card ${idx % 2 === 1 ? 'careers-card-even' : ''} ${flippedIndex === idx ? 'flipped' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setFlippedIndex((prev) => (prev === idx ? null : idx))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setFlippedIndex((prev) => (prev === idx ? null : idx))
                          }
                        }}
                      >
                        <div className="front">
                          <img src={card.img} alt="" />
                        </div>
                        <div className="back">
                          <div className="careers-card-back">
                            <div className="careers-card-back-header">
                              <h2 className="careers-card-title">{card.title}</h2>
                              <p className="careers-card-desc">{card.desc}</p>
                            </div>
                            <ul className="careers-card-points">
                              {(card.points || []).map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              {cards.length > 0 && (
                <>
                  <button
                    type="button"
                    className="careers-nav careers-nav-prev"
                    disabled={swiping}
                    onClick={(e) => {
                      e.stopPropagation()
                      const idx = Math.min(verticalSwiperRef.current?.activeIndex ?? 0, cards.length - 1)
                      handleSwipeAction(false, idx)
                    }}
                    aria-label="Dislike (remove card)"
                  />
                  <button
                    type="button"
                    className="careers-nav careers-nav-next"
                    disabled={swiping}
                    onClick={(e) => {
                      e.stopPropagation()
                      const idx = Math.min(verticalSwiperRef.current?.activeIndex ?? 0, cards.length - 1)
                      handleSwipeAction(true, idx)
                    }}
                    aria-label="Like (remove card)"
                  />
                </>
              )}
            </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
