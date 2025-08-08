import { useState } from "react"
import "../styles/EmailSetup.scss"
import { MdEmail } from "react-icons/md"
import { isValidEmail } from "../utils/validation"

interface EmailSetupProps {
  onEmailSet: (email: string) => void
  onEmailSkip: () => void
}

export default function EmailSetup({ onEmailSet, onEmailSkip }: EmailSetupProps) {
  const [emailInput, setEmailInput] = useState("")
  const [emailError, setEmailError] = useState("")

  const handleSetEmail = async () => {
    setEmailError("")

    if (emailInput.trim() === "") {
      setEmailError("Please enter an email address")
      return
    }


    if (!isValidEmail(emailInput.trim())) {
      setEmailError("Please enter a valid email address")
      return
    }
    onEmailSet(emailInput.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSetEmail()
    }
  }

  return (
    <div className="email-setup">
      <div className="email-setup__content">
        <div className="email-setup__header">
          <h3 className="email-setup__title">Choose Your Mode</h3>
          <p className="email-setup__description">
            Enter your email for private tasks, or skip for public shared tasks
          </p>
        </div>

        <div className="email-setup__form">
          <div className="email-setup__input-group">
            <input
              type="email"
              className="input"
              placeholder="Enter your email (optional)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="email-setup__form-buttons">
            <button 
              className="btn-primary" 
              onClick={handleSetEmail} 
              disabled={!emailInput.trim()}
            >
              <MdEmail />
              Set Email
            </button>
            <button className="btn-secondary" onClick={onEmailSkip}>
              Skip
            </button>
            </div>
          </div>

          {emailError && (
            <div className="email-setup__error">
              {emailError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
