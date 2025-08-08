import { FaUser } from 'react-icons/fa'
import { HiLogout } from 'react-icons/hi'
import '../styles/UserStatus.scss'

interface UserStatusProps {
  userEmail: string
  onClearEmail: () => void
  showEmailInput?: boolean
}

export default function UserStatus({
  userEmail,
  onClearEmail,
  showEmailInput = false,
}: UserStatusProps) {
  // Don't render anything when email input is shown
  if (showEmailInput) {
    return null
  }

  const renderUserBadge = () => {
    if (userEmail) {
      return (
        <div className="user-badge user-badge--primary">
          <FaUser className="user-icon" />
          <span className="user-email">{userEmail}</span>
        </div>
      )
    }

    return (
      <div className="user-badge user-badge--secondary">
        <FaUser className="user-icon" />
        <span className="user-mode">Public Mode</span>
      </div>
    )
  }

  const renderSwitchButton = () => (
    <button
      className="btn-ghost btn-ghost--small"
      onClick={onClearEmail}
      aria-label={userEmail ? 'Switch to different user' : 'Set user email'}
    >
      <HiLogout className="logout-icon" />
      <span>Switch User</span>
    </button>
  )

  return (
    <div className="user-status">
      <div className="user-status__info">{renderUserBadge()}</div>
      <div className="user-status__actions">{renderSwitchButton()}</div>
    </div>
  )
}
