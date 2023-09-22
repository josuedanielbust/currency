import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout';
import CurrencyService from '@/services/currency';
import { CURRENCY_FROM, CURRENCY_TO, WS } from '@/utils/constants';

import CurrencyTitle from '@/components/Elements/CurrencyTitle';
import CurrencyChange from '@/components/Elements/CurrencyChange';
import CurrencyChart from '@/components/Elements/CurrencyChart';

type Props = {
  historical: any
  rates: any
}

export async function getServerSideProps() {
  const { rates, historical } = await CurrencyService.getRates()
  const props: Props = {
    historical,
    rates,
  }
  return { props }
}

const Currency = (props: Props) => {
  const { historical, rates } = props
  const [ latestRates, setLatestRates ] = useState(rates)
  const [ dataset, setDataset ] = useState({
    "0": historical,
  })
  const [ latestRate, setLatestRate ] = useState(
    rates[Object.keys(rates)[Object.keys(rates).length - 1]]
  )

  useEffect(() => {
    setDataset({
      ...dataset,
      ...rates
    })
  }, [latestRates])

  useEffect(() => {
    function socketInit() {
      const socket = new WebSocket(`${WS}/currency/ws`);
      socket.onopen = () => {
        console.log('Socket connected')
      }
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.rates !== undefined) {
          setLatestRates(data.rates.data)
          setLatestRate(
            data.rates.data[Object.keys(data.rates.data)[Object.keys(data.rates.data).length - 1]]
          )
        }
      }
    }
    socketInit()
  }, [])

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full">
          <CurrencyTitle from={CURRENCY_FROM} to={CURRENCY_TO} />
          <CurrencyChange historical={historical} latest={latestRate} />
          <div className="mt-4">
            <CurrencyChart dataset={dataset} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Currency
