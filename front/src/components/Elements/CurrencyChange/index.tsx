import React from "react"
import PropTypes from "prop-types"
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'

const CurrencyChange = ({
  historical,
  latest,
}: {
  historical: any
  latest: any
}) => {
  const change = latest.rate - historical.rate
  const percentage = (change * 100 / historical.rate).toFixed(2)

  return (
    <div className="flex flex-row items-end">
      <h4 className="mt-4 font-normal inline-block">
        <span className="text-6xl">{latest.rate}</span>
      </h4>
      {
        change > 0 ?
          (
            <p className="ml-4 text-3xl inline-block text-green-600">
              <ArrowTrendingUpIcon className="mr-2 h-10 w-10 text-green-600 inline-block" />
              <span className="mr-2 inline-block">
                {`+${change.toFixed(4)}`}
              </span>
              <span className="mr-2 inline-block">
                {`+${percentage}%`}
              </span>
            </p>
          )
        : change < 0 ?
          (
            <p className="mr-4 text-3xl inline-block text-red-600">
              <ArrowTrendingDownIcon className="mr-2 h-10 w-10 text-red-600 inline-block" />
              <span className="mr-2 inline-block">
                {`${change.toFixed(4)}`}
              </span>
              <span className="mr-2 inline-block">
                {`${percentage}%`}
              </span>
            </p>
          )
        : null
      }
    </div>
  )
};

CurrencyChange.prototype = {
  historical: PropTypes.object,
  latest: PropTypes.object,
};

export default CurrencyChange;
