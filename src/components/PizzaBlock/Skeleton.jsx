import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={477}
    viewBox="0 0 280 477"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="303" rx="5" ry="5" width="280" height="83" /> 
    <rect x="0" y="406" rx="5" ry="5" width="93" height="27" /> 
    <rect x="124" y="397" rx="25" ry="25" width="154" height="44" /> 
    <rect x="0" y="260" rx="5" ry="5" width="280" height="24" /> 
    <circle cx="140" cy="118" r="118" />
  </ContentLoader>
)

export default Skeleton;