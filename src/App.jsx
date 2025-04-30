import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'


function App() {

  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center  bg-cover bg-no-repeat
        bg-[url('./images/currency.jpg')] md:bg-[url('https://img.freepik.com/free-photo/gold-bull-backgrounds-graphics-elements-related-financial-sector_23-2151807653.jpg?t=st=1746009276~exp=1746012876~hmac=b22ca88cdd1b9820f340d3dfc37378474b60295ef82ee7158833e659137f7c9b&w=996')] bg-center "
    >
        <div  className="w-full overflow-hidden whitespace-nowrap h-auto p-5 backdrop-blur-sm bg-white/30 flex flex-wrap flex-col justify-center items-center my-auto py-2">

            <div className='md:text-6xl animate-pulse text-3xl font-bold text-white py-1'>Currency Converter</div>

            <div
             style={{
                animation: 'marquee 9s linear infinite',
                '@keyframes marquee': undefined 
            }} 
             className='whitespace-nowrap md:text-3xl text-xl  font-bold text-blue-950 py-1'>
            Live Exchange Rate</div>

                <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(275%); }
                    100% { transform: translateX(-325%); }
                }
                `}
                </style>
        </div>
        
        <div className="w-full">
            <div className=" w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div  className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => {setFrom(currency);
                             setAmount(amount); }}
                            // onCurrencyChange={(currency) => setAmount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App