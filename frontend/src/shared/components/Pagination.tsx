import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import "../styles/Pagination.scss"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    
    if (totalPages <= 7) return pages
    
    return pages.filter((page) => {
      if (page === 1 || page === totalPages) return true
      if (page >= currentPage - 1 && page <= currentPage + 1) return true
      return false
    })
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <div className="pagination__per-page">
          <span className="pagination__label">Items per page:</span>
          <select
            className="pagination__select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="pagination__navigation">
          <button
            className="btn-secondary pagination__button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardArrowLeft />
            Previous
          </button>

          <div className="pagination__pages">
            {visiblePages.map((page, index, array) => {
              const prevPage = array[index - 1]
              const showEllipsis = prevPage && page - prevPage > 1

              return (
                <div key={page} className="pagination__page-group">
                  {showEllipsis && <span className="pagination__ellipsis">...</span>}
                  <button
                    className={`pagination__page ${
                      currentPage === page ? "pagination__page--active" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </div>
              )
            })}
          </div>

          <button
            className="btn-secondary pagination__button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
