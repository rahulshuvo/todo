import { FaUser } from "react-icons/fa"
import "../styles/UserStatus.scss"
import { HiLogout } from "react-icons/hi"

interface UserStatusProps {
  userEmail: string
  onClearEmail: () => void
}

export default function UserStatus({ userEmail, onClearEmail }: UserStatusProps) {
  return (
    <div className="user-status">
      {userEmail ? (
        <div className="user-status__authenticated">
          <div className="user-badge user-badge--primary">
            <FaUser />
            {userEmail}
          </div>
          <button className="btn-ghost btn-ghost--small" onClick={onClearEmail}>
            <HiLogout />
            Switch User
          </button>
        </div>
      ) : (
        <div className="user-badge user-badge--secondary">
          <FaUser className="user-icon" />
          Public Mode
        </div>
      )}
    </div>
  )
}
