import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} | Designed by Aman Kamble</p>
    </footer>
  )
}

export default Footer