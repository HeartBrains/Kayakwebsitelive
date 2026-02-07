import image_33593f765d2a675d88ce409217db74d077b37979 from 'figma:asset/33593f765d2a675d88ce409217db74d077b37979.png';
import image_0071ef88c5b70f64f427c978c8989d4f2ff57cb1 from 'figma:asset/0071ef88c5b70f64f427c978c8989d4f2ff57cb1.png';
import image_1364b1635c5b828b9b5a188accc01c12b27fd329 from 'figma:asset/1364b1635c5b828b9b5a188accc01c12b27fd329.png';
import image_0071ef88c5b70f64f427c978c8989d4f2ff57cb1 from 'figma:asset/0071ef88c5b70f64f427c978c8989d4f2ff57cb1.png';
import image_39b167d3ecf1724478fcff10310ad52c1e7902e9 from 'figma:asset/39b167d3ecf1724478fcff10310ad52c1e7902e9.png';
import image_39b167d3ecf1724478fcff10310ad52c1e7902e9 from 'figma:asset/39b167d3ecf1724478fcff10310ad52c1e7902e9.png';
import image_ec999442b074fbac1df911057c8bb82a64cad895 from 'figma:asset/ec999442b074fbac1df911057c8bb82a64cad895.png';
import image_39b167d3ecf1724478fcff10310ad52c1e7902e9 from 'figma:asset/39b167d3ecf1724478fcff10310ad52c1e7902e9.png';
import image_56477c60073661b3a19dd7629b8e44b1f3acfa3a from 'figma:asset/56477c60073661b3a19dd7629b8e44b1f3acfa3a.png';
import image_c5b05166a77fe39de7d22b95a54df1ffcd700e14 from 'figma:asset/c5b05166a77fe39de7d22b95a54df1ffcd700e14.png';
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  image_33593f765d2a675d88ce409217db74d077b37979

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
