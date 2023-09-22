import React from "react";
import PropTypes from "prop-types";

const CurrencyTitle = ({
  from,
  to,
}: {
  from: string
  to: string
}) => {
  return (
    <>
      <h1 className="m-0 text-6xl font-semibold">
        {from}-{to}
      </h1>
      <h2 className="m-0 p-0 text-xl font-normal opacity-60">
        {from}-{to}:CUR
      </h2>
      <h3 className="m-0 p-0 text-xl font-normal opacity-60">
        Currency Converter
      </h3>
    </>
  )
}

CurrencyTitle.prototype = {
  from: PropTypes.string,
  to: PropTypes.string,
}

export default CurrencyTitle
