'use strict'

const EmptyState = ({ title }) => {
  return (
    <div>
      <h3>You do not have any {title}.</h3>

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          text-align: center;
          width: 100%;
          height: 275px;
        }
        h3 {
          color: #fff;
          text-align: center;
          font-size: 2em;
          width: 100%;
          opacity: 0.75;
        }
      `}</style>
    </div>
  )
}

export default EmptyState