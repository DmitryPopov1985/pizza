import React from "react"
import ContentLoader from "react-content-loader"

const PizzaLoader = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={655}
    viewBox="0 0 280 655"
    backgroundColor="#f3f3f3"
    foregroundColor="#f4ecec"
    {...props}
  >
    <circle cx="140" cy="140" r="120" /> 
    <rect x="0" y="275" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="322" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="439" rx="10" ry="10" width="91" height="27" /> 
    <rect x="128" y="430" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
)

export default PizzaLoader